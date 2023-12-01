'use client'

import { Button } from '@nextui-org/react'
import { RefreshIcon } from '@/components/icons'

interface RefreshButtonProps {
    onOpen: () => void
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    onOpen
}) => {
  return (
    <> 
        <Button isIconOnly aria-label="refresh">
            <RefreshIcon />
        </Button>
    </>
  )
}

export default RefreshButton
