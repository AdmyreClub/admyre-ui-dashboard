import { Tabs, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { TabsList } from "../../tabs";
import { AreaChart } from "recharts";

interface FollowingData {
  date: string;
  followers: number;
}

const generateMockData = (
  duration: "week" | "month" | "year"
): FollowingData[] => {
  const currentDate = new Date();
  const mockData = [];

  if (duration === "week") {
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      mockData.push({
        date: date.toISOString().split("T")[0],
        followers: Math.floor(Math.random() * 1000),
      });
    }
  } else if (duration === "month") {
    for (let i = 0; i < 30; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i
      );
      mockData.push({
        date: date.toISOString().split("T")[0],
        followers: Math.floor(Math.random() * 1000),
      });
    }
  } else if (duration === "year") {
    for (let i = 0; i < 12; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      mockData.push({
        date: date.toISOString().split("T")[0],
        followers: Math.floor(Math.random() * 1000),
      });
    }
  }

  return mockData.reverse();
};

interface ChildProps {
  label: string;
}

const FollowingChart: React.FC = ( {label }: ChildProps) => {
  const [duration, setDuration] = useState<"week" | "month" | "year">("week");
  const mockData = generateMockData(duration);

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <div className="flex space-x-4 mb-4 justify-aound bg-gray-200 w-[65%] p-1 rounded-[5px] ">
          <button
            className={`py-2 px-4 rounded transition-colors focus:outline-none ${
              duration === "week"
                ? "bg-white text-black shadow-md font-sem#AD63FF"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setDuration("week")}
          >
            1 Week
          </button>
          <button
            className={`py-2 px-4 rounded focus:outline-none ${
              duration === "month"
                ? "bg-white text-black shadow-md font-sem#AD63FF "
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setDuration("month")}
          >
            1 Month
          </button>
          <button
            className={`py-2 px-4 rounded focus:outline-none ${
              duration === "year"
                ? "bg-white text-black shadow-md font-sem#AD63FF "
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setDuration("year")}
          >
            1 Year
          </button>
        </div>
      </div>
      <AreaChart
        width={450}
        height={200}
        data={mockData}
        margin={{ top: 20, right: 40, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#AD63FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#AD63FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="followers"
          stroke="#AD63FF"
          fill="url(#colorUv)"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
      <div className="flex justify-center">
        <h1 className="w-[100px] text-[12px] justify-center mt-5 p-1 bg-black rounded-md text-white">
          {label}
        </h1>
      </div>
    </div>
  );
};

export default FollowingChart;
