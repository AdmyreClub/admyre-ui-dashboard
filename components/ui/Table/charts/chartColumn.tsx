import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Mock data for audience gender distribution
const genderData = [
  { name: "Male", value: 40 },
  { name: "Female", value: 60 },
];

// Mock data for followings over time
const followingsData = [
  { date: "2022-01-01", count: 100 },
  { date: "2022-01-02", count: 120 },
  { date: "2022-01-03", count: 90 },
  { date: "2022-01-04", count: 110 },
  { date: "2022-01-05", count: 130 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex justify-around text-center">
      {/* Pie Chart - Audience Gender Distribution */}
      <div className="flex-col">
      <div className="flex justify-center">
          <h1 className="w-[150px] text-[12px] justify-center ml-10 p-1 bg-black rounded-md text-white">
            Audience Gender
          </h1>
        </div>
        <div style={{ width: "200px", }}>
          <PieChart width={250} height={250}>
            <Pie
              data={genderData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={(entry) => entry.name}
            >
              {genderData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#AD63FF" : "#575A89"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Line Chart - Followings Over Time */}
      <div className="flex-col ml-[-10] mr-7 ">
        <div className="flex justify-center">
          <h1 className="w-[100px] text-[12px] justify-center ml-[100px] p-1 bg-black rounded-md text-white">
           Likes over a period of time
          </h1>
        </div>
        <div style={{ width: "250px"}}>
          <LineChart
            width={270}
            height={250}
            data={followingsData}
            className="mt-[20px]"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="black"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
