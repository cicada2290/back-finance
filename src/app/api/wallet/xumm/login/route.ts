import { NextResponse } from 'next/server'
import axios from 'axios'
import { Xumm } from 'xumm'

const apiKey = process.env.XUMM_API_KEY as string
const apiSecret = process.env.XUMM_API_SECRET as string

const xumm = new Xumm(apiKey, apiSecret)

export async function GET(request: Request, { params }: any) {
  try {
    const payload = await axios.post(
      'https://xumm.app/api/v1/platform/payload',
      JSON.stringify({
        txjson: { TransactionType: 'SignIn' },
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'X-API-Secret': apiSecret,
        },
      }
    )

    if (payload.status === 200)
      return NextResponse.json({
        status: true,
        data: {
          uuid: payload.data.uuid,
          next: payload.data.next.always,
          qrUrl: payload.data.refs.qr_png,
          wsUrl: payload.data.refs.websocket_status,
          pushed: payload.data.pushed,
        },
      })

    return NextResponse.json({ status: false, data: null })
  } catch (error) {
    console.log(new Date().toString(), 'login failed')
    return NextResponse.json({ status: false, data: null })
  }
}
