import type { TrustSet } from 'xrpl'
import crossmark from '@crossmarkio/sdk'

interface ICrossmark {
  login(): Promise<{
    address: string
    meta: {
      isError: boolean
      isExpired: boolean
      isFail: boolean
      isPending: boolean
      isRejected: boolean
      isSigned: boolean
      isSuccess: boolean
    }
    network: {
      protocol: string
      rpc: string
      type: string
      wss: string
    }
    publicKey: string
    user: {
      developer: boolean
      id: string
      type: string
      username: string
    }
  }>
}

export default class Crossmark implements ICrossmark {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private xrpl: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(xrpl: any) {
    this.xrpl = xrpl
  }

  async login() {
    const { response } = await this.xrpl.signInAndWait()
    // eslint-disable-next-line no-console
    console.info('[Crossmark] response: ', response)
    return response.data
  }

  async submitTrustSet(request: TrustSet): Promise<string> {
    const id = await crossmark.signAndSubmit(request)

    return id
  }

  logout() {
    // eslint-disable-next-line no-console
    console.log('logout: ', this.xrpl)
  }

  getXrpBalance() {
    // eslint-disable-next-line no-console
    console.log('getXrpBalance: ', this.xrpl)
  }
}

/*
const crossmark = () => {
  const login = async (): Promise<any> => {
    const { response } = await window.xrpl.crossmark.signInAndWait()
    console.info('[Crossmark] response: ', response)

    return response.data
  }

  const logout = () => {
    console.log('logout: ', window.xrpl)
  }

  const getXrpBalance = () => {
    console.log('getXrpBalance: ', window.xrpl)
  }

  return {
    login,
    logout,
    getXrpBalance,
  }
}

export default crossmark
*/
