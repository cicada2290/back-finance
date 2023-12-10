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
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        onClick={onClick}
        isLoading={isLoding}
      >
        Swap
      </Button>
    </>
  )
}

export default SwapButton
