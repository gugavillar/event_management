'use client'
import { ApexOptions } from 'apexcharts'
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
	colors: ['#00808B'],
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
		show: false,
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
		show: false,
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
				value: 0.9,
			},
		},
	},
	tooltip: {
		followCursor: false,
		custom: ({ series, seriesIndex, dataPointIndex, w }) => {
			return `<div class="bg-gray-900 flex flex-col gap-1 text-white rounded-md p-2"><p class="font-semibold">${w.globals.labels[dataPointIndex]}</p><p>Total: ${series[seriesIndex][dataPointIndex]}</p></div>`
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
