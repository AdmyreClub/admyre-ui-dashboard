"use client";
import * as React from "react"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown, Filter, Search } from "lucide-react"
import { initialFiltersState, locationSchema, ageSchema, rangeSchema, filtersSchema, followersRangedSchema, followingsRangedSchema } from "@/models/schema-ui";

import FollowerFilter from './filters/followers-filter'
import FollowingsFilterUI from "./filters/followings-filter";
import LocationFilterUI from "./filters/location-filter";
import LanguageFilterUI from "./filters/language-filter";
import EngagementFilterUI from "./filters/engagement-filter";
import GenderForm from "./filters/genders-filter";
import CategoriesFilterUI from "./filters/categories-filter";

type FiltersType = z.infer<typeof filtersSchema>;
type followersRangedSchemaType = z.infer<typeof followersRangedSchema>;
type followingsRangedSchemaType = z.infer<typeof followingsRangedSchema>;

const FilterUI = () => {
  const [filters, setFilters] = React.useState(initialFiltersState);

  const [followerData, setFollowerData] = React.useState([0, 100000000])
  const [genderData, setGenderData] = React.useState("male")
  const [followingData, setFollowingData] = React.useState([0, 100000000])
  const [engagementRateData, setEngagementRateData] = React.useState([0, 100])

  const handleFollowerData = (dataFromChild: [number, number]) => {
    // Do something with the data received from the child component
    setFollowerData(dataFromChild);
  };
  const handleEngagementRateData = (dataFromChild: [number, number]) => {
    // Do something with the data received from the child component
    setEngagementRateData(dataFromChild);
  };
  const handleGenderData = (dataFromChild: string) => {
    // Do something with the data received from the child component
    setGenderData(dataFromChild);
  };
  const handleFollowingData = (dataFromChild: [number, number]) => {
    // Do something with the data received from the child component
    setFollowingData(dataFromChild);
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FiltersType>({
    resolver: zodResolver(filtersSchema),
    defaultValues: initialFiltersState
  });

  const onSubmitMain = (data: FiltersType) => {
    // console.log("Main data: ",data);
    // console.log("follower data: " , followerData);
    // console.log("engagementRate data: " , engagementRateData);
    // console.log("gender data: " , genderData);
    // console.log("following data: " , followingData);
    console.log("outsidee")
  };
  const handleResetMain = () => {
    reset();
  };


  return (
    <>
    <Card className="w-full mb-8">
      <form onSubmit={handleSubmit(onSubmitMain)}>
      <CardHeader>
        <CardTitle>Discover Creators</CardTitle>
        <CardDescription>Find influencers that match your campaign needs.</CardDescription>
      </CardHeader>
      <CardContent>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Give us some hints</Label>
              <div className="flex space-x-1.5">
                <Input id="name" placeholder="Narrow down results by keywords, hashtags etc" />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 w-fit">
              <Label htmlFor="framework">Advanced Filters</Label>
              <section className="flex flex-wrap space-x-1.5 gap-1.5 items-start">
              <div id="followers">
                <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Followers <ChevronDown /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <FollowerFilter onDataFromChild={handleFollowerData} defaultVal={followerData}/>
                    </PopoverContent>
                </Popover>
              </div>
                <div id="followings">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Followings <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <FollowingsFilterUI onDataFromChild={handleFollowingData} defaultVal={followingData}/>
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="location">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Location <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <LocationFilterUI />
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="language">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Language <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <LanguageFilterUI />
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="categories">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Categories <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <CategoriesFilterUI />
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="er">
                <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Engagement Rate <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <EngagementFilterUI onDataFromChild={handleEngagementRateData} defaultVal={engagementRateData}/>
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="gender">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">Gender <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <GenderForm onDataFromChild={handleGenderData} defaultVal={genderData}/>
                    </PopoverContent>
                  </Popover>
                </div>
                <div id="more">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex space-x-2">More <ChevronDown /> </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">More Filters</h4>
                          <p className="text-sm text-muted-foreground">
                            More Filters coming soon 🧑🏻‍💻
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </section>
            </div>
          </div>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleResetMain}>Clear</Button>
        <Button type="submit">Apply</Button>
      </CardFooter>
      </form>
    </Card>
    </>
  )
}

export default FilterUI;
