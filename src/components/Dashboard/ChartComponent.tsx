import React, { useMemo, useState } from 'react'
import { Tooltip, Area, AreaChart, XAxis } from 'recharts'

const WIDTH = 550
const HEIGHT = 350

const App = () => {
  const [chartData, setChartData] = useState(
    [
      30, 40, 45, 50, 49, 60, 61, 64, 62, 66, 67, 67, 74, 82, 84, 87, 89, 91,
    ].map((value, i) => ({
      name: `Nov ${i + 1}`,
      Hive: value,
    })),
  )

  const xAxisTicks = useMemo(() => {
    const mod = Math.ceil(chartData.length / 7)
    return chartData.reduce(
      (acc, { name }, i) => (
        i % mod === mod - 1 && i !== chartData.length - 1
          ? acc.push(name)
          : void 0,
        acc
      ),
      [] as string[],
    )
  }, [chartData])

  return (
    <AreaChart
      // this stops hydration errors when using SSR
      id="dashboard-chart"
      width={WIDTH}
      height={HEIGHT}
      data={chartData}
    >
      <defs>
        <linearGradient
          id="colorUv"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="5%"
            stopColor="#8884d8"
            stopOpacity={0.8}
          />
          <stop
            offset="95%"
            stopColor="#8884d8"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <Tooltip />
      <style>{`
        .recharts-text {
          fill: #666;
        }
      `}</style>
      <XAxis
        stroke="transparent"
        dataKey="name"
        ticks={xAxisTicks}
      />
      <Area
        // this stops hydration errors when using SSR
        isAnimationActive={false}
        type="monotone"
        dataKey="Hive"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  )
}

export default App
