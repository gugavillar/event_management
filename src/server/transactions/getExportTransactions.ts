import { format } from 'date-fns'
import { NextResponse } from 'next/server'
import { utils, write } from 'xlsx'
import { z } from 'zod'

import {
	amountType,
	transactionType,
} from '@/components/Organisms/TransactionDrawer/TransactionDrawer.utils'
import { generateColumnWidths, prisma } from '@/constants'
import { currencyValue } from '@/formatters'

export const getExportTransactions = async (eventId: string) => {
	try {
		z.object({
			eventId: z.uuid(),
		}).parse({ eventId })

		const transactions = await prisma.transactions.findMany({
			where: {
				eventId,
			},
			include: {
				event: true,
			},
			orderBy: {
				date: 'asc',
			},
		})

		if (!transactions.length) {
			return NextResponse.json(
				{
					error: 'Nenhuma transação encontrada',
				},
				{ status: 400 },
			)
		}

		const eventName = transactions[0].event.name

		const incomeTransactions = transactions
			.filter((transaction) => transaction.type === 'INCOME')
			.map((transaction) => ({
				Descrição: transaction.description,
				Tipo: transactionType[transaction.type],
				Transação: amountType[transaction.amountType],
				Valor: currencyValue(Number(transaction.amount)),
				Data: format(transaction.date, 'dd/MM/yyyy'),
			}))

		const outcomeTransactions = transactions
			.filter((transaction) => transaction.type === 'OUTCOME')
			.map((transaction) => ({
				Descrição: transaction.description,
				Tipo: transactionType[transaction.type],
				Transação: amountType[transaction.amountType],
				Valor: currencyValue(Number(transaction.amount)),
				Data: format(transaction.date, 'dd/MM/yyyy'),
			}))

		const incomeAndOutcomeTransactionsHeader = Object.keys(
			incomeTransactions[0],
		)
		const worksheetIncomeTransactions = utils.json_to_sheet(
			incomeTransactions,
			{
				header: incomeAndOutcomeTransactionsHeader,
			},
		)
		const worksheetOutcomeTransactions = utils.json_to_sheet(
			outcomeTransactions,
			{
				header: incomeAndOutcomeTransactionsHeader,
			},
		)
		const workbook = utils.book_new()
		worksheetIncomeTransactions['!cols'] =
			generateColumnWidths(incomeTransactions)
		worksheetOutcomeTransactions['!cols'] =
			generateColumnWidths(outcomeTransactions)
		utils.book_append_sheet(workbook, worksheetIncomeTransactions, 'Entradas')
		utils.book_append_sheet(workbook, worksheetOutcomeTransactions, 'Saídas')

		const totalOfAccountAndCash = transactions.reduce(
			(total, transaction) => {
				const isAccountIncome =
					transaction.type === 'INCOME' && transaction.amountType === 'ACCOUNT'
				const isAccountOutcome =
					transaction.type === 'OUTCOME' && transaction.amountType === 'ACCOUNT'
				const isCashIncome =
					transaction.type === 'INCOME' && transaction.amountType === 'CASH'
				const isCashOutcome =
					transaction.type === 'OUTCOME' && transaction.amountType === 'CASH'
				if (isAccountIncome) {
					return {
						...total,
						totalAccountIncome:
							total.totalAccountIncome + Number(transaction.amount),
					}
				}
				if (isAccountOutcome) {
					return {
						...total,
						totalAccountOutcome:
							total.totalAccountOutcome + Number(transaction.amount),
					}
				}
				if (isCashIncome) {
					return {
						...total,
						totalCashIncome: total.totalCashIncome + Number(transaction.amount),
					}
				}
				if (isCashOutcome) {
					return {
						...total,
						totalCashOutcome:
							total.totalCashOutcome + Number(transaction.amount),
					}
				}
				return total
			},
			{
				totalAccountIncome: 0,
				totalAccountOutcome: 0,
				totalCashIncome: 0,
				totalCashOutcome: 0,
			},
		)

		const geralBalance =
			totalOfAccountAndCash.totalAccountIncome +
			totalOfAccountAndCash.totalCashIncome -
			(totalOfAccountAndCash.totalAccountOutcome +
				totalOfAccountAndCash.totalCashOutcome)
		const data = [
			['', 'Entradas', 'Saídas', 'Saldo'],
			[
				'Conta',
				currencyValue(totalOfAccountAndCash.totalAccountIncome),
				currencyValue(totalOfAccountAndCash.totalAccountOutcome),
				currencyValue(
					totalOfAccountAndCash.totalAccountIncome -
						totalOfAccountAndCash.totalAccountOutcome,
				),
			],
			[
				'Dinheiro',
				currencyValue(totalOfAccountAndCash.totalCashIncome),
				currencyValue(totalOfAccountAndCash.totalCashOutcome),
				currencyValue(
					totalOfAccountAndCash.totalCashIncome -
						totalOfAccountAndCash.totalCashOutcome,
				),
			],
			['Saldo geral', '', '', currencyValue(geralBalance)],
		]
		const worksheetTransactionsBalance = utils.aoa_to_sheet(data)
		worksheetTransactionsBalance['!cols'] = generateColumnWidths(data)

		utils.book_append_sheet(workbook, worksheetTransactionsBalance, 'Geral')
		const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				'Content-Type':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': `attachment; filename="transações-${eventName}.xlsx"`,
			},
		})
	} catch (error) {
		console.error('@getExportTransactions error:', error)
		throw Error
	}
}
