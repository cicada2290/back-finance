import { useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'

interface SelectInputProps {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SetValue: (e: any) => void
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  items,
  value,
  SetValue,
}) => {
  const [touched, setTouched] = useState(false)

  const isValid = value.size > 0

  return (
    <Select
      isRequired
      label={label}
      selectedKeys={value}
      defaultSelectedKeys={value}
      onSelectionChange={SetValue}
      isInvalid={isValid || !touched ? false : true}
      onClose={() => setTouched(true)}
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default SelectInput
