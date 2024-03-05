import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-full flex flex-col gap-y-4 items-center justify-center'>
        <Image src="/loading.gif" alt="loading..." width={300} height={300} />
    </div>
  )
}

export default Loader;
