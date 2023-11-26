import { Wallets } from '@/config/wallets'
import Crossmark from '@/utils/wallet/crossmark'

interface Wallet {
  address: string
}

const useWallet = () => {
  const isInstalled = (walletType: Wallets): boolean => {
    switch (walletType) {
      case Wallets.Crossmark:
        if (!window.xrpl) return false
        if (!window.xrpl.crossmark) return false
        return true
      case Wallets.Xumm:
        return !!window.xrpl.xumm
      default:
        throw new Error('Invalid wallet type')
    }
  }

  const login = async (walletType: Wallets): Promise<Wallet> => {
    const response: Wallet = {
      address: '',
    }

    switch (walletType) {
      case Wallets.Crossmark: {
        const crossmark = new Crossmark(window.xrpl.crossmark)

        const res = await crossmark.login()

        response.address = res.address
        break
      }
      case Wallets.Xumm: {
        // eslint-disable-next-line no-console
        console.log('Xumm')
        break
      }
      default: {
        throw new Error('Invalid wallet type')
      }
    }

    return response
  }

  const logout = (walletType: Wallets) => {
    switch (walletType) {
      case Wallets.Crossmark:
        break
      case Wallets.Xumm:
        break
      default:
        throw new Error('Invalid wallet type')
    }
  }

  const getXrpBalance = (walletType: Wallets) => {
    switch (walletType) {
      case Wallets.Crossmark:
        break
      case Wallets.Xumm:
        break
      default:
        throw new Error('Invalid wallet type')
    }
  }

  return {
    isInstalled,
    login,
    logout,
    getXrpBalance,
  }
}

export default useWallet
