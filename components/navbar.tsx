"use client";

import MobileSidebar from '@/components/mobile-sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ui/core/mode-toggle';
import { UserButton } from '@clerk/nextjs';


const Navbar = () => {


  return (
    <div className="flex items-center p-4 backdrop-blur-md md:fixed top-0 sm:left-0 md:left-72 right-0">
        <MobileSidebar />
        <div className='flex w-full justify-end'>
          <div className='flex items-center justify-between'>
            <ModeToggle/>
            <Button className='bg-black mr-2 ml-2'>What's new?</Button>
            <UserButton />
          </div>
        </div>
    </div>
  );
}

export default Navbar;
