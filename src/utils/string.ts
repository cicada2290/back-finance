export const truncateAddress = (address: string): string => {
  if (!address) return ''
  const front = address.slice(0, 6)
  const end = address.slice(-6)
  return `${front}...${end}`
}
