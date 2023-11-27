import type {
  AMMInfoRequest,
  AMMInfoResponse,
  AMMCreate,
  TxResponse,
} from 'xrpl'
import { Client, Wallet } from 'xrpl'

export const newClient = (network: string) => {
  return new Client(network)
}

export const fetchColdWallet = () => {
  return Wallet.fromSecret(
    process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_SEED as string
  )
}

export const fetchHotWallet = () => {
  return Wallet.fromSecret(
    process.env.NEXT_PUBLIC_OWNER_HOT_WALLET_SEED as string
  )
}

export const requestAmmInfo = async ({
  network,
  params,
}: {
  network: string
  params: AMMInfoRequest
}): Promise<AMMInfoResponse | null> => {
  console.log('requestAmmInfo', params)

  const client = newClient(network)
  await client.connect()

  const response = await client.request(params).catch(() => null)

  await client.disconnect()

  return response
}

export const submitAMMCreate = async ({
  network,
  params,
  wallet,
}: {
  network: string
  params: AMMCreate
  wallet: Wallet
}): Promise<TxResponse<AMMCreate>> => {
  const client = newClient(network)
  await client.connect()

  const response = await client.submitAndWait(params, { wallet })

  await client.disconnect()

  return response
}
