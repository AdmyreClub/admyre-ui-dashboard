import EnrichUI from '@/components/enrich.ui'
import Heading from '@/components/heading'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'

const ImportPage = () => {
  return (
    <>
        <div className='pt-[5rem]'>
        <Heading
                title="Data Enrichment"
                description="Import and enrich your data with our data enrichment tool."
                icon={HardDriveDownload}
                iconColor="text-black-500"
                bgColor="bg-slate-500/10"
            />

        <div className='flex flex-col items-center sm:mx-4'>
            <div className='w-full max-w-8xl p-4'>
                <section className='py-12'>
                    <EnrichUI />
                </section>
                
            </div>
        </div>
        </div>
    </>
  )
}

export default ImportPage
