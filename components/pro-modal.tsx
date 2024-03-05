"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { Badge } from './ui/badge';

const ProModal = () => {
    const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent className='w-[1000px]'>
            <DialogHeader>
                <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
                   <div className='flex items-center gap-x-2 font-bold py-1'>
                        Purchase More Tokens
                        <Badge className='uppercase text-sm py-1'>Top up</Badge>
                   </div>
                </DialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ProModal
