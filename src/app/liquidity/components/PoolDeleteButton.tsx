import { Button } from '@nextui-org/react'
import Xrpl from '@/libs/xrpl'

const PoolDeleteButton = () => {
  const handleDeletePool = async () => {
    console.log('delete pool')
    const client = new Xrpl()
    // const issuerWallet = client.getIssuerWallet()

    const response1 = await client.ammWithdraw()
    console.log('withdraw pool: ', response1)
    const response2 = await client.ammDelete()
    console.log('delete pool: ', response2)
  }

  return <Button onPress={handleDeletePool}>DELETE POOL</Button>
}

export default PoolDeleteButton
