import { NextResponse } from 'next/server'
import axios from 'axios'
import { Xumm } from 'xumm'

const apiKey = process.env.XUMM_API_KEY as string
const apiSecret = process.env.XUMM_API_SECRET as string

const xumm = new Xumm(apiKey, apiSecret)

export async function GET(request: Request, { params }: any) {
  try {
    const payload = await axios.get(
      `https://xumm.app/api/v1/platform/payload/${params.uuid}`,
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
        data: payload.data.response,
      })
    return NextResponse.json({ status: false, data: null })
  } catch (error) {
    console.log(new Date().toString(), 'login failed')
    return NextResponse.json({ status: false, data: null })
  }
}
