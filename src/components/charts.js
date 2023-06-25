import {
  Fragment,
} from 'react';

import { 
  BarChart as SimpleBarChart, 
  Bar,
  AreaChart as SimpleAreaChart,
  Area,
  LineChart as SimpleLineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
} from 'recharts';

import { 
  curveCardinal,
} from 'd3-shape';

const cardinal = curveCardinal.tension(0.2);

const BarChart = ({
  data = [],
  bars = [],
  xAxis = '',
  stack = false,
}) => {
  return <>
    <ResponsiveContainer width='100%' aspect={2.5}>
      <SimpleBarChart 
        data={data}
        margin={{
          left: 0,
        }}
      >
        <CartesianGrid 
          strokeDasharray='3 3' 
        />

        <XAxis dataKey={xAxis}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>

        {bars && bars.map((i, index) => (
          <Fragment key={index}>
            <Bar
              barSize={20}
              minPointSize={5}
              name={i.name} 
              dataKey={i.dataKey} 
              fill={i.fill}
              stackId={i?.stackId}
            />
          </Fragment>
        ))}
      </SimpleBarChart>
    </ResponsiveContainer>
  </>
};

const AreaChart = ({
  data = [],
  areas = [],
  xAxis = '',
}) => {
  return <>
    <ResponsiveContainer width='100%' aspect={2.5}>
      <SimpleAreaChart
        data={data}
        margin={{
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3'/>

        <XAxis dataKey={xAxis}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>

        {areas && areas.map((i, index) => (
          <Fragment key={index}>
            <Area 
              type='monotone'
              stackId='1'
              name={i.name} 
              dataKey={i.dataKey} 
              stroke={i.stroke}
              fill={i.fill}
            />
          </Fragment>
        ))}
      </SimpleAreaChart>
    </ResponsiveContainer>
  </>
}

const LineChart = ({
  data = [],
  lines = [],
  xAxis = '',
}) => {
  return <>
    <ResponsiveContainer width='100%' aspect={2.5}>
      <SimpleLineChart
        data={data}
        margin={{
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3'/>

        <XAxis dataKey={xAxis}/>
        <YAxis/>

        <Tooltip/>
        <Legend/>

        {lines && lines.map((i, index) => (
          <Fragment key={index}>
            <Line type='monotone'
              name={i.name} 
              dataKey={i.dataKey} 
              stroke={i.stroke}
            />
          </Fragment>
        ))}
      </SimpleLineChart>
    </ResponsiveContainer>
  </>
}

const VerticalLineChart = ({
  data = [],
  lines = [],
  xAxis = '',
}) => {
  return <>
    <ResponsiveContainer width='100%' aspect={2.5}>
      <SimpleLineChart
        layout='vertical'
        data={data}
        margin={{
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        
        <XAxis type='number' />
        <YAxis 
          dataKey='name' 
          type='category' 
        />

        <Tooltip/>
        <Legend/>

        {lines && lines.map((i, index) => (
          <Fragment key={index}>
            <Line type='monotone'
              name={i.name} 
              dataKey={i.dataKey} 
              stroke={i.stroke}
            />
          </Fragment>
        ))}
      </SimpleLineChart>
    </ResponsiveContainer>
  </>
}

export {
  BarChart,
  AreaChart,
  LineChart,
  VerticalLineChart,
}