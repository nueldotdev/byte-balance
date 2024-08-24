import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    Outgoing: 4000,
    Incoming: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    Outgoing: 3000,
    Incoming: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    Outgoing: 2000,
    Incoming: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    Outgoing: 2780,
    Incoming: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    Outgoing: 1890,
    Incoming: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    Outgoing: 2390,
    Incoming: 3800,
    amt: 2500,
  }
];

export default function Statistics(props) {
  return (
    <div className='w-full h-full flex flex-col gap-y-2'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>{props.title}</h1>
      </div>
      <ResponsiveContainer className={'-translate-x-4'}>
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={props.key1} stroke="#22c55e" />
          <Line type="monotone" dataKey={props.key2} stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
}
