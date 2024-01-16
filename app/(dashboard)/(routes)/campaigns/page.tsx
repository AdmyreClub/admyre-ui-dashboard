import Heading from '@/components/heading'
import { Hash } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='pt-[5rem]'>
         <Heading
                title="Create Campaigns"
                description="Create campaigns and track your influencers."
                icon={Hash}
                iconColor="text-black-500"
                bgColor="bg-slate-500/10"
            />
    </div>
  )
}

export default page
