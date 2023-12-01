'use client'

import { Button } from '@nextui-org/react'
import { SettingsIcon } from '@/components/icons'

interface InversionButtonProps {
    onOpen: () => void
}

const InversionButton: React.FC<InversionButtonProps> = ({
    onOpen
}) => {
  return (
    <> 
      <Button isIconOnly aria-label="settings">
        <SettingsIcon />
      </Button>
    </>
  )
}

export default InversionButton
