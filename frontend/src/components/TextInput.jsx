import React from 'react'

const TextInput = ({label, type, color, value, onChange}) => {
  return (
    <div className='mb-2'>
    <p className={color || ''}>{label}</p>
    <input type={type || "text"} className={`border border-gray-300 rounded-sm outline-none p-1 w-full`} value={value} onChange={onChange} />
    </div>
  )
}

export default TextInput