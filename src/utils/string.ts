export const truncateAddress = (address: string): string => {
  if (!address) return ''
  const front = address.slice(0, 6)
  const end = address.slice(-6)
  return `${front}...${end}`
}

export const encodeToHex = (str: string): string => {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16)
  }
  return hex
}

export const decodeFromHex = (hex: string): string => {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return str
}
