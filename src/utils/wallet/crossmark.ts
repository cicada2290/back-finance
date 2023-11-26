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
  private crossmark: any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(crossmark: any) {
    this.crossmark = crossmark
  }

  async login() {
    const { response } = await this.crossmark.signInAndWait()
    // eslint-disable-next-line no-console
    console.info('[Crossmark] response: ', response)
    return response.data
  }

  logout() {
    // eslint-disable-next-line no-console
    console.log('logout: ', this.crossmark)
  }

  getXrpBalance() {
    // eslint-disable-next-line no-console
    console.log('getXrpBalance: ', this.crossmark)
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
