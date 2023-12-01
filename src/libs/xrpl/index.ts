import type {
  BaseResponse,
  // request
  AccountLinesRequest,
  AccountLinesResponse,
  AMMInfoRequest,
  AMMInfoResponse,
  // submit
  AccountSet,
  AMMCreate,
  AMMDelete,
  AMMWithdraw,
  Payment,
  TrustSet,
  TxResponse,
} from 'xrpl'
import { Client, Wallet } from 'xrpl'
import { TransactionTypes } from '@/config/xrpl/transactions'
import { Networks } from '@/config/networks'

interface SubmitAndWaitProps {
  request: AccountSet | AMMCreate | AMMDelete | AMMWithdraw | Payment | TrustSet
  wallet?: Wallet
}

type RequestProps = AccountLinesRequest | AMMInfoRequest

export default class Xrpl {
  private client: Client
  private issuerWallet: Wallet
  private operatorWallet: Wallet

  constructor(network: Networks = Networks.default) {
    this.client = new Client(network)
    this.issuerWallet = Wallet.fromSeed(
      process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_SEED as string
    )
    this.operatorWallet = Wallet.fromSeed(
      process.env.NEXT_PUBLIC_OWNER_HOT_WALLET_SEED as string
    )
  }

  getIssuerWallet(): Wallet {
    return this.issuerWallet
  }

  getOperatorWallet(): Wallet {
    return this.operatorWallet
  }

  // ============================================================
  // submitAndWait methods
  // ============================================================

  async mintToken(request: Payment): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  async accountSet(request: AccountSet): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  async ammCreate(request: AMMCreate): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  // TODO: パラメーターを変更する
  async ammWithdraw(): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request: {
        TransactionType: 'AMMWithdraw',
        Account: this.issuerWallet.address,
        Asset: {
          currency: 'XRP',
        },
        Asset2: {
          currency: 'BTC',
          issuer: process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string,
        },
        Flags: 131072,
      } as AMMWithdraw,
      wallet: this.issuerWallet,
    })

    return response
  }

  // TODO: パラメーターを変更する
  async ammDelete(): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request: {
        TransactionType: 'AMMDelete',
        Account: this.operatorWallet.address,
        Asset: {
          currency: 'XRP',
        },
        Asset2: {
          currency: 'BTC',
          issuer: process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_ADDRESS as string,
        },
      } as AMMDelete,
      wallet: this.operatorWallet,
    })
    return response
  }

  async paymentFromIssuer({
    to,
    currency,
    amount,
  }: {
    to: string
    currency: string
    amount: string
  }): Promise<TxResponse> {
    const request: Payment = {
      TransactionType: TransactionTypes.Payment,
      Account: to,
      Destination: this.issuerWallet.address,
      Amount: {
        currency: currency,
        issuer: this.issuerWallet.address,
        value: amount,
      },
    }
    const wallet = this.issuerWallet

    const response = await this.submitAndWait({
      request,
      wallet,
    })

    return response
  }

  async trustSetForOperator({
    currency,
  }: {
    currency: string
  }): Promise<TxResponse> {
    const response = await this.submitAndWait({
      request: {
        TransactionType: TransactionTypes.TrustSet,
        Account: this.operatorWallet.address,
        LimitAmount: {
          issuer: this.issuerWallet.address,
          currency: currency,
          value: '1000000000000',
        },
      } as TrustSet,
      wallet: this.operatorWallet,
    })
    return response
  }

  // ============================================================
  // Request methods
  // ============================================================

  async ammInfo(request: AMMInfoRequest): Promise<AMMInfoResponse> {
    const response = await this.request(request)
    return response as AMMInfoResponse
  }

  async accountLines(
    request: AccountLinesRequest
  ): Promise<AccountLinesResponse> {
    const response = await this.request(request)
    return response as AccountLinesResponse
  }

  // ============================================================
  // Private methods
  // ============================================================

  /**
   * submitAndWait
   * @param props
   * @returns
   */
  private async submitAndWait({
    request,
    wallet,
  }: SubmitAndWaitProps): Promise<TxResponse> {
    try {
      await this.client.connect()

      const response = await this.client.submitAndWait(request, {
        autofill: true,
        wallet: wallet,
      })

      return response
    } catch (error: unknown) {
      throw error
    } finally {
      await this.client.disconnect()
    }
  }

  /***
   * request
   */
  private async request(request: RequestProps): Promise<BaseResponse> {
    try {
      await this.client.connect()

      const response = await this.client.request(request)

      return response
    } catch (error: unknown) {
      throw error
    } finally {
      await this.client.disconnect()
    }
  }
}
