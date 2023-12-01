'use client'

import { Button } from '@nextui-org/react'
import { UpDownIcon } from '@/components/icons'

interface InversionButtonProps {
    onClick: () => void
}

const InversionButton: React.FC<InversionButtonProps> = ({
    onClick
}) => {
  return (
    <> 
      <Button 
        onClick={onClick}
        isIconOnly>
        <UpDownIcon />
      </Button>
    </>
  )
}

export default InversionButton
