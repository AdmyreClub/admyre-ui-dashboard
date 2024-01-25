"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "@/components/heading";
import { UserRound } from "lucide-react";
import { DataTable } from "@/components/ui/Table/DataTable"; // Assuming DataTable is correctly implemented
import { columns } from "@/components/ui/Table/columns"; // Assuming columns are defined
import FilterUI from "@/components/filter-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIFilterUI from "@/components/ai.filter-ui";
import DiscoverListUI from "@/components/list.ui";
import { useAuth } from "@/app/context/AuthContext";

type SocialHandleMetric = {
  followers: number;
  following: number;
  avgEngagement: number;
  avgLikes: number;
  avgComments: number;
  numOfPosts: number;
  avgVideoViews: number;
  subscribers: number;
  totalVideos: number;
  avgReach: number;
  totalViews: number;
  __typename: string;
};

type SocialHandle = {
  id: string;
  platform: string;
  handle: string;
  url: string;
  metrics: SocialHandleMetric;
  __typename: string;
};

type ContentCategory = {
  id: string;
  name: string;
  __typename: string;
};

type CreatorProgram = {
  id: string;
  tag: string;
  level: string;
  __typename: string;
};

type ProfileImage = {
  url: string;
  __typename: string;
};

type DataType = {
  _id: string;
  id: string;
  onGcc: boolean;
  instaVerified: boolean;
  blackListedBy: null | string;
  blackListedReason: null | string;
  isBlackListed: boolean;
  name: string;
  email: string;
  socialHandles: SocialHandle[];
  gender: string;
  contentCategories: ContentCategory[];
  label: null | string;
  profileLabel: string;
  languages: null | string[];
  country: string;
  state: string;
  city: string;
  bio: string;
  dob: string;
  age: number;
  barterAllowed: boolean;
  isPlixxoUser: boolean;
  profileImage: ProfileImage;
  whatsappNumber: string;
  whatsappOptin: boolean;
  creatorPrograms: CreatorProgram[];
  creatorCohorts: null | string[]; // assuming it's an array of strings, update if it's different
  phone: string;
  comment: null | string;
  commercials: any[]; // Specify the type for commercials if you have a structure for it
  __typename: string;
};

// For the API response
type ApiResponse = {
  totalDocuments: number;
  results: DataType[];
};

const DiscoverPage = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1); // Starting from 1 for user-friendly page numbering
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [filterData, setFilterData] = useState<object>({});
  const { userId } = useAuth();

  const handleFilterData = (dataFromChild: object) => {
    setFilterData(dataFromChild);
    console.log("data recieved", dataFromChild);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          filters: filterData, // Add your filters here
          page: page - 1,
          pageSize: pageSize,
        };
        console.log("fireeee");
        const response = await axios.post("/api/search", body);
        if (response.data.results) {
          setData([...response.data.results]); // Spread into a new array to ensure React recognizes the change
          setTotalDocuments(response.data.totalDocuments);
        }
        console.log('Query results:', response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize, filterData]);

  const [plans, setPlans] = useState([
    { id: 1, name: "Basic Plan", date: "Jan 20, 2024" },
    { id: 2, name: "Premium Plan", date: "Jan 22, 2024" },
    // Add more plans as needed
  ]);

  // Handlers for plan actions
  const handleNewPlan = () => {
    // Logic to add a new plan
  };

  const handleSelectPlan = (planId: number) => {
    // Logic when a plan is selected
  };

  const handleDeletePlan = (planId: number) => {
    // Logic to delete a plan
  };

  return (
    <div className="pt-[5rem]">
      <Heading
        title="Creator Discovery"
        description="Instantly Connect with Influencers from the Largest Database"
        icon={UserRound}
        iconColor="text-black-500"
        bgColor="bg-slate-500/10"
      />

      {/* Main content and sidebar wrapper */}
      <div className="flex flex-col items-center sm:mx-4">
        <div className="flex w-full max-w-8xl">
          {/* Main content */}
          <section className="flex-grow py-12 pr-4">
            <Tabs defaultValue="manual">
              <TabsList>
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="ai-filter">AI Based Filtering</TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <FilterUI onDataFromChild={handleFilterData} />
              </TabsContent>
              <TabsContent value="ai-filter">
                <AIFilterUI />
              </TabsContent>
            </Tabs>

            <DataTable
              key={`${page}-${pageSize}`}
              totalDocuments={totalDocuments}
              columns={columns}
              data={data}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </section>

          {/* List Sidebar */}
          <DiscoverListUI userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
