import React from 'react'

const Button = ({type, className, value,disabled}) => {
  return (
   <>
   <button type={type} disabled={disabled} className={className} >{value}</button>
   </>
  )
}
export default Button