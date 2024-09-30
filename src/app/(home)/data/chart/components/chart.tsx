'use client'
import logo from '@/assets/frigosul.png'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formattedTime } from '@/utils/formatted-time'

import Image from 'next/image'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    theme: {
      light: 'hsl(var(--chart-1))',
      dark: 'hsl(var(--chart-1))',
    },
  },
  mobile: {
    label: 'Mobile',
    theme: {
      light: 'hsl(var(--chart-2))',
      dark: 'hsl(var(--chart-2))',
    },
  },
} satisfies ChartConfig

interface ChartProps {
  local: string
  chartType: 'temp' | 'press'
  dateClose: Date
  dateOpen: Date
  minValue?: number
  maxValue?: number
  data: {
    time: Date
    temp: number
  }[]
}
export function Chart({
  data,
  dateClose,
  dateOpen,
  local,
  minValue,
  maxValue,
}: ChartProps) {
  console.log('antes do reduce' + minValue, maxValue)
  if (!minValue || !maxValue) {
    console.log('entrou no if')

    const minAndMaxValue = data.reduce(
      (acc, current) => {
        return {
          minValue:
            current.temp < acc.minValue ? current.temp + 1 : acc.minValue,
          maxValue:
            current.temp > acc.maxValue ? current.temp + 1 : acc.maxValue,
        }
      },
      { minValue: Infinity, maxValue: -Infinity },
    )
    minValue = minAndMaxValue.minValue
    maxValue = minAndMaxValue.maxValue
  }

  console.log(minValue, maxValue)
  const interval = Math.abs(Number(maxValue) - Number(minValue)) + 1
  const formattedOpenDate = String(dateOpen).replace('T', ' ')
  const formattedCloseDate = String(dateClose).replace('T', ' ')
  const formattedData = data.map((item) => {
    return {
      time: formattedTime(new Date(item.time)),
      temp: item.temp,
    }
  })
  return (
    <div>
      <div className="flex justify-between mb-4 px-4">
        <Image src={logo} alt="Logo Frigosul" width={200} />
        <div className="flex flex-col gap-1 text-justify text-xs font-semibold dark:font-light">
          <span>
            Empresa:{' '}
            <span className="capitalize">Frigosul frigorífico Sul LTDA.</span>{' '}
          </span>
          <span>
            CNPJ: <span>02.591.772/0001-70</span>{' '}
          </span>
          <span>
            Cidade:{' '}
            <span className="capitalize">aparecida do Taboado - MS</span>{' '}
          </span>
          <span>
            SIF: <span>889</span>{' '}
          </span>
        </div>
      </div>
      <div className="relative border border-card-foreground rounded-md py-4 ">
        <div className="absolute right-9 top-9 min-w-60  border border-card-foreground !bg-muted  dark:!bg-slate-800 shadow-sm rounded-md z-20 p-2 px-3 text-xs font-light flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Local: </span>
            <span>{local}</span>
          </div>
          <div className="flex justify-between">
            <span>Fechamento: </span>
            <span>{formattedCloseDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Abertura: </span>
            <span>{formattedOpenDate}</span>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <LineChart
            width={500}
            data={formattedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={0.5}
            />
            <XAxis dataKey="time" stroke="hsl(var(--card-foreground))" />
            <YAxis
              type="number"
              domain={[minValue, maxValue]}
              ticks={Array.from({ length: interval }).map(
                (_, i) => minValue + i,
              )}
              interval={0}
              stroke="hsl(var(--card-foreground))"
            />
            <ReferenceLine y={10} label="Max." stroke="red" />
            <ReferenceLine y={0} stroke="black" strokeWidth={2} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="temp"
              strokeWidth={2}
              stroke="var(--color-desktop)"
              fill="var(--color-desktop)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}
