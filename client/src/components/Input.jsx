import React from 'react'

const Input = ({identifier,name,value,handleChange,handleBlur,inputType}) => {
  return (
    <>
       <input
                type={inputType}
                id={identifier}
                name={identifier}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className=" block w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
    </>
  )
}

export default Input
