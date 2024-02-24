import ActionSelectionUI from '@/components/action.selection.ui'
import Heading from '@/components/heading'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarClock } from 'lucide-react'
import React from 'react'

const ActionTrackUI = () => {
  return (
    <>
        <div className='pt-[5rem]'>
          <Heading
            title="Post & Profile Tracker"
            description="Monitor campaign performance and analyze competitors with real time tracking of posts and profiles"
            icon={CalendarClock}
            iconColor="text-primary-500" // Adjust the color class as needed
            bgColor="bg-slate-500/10" // Adjust the background color class as needed
          />

          <div className="flex w-full max-w-8xl items-center justify-center my-10">
            <Card className="w-full m-10 justify-center flex p-3">
              <Tabs defaultValue="posts">
                  <TabsList>
                    <TabsTrigger value="posts">Track Posts</TabsTrigger>
                    <TabsTrigger value="profiles">Track Profiles</TabsTrigger>
                  </TabsList>
                  <TabsContent value="posts">
                    <Card>
                      <p>skfhsdkjfhs</p>
                    </Card>
                  </TabsContent>
                  <TabsContent value="profiles">
                  <Card>
                      <p>sajkhfkjusdfhgksdjfjuks</p>
                    </Card>
                  </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
    </>
  )
}

export default ActionTrackUI
