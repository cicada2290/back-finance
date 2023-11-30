import type {
  BaseResponse,
  AccountLinesRequest,
  AMMInfoRequest,
  AMMInfoResponse,
  Payment,
  TrustSet,
  TxResponse,
  Wallet,
} from 'xrpl'
import { Client } from 'xrpl'
import { Networks } from '@/config/networks'

interface SubmitAndWaitProps {
  request: Payment | TrustSet
  wallet?: Wallet
}

type RequestProps = AccountLinesRequest | AMMInfoRequest

export default class Xrpl {
  private client: Client

  constructor(network: Networks = Networks.default) {
    this.client = new Client(network)
  }

  // ============================================================
  // submitAndWait methods
  // ============================================================

  // ============================================================
  // Request methods
  // ============================================================

  async ammInfo(props: AMMInfoRequest): Promise<AMMInfoResponse> {
    const response = await this.request(props)
    return response as AMMInfoResponse
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
