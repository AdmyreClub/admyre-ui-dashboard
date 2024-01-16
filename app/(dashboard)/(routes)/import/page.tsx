import Heading from '@/components/heading'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
                <section className='py-12 flex'>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Framework</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                    <SelectItem value="next">Next.js</SelectItem>
                                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                    <SelectItem value="astro">Astro</SelectItem>
                                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Name of your project" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Framework</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                <SelectItem value="astro">Astro</SelectItem>
                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
                </section>
            </div>
        </div>
        </div>
    </>
  )
}

export default ImportPage
