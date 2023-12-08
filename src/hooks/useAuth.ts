import { NetworkIds } from '@/config/networks'
import { Commands } from '@/config/xrpl/commands'
import Xrpl from '@/libs/xrpl'
import { isVerified } from '@/utils/auth'

const useAuth = () => {
  const signin = async () => {
    const client = new Xrpl()

    const account = client.getUserWallet()

    const ledgerEntry = await client.ledgerEntry({
      command: Commands.ledgerEntry,
      did: account.address,
      ledger_index: 'validated',
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const node = ledgerEntry.result.node as any
    const isVerifiedDid = isVerified(
      account.address,
      NetworkIds.default,
      node.DIDDocument
    )
    console.info('[ledgerEntry] isVerifiedDid: ', isVerifiedDid)

    return isVerifiedDid
  }

  return {
    // state
    // function
    signin,
  }
}

export default useAuth
