'use client'
import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import type { ApexOptions } from 'apexcharts'

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
	dataLabels: {
		enabled: true,
		offsetY: -20,
		style: {
			colors: ['#304758'],
			fontSize: '14px',
		},
		textAnchor: 'middle',
	},
	grid: {
		borderColor: '#e5e7eb',
		strokeDashArray: 0,
	},
	legend: {
		show: true,
	},
	plotOptions: {
		bar: {
			borderRadius: 4,
			borderRadiusApplication: 'end',
			columnWidth: '18px',
			dataLabels: {
				position: 'top',
			},
			horizontal: false,
		},
	},
	states: {
		hover: {
			filter: {
				type: 'darken',
			},
		},
	},
	stroke: {
		colors: ['transparent'],
		show: true,
		width: 2,
	},
	tooltip: {
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
		followCursor: false,
	},
	xaxis: {
		axisBorder: {
			show: false,
		},
		axisTicks: {
			show: false,
		},
		crosshairs: {
			show: false,
		},
		labels: {
			show: true,
			trim: true,
		},
		type: 'category',
	},
	yaxis: {
		forceNiceScale: true,
	},
}

type BarChartProps = ComponentProps<'div'> & {
	series: ApexAxisChartSeries
	categories: ApexXAxis['categories']
}

export const BarChart = ({ className, categories, series }: BarChartProps) => {
	return (
		<ApexCharts
			className={twMerge('h-full w-full cursor-pointer', className)}
			data-testid="bar-chart"
			height="100%"
			options={{
				...OPTIONS_CHART_BAR,
				xaxis: {
					...OPTIONS_CHART_BAR.xaxis,
					categories,
				},
			}}
			series={series}
			type="bar"
			width="100%"
		/>
	)
}
