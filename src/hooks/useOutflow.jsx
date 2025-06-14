import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useOutflow() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [unitValue, setUnitValue] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [method, setMethod] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [filterType, setFilterType] = useState("")
    const [filtered, setFiltered]  = useState([])
    const [outflows, setOutflows] = useState([])
    const [disabledOutflowsButton, setDisabledOutflowsButton] = useState(false)

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readOutflowsUrl = `${apiUrlBase}/outflows`
    const createOutflowUrl = `${apiUrlBase}/outflows`
    const updateOutflowUrl = `${apiUrlBase}/outflows/${id}`
    const deleteOutflowUrl = `${apiUrlBase}/outflows/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "date", label: "Data"},
        {key: "unitValue", label: "Valor Unitário"},
        {key: "quantity", label: "Quantidade"},
        {key: "method", label: "Forma de Pagamento"},
        {key: "totalValue", label: "Valor Total"},
    ]
    
    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const readOutflows = useCallback(async () => {
        await axios
                    .get(readOutflowsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setOutflows(res.data)
                            setFiltered(res.data)
                            return
                        }
                        
                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [readOutflowsUrl, router])

    const createOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)

        await axios
                    .post(createOutflowUrl, {description, date, unitValue, quantity, method, totalValue: unitValue * quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledOutflowsButton(false)
                            alert(res.data)
                            closingModal()
                            readOutflows()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledOutflowsButton(false)
                            alert(res.data)
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            setDisabledOutflowsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledOutflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createOutflowUrl, description, date, unitValue, quantity, method, closingModal, readOutflows, router])

    const updateOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)

        await axios
                    .put(updateOutflowUrl, {description, date, unitValue, quantity, method, totalValue: unitValue * quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledOutflowsButton(false)
                            alert(res.data)
                            closingModal()
                            readOutflows()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledOutflowsButton(false)
                            alert(res.data)
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            setDisabledOutflowsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledOutflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateOutflowUrl, description, date, unitValue, quantity, method, closingModal, readOutflows, router])

    const deleteOutflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledOutflowsButton(true)

        await axios
                    .delete(deleteOutflowUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledOutflowsButton(false)
                            alert(res.data)
                            closingModal()
                            readOutflows()
                            return
                        }

                        else if (res.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledOutflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteOutflowUrl, closingModal, readOutflows, router])

    useEffect(() => {
        readOutflows()
    }, [readOutflows])

    const filterByDay = useCallback(() =>  {
        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
                return (
                    outflowDate.getDate() === selectedDate.getDate() &&
                    outflowDate.getMonth() === selectedDate.getMonth() &&
                    outflowDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [outflows, selectedDate])

    const filterByWeek = useCallback(() =>  {
        const startOfWeek = new Date(selectedDate)

        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)

        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
            return outflowDate >= startOfWeek && outflowDate <= endOfWeek
        })
    }, [selectedDate, outflows])

    const filterByMonth = useCallback(() =>  {
        return outflows.filter(outflow => {
            const outflowDate = new Date(outflow.date)
                return (
                    outflowDate.getMonth() === selectedDate.getMonth() &&
                    outflowDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [selectedDate, outflows])

    const filterOutflows = useCallback(() => {
        switch (filterType) {
            case "day":
                return filterByDay()

            case "week":
                return filterByWeek()

            case 'month':
                return filterByMonth()

            default:
                return outflows
        }
    }, [filterType, outflows, filterByDay, filterByWeek, filterByMonth])

    useEffect(() => {
        setFiltered(filterOutflows())
    }, [filterOutflows])

    const handleAdd = useCallback(() => {
        setTag("Create")
        setUnitValue(0)
        setQuantity(0)
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setDescription(item.description)
        setDate(item.date)
        setUnitValue(item.unitValue)
        setQuantity(item.quantity)
        setMethod(item.method)
    }, [openingModal])

    const handleDelete = useCallback((item) => {
        setTag("Delete")
        openingModal()
        setId(item.id)
    }, [openingModal])

    const handleCancel = useCallback(() => {
        closingModal()
    }, [closingModal])

    return {
        description,
        setDescription,
        date,
        setDate,
        unitValue,
        setUnitValue,
        quantity,
        setQuantity,
        method,
        setMethod,
        selectedDate,
        setSelectedDate,
        filterType,
        setFilterType,
        filtered,
        outflows,
        columns,
        isOpen,
        tag,
        createOutflow,
        updateOutflow,
        deleteOutflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel,
        disabledOutflowsButton
    }
}
