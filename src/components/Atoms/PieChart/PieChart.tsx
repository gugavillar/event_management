'use client'
import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const OPTIONS_CHART_PIE: ApexOptions = {
	chart: {
		zoom: {
			enabled: false,
		},
	},
	legend: {
		position: 'bottom',
	},
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: true,
					total: {
						show: true,
						showAlways: true,
						label: '',
					},
					value: {
						offsetY: -8,
					},
				},
			},
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 5,
	},
	states: {
		hover: {
			filter: {
				type: 'none',
			},
		},
	},
	tooltip: {
		followCursor: true,
	},
}

type PieChartProps = ComponentProps<'div'> & {
	series: ApexNonAxisChartSeries
	labels: ApexOptions['labels']
}

export const PieChart = ({ className, labels, series }: PieChartProps) => {
	return (
		<ApexCharts
			className={twMerge('flex h-full w-full cursor-pointer', className)}
			type="donut"
			height="100%"
			width="100%"
			series={series}
			options={{
				...OPTIONS_CHART_PIE,
				labels,
			}}
		/>
	)
}
