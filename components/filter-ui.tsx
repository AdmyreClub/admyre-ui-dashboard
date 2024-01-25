"use client";
import * as React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, Filter, Search, X } from "lucide-react";
import {
  initialFiltersState,
  locationSchema,
  ageSchema,
  rangeSchema,
  filtersSchema,
  followersRangedSchema,
  followingsRangedSchema,
} from "@/models/schema-ui";

import FollowerFilter from "./filters/followers-filter";
import FollowingsFilterUI from "./filters/followings-filter";
import LocationFilterUI from "./filters/location-filter";
import LanguageFilterUI from "./filters/language-filter";
import EngagementFilterUI from "./filters/engagement-filter";
import GenderForm from "./filters/genders-filter";
import CategoriesFilterUI from "./filters/categories-filter";
import axios from "axios";

type FiltersType = z.infer<typeof filtersSchema>;
type followersRangedSchemaType = z.infer<typeof followersRangedSchema>;
type followingsRangedSchemaType = z.infer<typeof followingsRangedSchema>;

interface ChildProps {
  onDataFromChild: (data: object) => void;
}

const FilterUI = ({ onDataFromChild }: ChildProps) => {
  const [filters, setFilters] = React.useState(initialFiltersState);
  const [categoriesData, setCategoriesData] = React.useState<string[]>([]);
  const [followerData, setFollowerData] = React.useState([0, 100000000]);
  const [genderData, setGenderData] = React.useState("male");
  const [followingData, setFollowingData] = React.useState([0, 100000000]);
  const [engagementRateData, setEngagementRateData] = React.useState([0, 100]);
  const [languagesData, setLanguagesData] = React.useState<string[]>([]);
  const [locationData, setLocationData] = React.useState<string[]>([]);
  const [keywords, setKeywords] = React.useState<string[]>([]);

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

  const handleCategoriesData = (dataFromChild: string[]) => {
    // Do something with the data received from the child component
    setCategoriesData(dataFromChild);
  };
  const handleLanguagesData = (dataFromChild: string[]) => {
    // Do something with the data received from the child component
    setLanguagesData(dataFromChild);
  };
  const handleLocationData = (dataFromChild: string[]) => {
    // Do something with the data received from the child component
    setLocationData(dataFromChild);
  };

  const handleKeywordInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const newKeyword = event.currentTarget.value.trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        setKeywords([...keywords, newKeyword]);
        event.currentTarget.value = ""; // Clear the input field
      }
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FiltersType>({
    resolver: zodResolver(filtersSchema),
    defaultValues: initialFiltersState,
  });



  
   const onSubmitMain = async (data: FiltersType) => {
    data.followers.from = followerData[0];
    data.followers.to = followerData[1];
    data.categories = categoriesData.categories;
    data.followings.from = followingData[0];
    data.followings.to = followingData[1];
    data.location = locationData;
    data.languages = languagesData.languages;
    data.engagementRate.from = engagementRateData[0];
    data.engagementRate.to = engagementRateData[1];
    data.gender = genderData;
    const categories = categoriesData ?? [];
    const languages = languagesData ?? [];
    // Assemble filter data
    console.log("from outside");

    const assembledData = {
      followers: {
        from: followerData[0],
        to: followerData[1],
      },
      categories: categoriesData || [],
      languages: languagesData || [],
      followings: {
        from: followingData[0],
        to: followingData[1],
      },
      location: locationData,
      engagementRate: {
        from: engagementRateData[0],
        to: engagementRateData[1],
      }, // Now structured as an object
      gender: genderData,
      keywords: keywords,
    };

  };

  const handleResetMain = async () => {
    reset();
  };
  const handleSubmitMain = async () => {
    const assembledData = {
      followers: {
        from: followerData[0],
        to: followerData[1],
      },
      categories: categoriesData || [],
      languages: languagesData || [],
      followings: {
        from: followingData[0],
        to: followingData[1],
      },
      location: locationData,
      engagementRate: {
        from: engagementRateData[0],
        to: engagementRateData[1],
      }, // Now structured as an object
      gender: genderData,
      keywords: keywords,
    };  
    onDataFromChild(assembledData)
  };
  function formatLargeNumber(number: number) {
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;

    if (number >= billion) {
      return (Math.round((number / billion) * 100) / 100).toFixed(0) + "B";
    } else if (number >= million) {
      return (Math.round((number / million) * 100) / 100).toFixed(0) + "M";
    } else if (number >= thousand) {
      return (Math.round((number / thousand) * 100) / 100).toFixed(0) + "K";
    } else if (number >= 100) {
      return Math.round(number).toString();
    } else {
      return number.toFixed(0); // Format numbers less than 100 with two decimal places
    }
  }

  return (
    <>
      <Card className="w-full mb-8">
        <form onSubmit={handleSubmit(onSubmitMain)}>
          <CardHeader>
            <CardTitle>Discover Creators</CardTitle>
            <CardDescription>
              Find influencers that match your campaign needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keywords">Give us some hints</Label>
                <div className="flex space-x-1.5">
                  <Input
                    id="keywords"
                    placeholder="Narrow down filter results by typing keywords, hashtags etc (e.g., food, yoga, #ahmedabad)"
                    onKeyDown={handleKeywordInput}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 border px-3 py-1 rounded-full"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="rounded-full text-sm p-1"
                    >
                      <X size={18} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-col space-y-1.5 w-fit">
                <Label htmlFor="framework">Advanced Filters</Label>
                <section className="flex flex-wrap space-x-1.5 gap-1.5 items-start">
                  <div id="followers">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Followers <ChevronDown />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <FollowerFilter
                          onDataFromChild={handleFollowerData}
                          defaultVal={followerData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="followings">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Followings <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <FollowingsFilterUI
                          onDataFromChild={handleFollowingData}
                          defaultVal={followingData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="location">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Location <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <LocationFilterUI
                          onDataFromChild={handleLocationData}
                          defaultVal={locationData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="language">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Language <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <LanguageFilterUI
                          onDataFromChild={handleLanguagesData}
                          defaultVal={languagesData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="categories">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Categories <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <CategoriesFilterUI
                          onDataFromChild={handleCategoriesData}
                          defaultVal={categoriesData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="er">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Engagement Rate <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <EngagementFilterUI
                          onDataFromChild={handleEngagementRateData}
                          defaultVal={engagementRateData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="gender">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          Gender <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <GenderForm
                          onDataFromChild={handleGenderData}
                          defaultVal={genderData}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div id="more">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex space-x-2">
                          More <ChevronDown />{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                              More Filters
                            </h4>
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
          <Card className="flex flex-col w-[300px] ml-6 text-[16px] text-gray-400 shadow-md border-none p-2 mb-3">
            <p>
              Followers From {formatLargeNumber(followerData[0])} to {formatLargeNumber(followerData[1])}
            </p>
            <p>
              Following From {formatLargeNumber(followingData[0])} to {formatLargeNumber(followingData[1])}
            </p>
            <p className="flex  ">
              Locations include : {locationData?.map((location)  => {
                return <><p className="ml-1">{location},</p></>
              })}
            </p>
            <p className="flex  ">
              Languages include : {languagesData?.map((language)  => {
                return <><p className="ml-1">{language},</p></>
              })}
            </p>
            <p className="flex  ">
              Categories include : {categoriesData?.map((category)  => {
                return <><p className="ml-1">{category},</p></>
              })}
            </p>
          </Card>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setCategoriesData([]);
                setEngagementRateData([0, 0]);
                setFollowerData([0, 0]);
                setFollowingData([0, 0]);
                setLanguagesData([]);
                setLocationData([]);
                setGenderData("");
                handleResetMain();
              }}
            >
              Clear
            </Button>
            <Button type="submit" onClick={handleSubmitMain}>
              Apply
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default FilterUI;
