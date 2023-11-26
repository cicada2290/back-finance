interface ICrossmark {}

export default class Crossmark implements ICrossmark {
  // constructor() {}

  static async login() {
    const { response } = await window.xrpl.crossmark.signInAndWait()
    // eslint-disable-next-line no-console
    console.info('[Crossmark] response: ', response)
    return response.data
  }

  static logout() {
    // eslint-disable-next-line no-console
    console.log('logout')
  }

  static getXrpBalance() {
    // eslint-disable-next-line no-console
    console.log('getXrpBalance')
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
