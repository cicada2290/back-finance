'use client'

import { Button } from '@nextui-org/react'

interface SwapButtonProps {
  onClick: () => void
  isLoding: boolean
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, isLoding }) => {
  return (
    <>
      <Button
        fullWidth
        variant="flat"
        color="success"
        onClick={onClick}
        isLoading={isLoding}
      >
        Swap
      </Button>
    </>
  )
}

export default SwapButton
