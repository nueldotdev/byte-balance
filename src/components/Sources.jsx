import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { pieData } from "../assets/chartData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6B6B"];

const Sources = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-2">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl font-semibold">Sources</h1>
      </div>
      <div className="w-[70%] h-[70%]">
        <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={pieData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Deposit" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        <p>Maybe some other content</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={pieData}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Transfer" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Sources;
