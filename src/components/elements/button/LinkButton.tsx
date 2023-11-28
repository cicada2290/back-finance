'use client'

import { Button, Link } from '@nextui-org/react'

interface LinkButtonProps {
  children: React.ReactNode
  href: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, href }) => {
  return (
    <Button href={href} as={Link}>
      {children}
    </Button>
  )
}

export default LinkButton
