import Heading from '@/components/heading'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'

const SelectStrategyUI = () => {
  return (
    <>
        <div className='pt-[5rem]'>
        <Heading
                title="Data Import"
                description="Import zehahahahah"
                icon={HardDriveDownload}
                iconColor="text-black-500"
                bgColor="bg-slate-500/10"
            />
        </div>
    </>
  )
}

export default SelectStrategyUI
