import { NetworkIds } from '@/config/networks'
import { encodeToHex, decodeFromHex } from '@/utils/string'

const APP_URL = 'http://localhost:3000'

export interface DIDDocument {
  '@context': string
  id: string
}

export const getDid = (address: string, networkId: NetworkIds) => {
  return `did:xrpl:${networkId}:${address}`
}

export const createDidDocument = ({
  address,
  networkId,
}: {
  address: string
  networkId?: NetworkIds
}): string => {
  const didDocument = {
    '@context': APP_URL,
    id: getDid(address, networkId || NetworkIds.default),
  }

  return encodeToHex(JSON.stringify(didDocument).replace(/ /g, ''))
}

export const getDidDocument = (encodedDidDocument: string): DIDDocument => {
  return JSON.parse(decodeFromHex(encodedDidDocument))
}

export const isVerified = (
  account: string,
  networkId: NetworkIds,
  didDocumentHex: string
): boolean => {
  try {
    const didDocument = getDidDocument(didDocumentHex)

    if (!didDocument) return false
    if (didDocument['@context'] !== APP_URL) return false

    const did = getDid(account, networkId)
    if (did !== didDocument.id) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
