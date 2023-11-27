import { Client } from 'xrpl'

export const newClient = (network: string) => {
  return new Client(network)
}
