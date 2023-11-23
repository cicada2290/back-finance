import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

declare global {
  interface Window {
    xrpl: {
      crossmark: any
      isCrossmark: boolean
      js: any
      xdir: any
    }
  }
}
