import React from 'react'

interface EmptyProps {
label: string;
}
const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
      <div className='relative h-72 w-72'>
        <p className='text-muted-foreground text-sm text-center'> {label} </p>
      </div>
    </div>
  )
}

export default Empty
