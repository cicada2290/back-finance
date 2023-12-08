import type {
  BaseResponse,
  // request
  AccountCurrenciesRequest,
  AccountCurrenciesResponse,
  AccountLinesRequest,
  AccountLinesResponse,
  AMMInfoRequest,
  AMMInfoResponse,
  LedgerEntryRequest,
  LedgerEntryResponse,
  // submit
  AccountSet,
  AMMCreate,
  AMMDelete,
  AMMWithdraw,
  DIDSet,
  Payment,
  TrustSet,
  TxResponse,
} from 'xrpl'
import { Client, Wallet } from 'xrpl'
import { TransactionTypes } from '@/config/xrpl/transactions'
import { Networks } from '@/config/networks'

interface SubmitAndWaitProps {
  request:
    | AccountSet
    | AMMCreate
    | AMMDelete
    | AMMWithdraw
    | DIDSet
    | Payment
    | TrustSet
  wallet?: Wallet
}

interface PaymentFromIssuerRequest {
  to: string
  currency: string
  amount: string
}

interface TrustSetForOperatorRequest {
  currency: string
}

export interface IXrpl {
  // submitAndWait methods
  mintToken(request: Payment): Promise<TxResponse>
  accountSet(request: AccountSet): Promise<TxResponse>
  ammCreate(request: AMMCreate): Promise<TxResponse>
  ammDelete(): Promise<TxResponse>
  ammWithdraw(): Promise<TxResponse>
  didSet(request: DIDSet): Promise<TxResponse>
  paymentFromIssuer(request: PaymentFromIssuerRequest): Promise<TxResponse>
  paymentFromIssuer(request: PaymentFromIssuerRequest): Promise<TxResponse>
  trustSetForOperator(request: TrustSetForOperatorRequest): Promise<TxResponse>
  // request methods
  ammInfo(request: AMMInfoRequest): Promise<AMMInfoResponse>
  accountCurrencies(request: AccountCurrenciesRequest): Promise<BaseResponse>
  accountLines(request: AccountLinesRequest): Promise<BaseResponse>
  ledgerEntry(request: LedgerEntryRequest): Promise<LedgerEntryResponse>
}

type RequestProps =
  | AccountCurrenciesRequest
  | AccountLinesRequest
  | AMMInfoRequest
  | LedgerEntryRequest

export default class Xrpl implements IXrpl {
  private client: Client
  private issuerWallet: Wallet
  private operatorWallet: Wallet
  private userWallet: Wallet

  constructor(network: Networks = Networks.default) {
    this.client = new Client(network)
    this.issuerWallet = Wallet.fromSeed(
      process.env.NEXT_PUBLIC_OWNER_COLD_WALLET_SEED as string
    )
    this.operatorWallet = Wallet.fromSeed(
      process.env.NEXT_PUBLIC_OWNER_HOT_WALLET_SEED as string
    )
    this.userWallet = Wallet.fromSeed(
      process.env.NEXT_PUBLIC_USER_WALLET_SEED as string
    )
  }

  getIssuerWallet(): Wallet {
    return this.issuerWallet
  }

  getOperatorWallet(): Wallet {
    return this.operatorWallet
  }

  getUserWallet(): Wallet {
    return this.userWallet
  }

  // ============================================================
  // submitAndWait methods
  // ============================================================

  async mintToken(request: Payment) {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  async accountSet(request: AccountSet) {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  async ammCreate(request: AMMCreate) {
    const response = await this.submitAndWait({
      request,
      wallet: this.issuerWallet,
    })
    return response
  }

  // TODO: パラメーターを変更する
  async ammDelete() {
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

  // TODO: パラメーターを変更する
  async ammWithdraw() {
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

  async didSet(request: DIDSet) {
    const response = await this.submitAndWait({
      request: request,
      wallet: this.userWallet,
    })

    return response
  }

  async paymentFromIssuer({ to, currency, amount }: PaymentFromIssuerRequest) {
    const request: Payment = {
      TransactionType: TransactionTypes.Payment,
      Account: this.issuerWallet.address,
      Destination: to,
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

  async trustSetForOperator({ currency }: TrustSetForOperatorRequest) {
    const response = await this.submitAndWait({
      request: {
        TransactionType: TransactionTypes.TrustSet,
        Account: this.operatorWallet.address,
        LimitAmount: {
          issuer: this.issuerWallet.address,
          currency: currency,
          value: '10000000000',
        },
      } as TrustSet,
      wallet: this.operatorWallet,
    })
    return response
  }

  // ============================================================
  // Request methods
  // ============================================================

  async ammInfo(request: AMMInfoRequest) {
    const response = await this.request(request)
    return response as AMMInfoResponse
  }

  async accountCurrencies(request: AccountCurrenciesRequest) {
    const response = await this.request(request)
    return response as AccountCurrenciesResponse
  }

  async accountLines(request: AccountLinesRequest) {
    const response = await this.request(request)
    return response as AccountLinesResponse
  }

  async ledgerEntry(request: LedgerEntryRequest) {
    const response = await this.request(request)
    return response as LedgerEntryResponse
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
