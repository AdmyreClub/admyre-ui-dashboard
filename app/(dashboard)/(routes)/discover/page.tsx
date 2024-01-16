"use client";


import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "@/components/heading";
import { UserRound } from "lucide-react";
import { DataTable } from '@/components/ui/Table/DataTable'; // Assuming DataTable is correctly implemented
import { columns } from '@/components/ui/Table/columns'; // Assuming columns are defined
import FilterUI from "@/components/filter-ui";

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const body = {
                    filters: {}, // Add your filters here
                    page: page - 1,
                    pageSize: pageSize
                };
                console.log("fireeee")
                const response = await axios.post('/api/search', body);
                if (response.data.results) {
                    setData([...response.data.results]); // Spread into a new array to ensure React recognizes the change
                    setTotalDocuments(response.data.totalDocuments);
                  }
                //console.log('Query results:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, pageSize]);

    return (
        <div className="pt-[5rem]">
            <Heading
                title="Creator Discovery"
                description="Instantly Connect with Influencers from the Largest Database"
                icon={UserRound}
                iconColor="text-black-500"
                bgColor="bg-slate-500/10"
            />

            <div className="flex flex-col items-center sm:mx-4">
                <div className="w-full max-w-8xl p-4">
                    <section className='py-12'>
                        <div className='container'>
                          <FilterUI />
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
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DiscoverPage;
