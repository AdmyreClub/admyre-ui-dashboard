import ActionSelectionUI from '@/components/action.selection.ui'
import Heading from '@/components/heading'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'

const ActionTrackUI = () => {
  return (
    <>
        <div className='pt-[5rem]'>
        <Heading
                title="Data Track"
                description="Tracking shirororro QUESARR"
                icon={HardDriveDownload}
                iconColor="text-black-500"
                bgColor="bg-slate-500/10"
            />
        </div>
    </>
  )
}

export default ActionTrackUI
