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
			columnWidth: '16px',
			borderRadius: 0,
		},
	},
	legend: {
		show: false,
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 8,
		colors: ['transparent'],
	},
	xaxis: {
		type: 'category',
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
