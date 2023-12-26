"use client";
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from '@/components/mobile-sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathname = usePathname();

  // Specify the pathname where you want to hide the button
  const hideButtonOnPath = '/discover';

  return (
    <div className="flex items-center p-4 backdrop-blur-md md:fixed top-0 sm:left-0 md:left-72 right-0">
        <MobileSidebar />
        <div className='flex w-full justify-between'>
          <UserButton />
          <div className='flex items-center'>
            <Button className='bg-black mr-2'>What's new?</Button>
            {pathname !== hideButtonOnPath && (
              <Button className='bg-[#2e2758] flex justify-between'><Plus /> Add Campaign</Button>
            )}
          </div>
        </div>
    </div>
  );
}

export default Navbar;
