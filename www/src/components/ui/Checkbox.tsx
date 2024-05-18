import React from "react"

export default function Checkbox({ id, label, checked, onChange, labelStyles }: {id: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, labelStyles: React.CSSProperties}) {
  return (
    <div style={{ display: 'inline-block' }} key={id}>
      <input id={id} type='checkbox' checked={checked} onChange={onChange} />
      <label htmlFor={id} style={labelStyles}>
        {label}
      </label>
    </div>
  )
}
