'use client'
import { type ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const ApexCharts = dynamic(() => import('react-apexcharts'), {
	ssr: false,
})

const OPTIONS_CHART_BAR: ApexOptions = {
	chart: {
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},
	colors: ['#14b8a6', '#0ea5e9'],
	grid: {
		strokeDashArray: 0,
		borderColor: '#e5e7eb',
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '18px',
			borderRadius: 4,
			borderRadiusApplication: 'end',
			dataLabels: {
				position: 'top',
			},
		},
	},
	legend: {
		show: true,
	},
	dataLabels: {
		enabled: true,
		textAnchor: 'middle',
		offsetY: -20,
		style: {
			fontSize: '14px',
			colors: ['#304758'],
		},
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent'],
	},
	xaxis: {
		type: 'category',
		labels: {
			show: true,
			trim: true,
		},
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
		crosshairs: {
			show: false,
		},
	},
	yaxis: {
		forceNiceScale: true,
	},
	states: {
		hover: {
			filter: {
				type: 'darken',
			},
		},
	},
	tooltip: {
		followCursor: false,
		custom: ({ series, seriesIndex, dataPointIndex, w }) => {
			const hasSeriesMoreThanOne = w.globals.seriesNames.length > 1
			const label = hasSeriesMoreThanOne
				? `${w.globals.seriesNames[seriesIndex]} - ${w.globals.labels[dataPointIndex]}`
				: `${w.globals.labels[dataPointIndex]}`
			const value = `${series[seriesIndex][dataPointIndex]}`

			return `<div class="bg-gray-900 flex flex-col gap-1 text-white rounded-md p-2">
				<p class="font-semibold">${label}</p>
				<p>Total: ${value}</p>
			</div>`
		},
	},
}

type BarChartProps = ComponentProps<'div'> & {
	series: ApexAxisChartSeries
	categories: ApexXAxis['categories']
}

export const BarChart = ({ className, categories, series }: BarChartProps) => {
	return (
		<ApexCharts
			data-testid="bar-chart"
			className={twMerge('h-full w-full cursor-pointer', className)}
			type="bar"
			height="100%"
			width="100%"
			series={series}
			options={{
				...OPTIONS_CHART_BAR,
				xaxis: {
					...OPTIONS_CHART_BAR.xaxis,
					categories,
				},
			}}
		/>
	)
}
