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
  import { ChevronDown, Search } from "lucide-react"
  import { initialFiltersState, locationSchema, ageSchema, rangeSchema, filtersSchema, followersRangedSchema, followingsRangedSchema } from "@/models/schema-ui";
import FollowersFilterUI from "./followers-filter";

  type FiltersType = z.infer<typeof filtersSchema>;
  type followersRangedSchemaType = z.infer<typeof followersRangedSchema>;
  type followingsRangedSchemaType = z.infer<typeof followingsRangedSchema>;

  const FilterUI = () => {
    const [filters, setFilters] = React.useState(initialFiltersState);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FiltersType>({
      resolver: zodResolver(filtersSchema),
      defaultValues: initialFiltersState
    });

    const {register: registerFollowers, handleSubmit: handleSubmitFollowers, control: controlFollowers, reset: resetFollowers, formState: {errors: errorFollowers}} = useForm<followersRangedSchemaType>({
      resolver: zodResolver(followersRangedSchema),
      defaultValues: {
        followers: { from: null, to: null },
      },
    });

    const {register: registerFollowings, handleSubmit: handleSubmitFollowings, control: controlFollowings, reset: resetFollowings, formState: {errors: errorFollowings}} = useForm<followingsRangedSchemaType>({
      resolver: zodResolver(followingsRangedSchema),
      defaultValues: {
        followings: { from: null, to: null },
      },
    });

    const onSubmitMain = (data: FiltersType) => {
      console.log("Main data: ",data);
    };
    const handleResetMain = () => {
      reset();
    };
    const onSubmitFollowers = (data: followersRangedSchemaType) => {
      console.log("Follower data: ",data);
    }
    const handleResetFollowers = () => {
      resetFollowers();
    };

    const onSubmitFollowings = (data: followingsRangedSchemaType) => {
      console.log("Followings data: ",data);
    }
    const handleResetFollowings = () => {
      resetFollowings();
    };

    return (
      <Card className="w-full mb-8">
        <form onSubmit={handleSubmit(onSubmitMain)}>
        <CardHeader>
          <CardTitle>Discover Creators</CardTitle>
          <CardDescription>Find influencers that match your campaign needs.</CardDescription>
        </CardHeader>
        <CardContent>

            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Search</Label>
                <div className="flex space-x-1.5">
                  <Input id="name" placeholder="Search by Name" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 w-fit">
                <Label htmlFor="framework">Advanced Filters</Label>
                <section className="flex space-x-1.5">
                <div id="followers">
                  <Popover>
                    <form onSubmit={handleSubmitFollowers(onSubmitFollowers)}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Followers <ChevronDown /></Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <FollowersFilterUI />
                      </PopoverContent>
                    </form>
                  </Popover>
                </div>
                  <div id="followings">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Followings <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Followings Range</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the interval for following counts.
                            </p>
                          </div>
                          <div className="grid gap-5">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Minimum </Label>
                              <Input
                                id="width"
                                defaultValue=""
                                placeholder="minimum value (0)"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Maximum</Label>
                              <Input
                                id="maxWidth"
                                defaultValue=""
                                placeholder="maximum value (?)"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <Slider defaultValue={[33]} max={100} step={1} />
                          </div>
                        </div>
                        <div id="CardFooter" className="flex justify-between mt-5">
                          <Button variant="outline">Clear</Button>
                          <Button>Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="location">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Location <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Select a Location</h4>
                            <p className="text-sm text-muted-foreground">
                              Select a city, state or country.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid items-center gap-4">
                              <Input
                                id="width"
                                defaultValue=""
                                placeholder="E.g., Mumbai, Bengaluru"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
                        <div id="CardFooter" className="flex justify-between mt-5">
                          <Button variant="outline">Clear</Button>
                          <Button>Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="language">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Language <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Select Languages</h4>
                            <p className="text-sm text-muted-foreground">
                              Select Content Languages
                            </p>
                          </div>
                        </div>
                        <div id="CardFooter" className="flex justify-between mt-5">
                          <Button variant="outline">Clear</Button>
                          <Button>Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="categories">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Categories <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Width</Label>
                              <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Max. width</Label>
                              <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height">Height</Label>
                              <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxHeight">Max. height</Label>
                              <Input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="er">
                  <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Engagement Rate <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Engagement Rate</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the interval for engagement rates.
                            </p>
                          </div>
                          <div className="grid gap-5">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Minimum </Label>
                              <Input
                                id="width"
                                defaultValue=""
                                placeholder="minimum value (0)"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Maximum</Label>
                              <Input
                                id="maxWidth"
                                defaultValue=""
                                placeholder="maximum value (?)"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
                        <div id="CardFooter" className="flex justify-between mt-5">
                          <Button variant="outline">Clear</Button>
                          <Button>Apply</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="gender">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">Gender <ChevronDown /> </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Dimensions</h4>
                            <p className="text-sm text-muted-foreground">
                              Set the dimensions for the layer.
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="width">Width</Label>
                              <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxWidth">Max. width</Label>
                              <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="height">Height</Label>
                              <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="maxHeight">Max. height</Label>
                              <Input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                              />
                            </div>
                          </div>
                        </div>
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
                              More Filters coming soon
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
    )
  }

  export default FilterUI;
