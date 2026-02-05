import React, { useState } from "react"

type NumericControlProps = {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  unit?: string
}

export function NumericControl({
  value,
  onChange,
  label,
  min = 0,
  unit = "",
}: NumericControlProps) {
  const [inputValue, setInputValue] = useState(value.toString())

  React.useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
  }

  const handleInputBlur = () => {
    const numericValue = parseFloat(inputValue)
    if (Number.isNaN(numericValue) || numericValue < min) {
      setInputValue(value.toString())
    } else {
      onChange(Math.max(min, numericValue))
    }
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="text-xs w-24 text-center border border-input bg-background rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {unit && (
          <span className="text-xs text-muted-foreground w-6">{unit}</span>
        )}
      </div>
    </div>
  )
}
