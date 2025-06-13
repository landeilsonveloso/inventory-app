import { useCallback, useEffect, useState } from "react"
import useInflow from "./useInflow"
import useOutflow from "./useOutflow"

export default function useDashboard() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [filterType, setFilterType] = useState("")
    const [filtered, setFiltered]  = useState([])
    const [transactions, setTransactions] = useState([])
    const [filteredValues, setFilteredValues] = useState({})

    const {inflows} = useInflow()
    const {outflows} = useOutflow()

    const columns = [
        {key: "date", label: "Data"},
        {key: "inflow", label: "Entrada"},
        {key: "outflow", label: "Saída"},
        {key: "lucre", label: "Lucro"}
    ]

    const groupByDate = useCallback((dataArray) => {
        const grouped = {}

        for (const item of dataArray) {
            const date = new Date(item.date).toISOString().split("T")[0]

            if (!grouped[date]) {
                grouped[date] = []
            }

            grouped[date].push(item)
        }

        return grouped
    }, [])

    const calculateProfitTable = useCallback(() => {
        const inflowsByDate = groupByDate(inflows)
        const outflowsByDate = groupByDate(outflows)

        const allDates = new Set([
            ...Object.keys(inflowsByDate),
            ...Object.keys(outflowsByDate),
        ])

        const result = []

        for (const date of allDates) {
            const totalInflow = inflowsByDate[date]?.reduce((sum, item) => sum + Number(item.totalValue), 0) || 0
            const totalOutflow = outflowsByDate[date]?.reduce((sum, item) => sum + Number(item.totalValue), 0) || 0

            result.push({
                date,
                inflow: totalInflow,
                outflow: totalOutflow,
                lucre: totalInflow - totalOutflow,
            })
        }

        setTransactions(result.sort((a, b) => new Date(b.date) - new Date(a.date)))
    }, [groupByDate, inflows, outflows])

    const filterByDay = useCallback(() =>  {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
                return (
                    transactionDate.getDate() === selectedDate.getDate() &&
                    transactionDate.getMonth() === selectedDate.getMonth() &&
                    transactionDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [transactions, selectedDate])

    const filterByWeek = useCallback(() =>  {
        const startOfWeek = new Date(selectedDate)

        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)

        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        return transactions.filter(inflow => {
            const transactionDate = new Date(inflow.date)
            return transactionDate >= startOfWeek && transactionDate <= endOfWeek
        })
    }, [selectedDate, transactions])

    const filterByMonth = useCallback(() =>  {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
                return (
                    transactionDate.getMonth() === selectedDate.getMonth() &&
                    transactionDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [selectedDate, transactions])

    const filterTransactions = useCallback(() => {
        switch (filterType) {
            case "day":
                return filterByDay()

            case "week":
                return filterByWeek()

            case 'month':
                return filterByMonth()

            default:
                return transactions
        }
    }, [filterType, transactions, filterByDay, filterByWeek, filterByMonth])

    const getTotals = useCallback(() => {
        const inflow = filtered.reduce((sum, item) => sum + item.inflow, 0)
        const outflow = filtered.reduce((sum, item) => sum + item.outflow, 0)
        const lucre = filtered.reduce((sum, item) => sum + item.lucre, 0)

        return {inflow, outflow, lucre}
    }, [filtered])

    useEffect(() => {
        setFiltered(filterTransactions())
    }, [filterTransactions])

    useEffect(() => {
        calculateProfitTable()
    }, [calculateProfitTable])

    useEffect(() => {
        setFilteredValues(getTotals())
    }, [getTotals])

    return {
        selectedDate,
        setSelectedDate,
        filterType,
        setFilterType,
        filtered,
        filteredValues,
        columns
    }
}
