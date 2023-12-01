'use client'

import { Button } from '@nextui-org/react'

interface SwapButtonProps {
    onClick: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({
    onClick
}) => {
  return (
    <>
      <Button 
        fullWidth 
        variant="flat" 
        color="success"
        onClick={onClick}
        >
          Swap
        </Button>
    </>
  )
}

export default SwapButton
