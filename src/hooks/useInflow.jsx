import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useInflow() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [value, setValue] = useState(0)
    const [method, setMethod] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [filterType, setFilterType] = useState("")
    const [filtered, setFiltered]  = useState([])
    const [inflows, setInflows] = useState([])

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readInflowsUrl = `${apiUrlBase}/inflows`
    const createInflowUrl = `${apiUrlBase}/inflows`
    const updateInflowUrl = `${apiUrlBase}/inflows/${id}`
    const deleteInflowUrl = `${apiUrlBase}/inflows/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "date", label: "Data"},
        {key: "value", label: "Valor"},
        {key: "method", label: "Forma de Pagamento"}
    ]
    
    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const readInflows = useCallback(async () => {
        await axios
                    .get(readInflowsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setInflows(res.data)
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
    }, [readInflowsUrl, router])

    const createInflow = useCallback(async (e) => {
        e.preventDefault()
        
        await axios
                    .post(createInflowUrl, {description, date, value, method}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            alert(res.data)
                            closingModal()
                            readInflows()
                            return
                        }

                        else if (res.status === 400) {
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
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createInflowUrl, description, date, value, method, closingModal, readInflows, router])

    const updateInflow = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .put(updateInflowUrl, {description, date, value, method}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
                            closingModal()
                            readInflows()
                            return
                        }

                        else if (res.status === 400) {
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
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateInflowUrl, description, date, value, method, closingModal, readInflows, router])

    const deleteInflow = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .delete(deleteInflowUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
                            closingModal()
                            readInflows()
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
                    
    }, [deleteInflowUrl, closingModal, readInflows, router])

    useEffect(() => {
        readInflows()
    }, [readInflows])

    const formatToBRL = useCallback((value) => {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value)
    }, [])

    const filterByDay = useCallback(() =>  {
        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
                return (
                    inflowDate.getDate() === selectedDate.getDate() &&
                    inflowDate.getMonth() === selectedDate.getMonth() &&
                    inflowDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [inflows, selectedDate])

    const filterByWeek = useCallback(() =>  {
        const startOfWeek = new Date(selectedDate)

        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)

        endOfWeek.setDate(startOfWeek.getDate() + 6)
        endOfWeek.setHours(23, 59, 59, 999)

        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
            return inflowDate >= startOfWeek && inflowDate <= endOfWeek
        })
    }, [selectedDate, inflows])

    const filterByMonth = useCallback(() =>  {
        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
                return (
                    inflowDate.getMonth() === selectedDate.getMonth() &&
                    inflowDate.getFullYear() === selectedDate.getFullYear()
                )
            })
    }, [selectedDate, inflows])

    const filterInflows = useCallback(() => {
        switch (filterType) {
            case "day":
                return filterByDay()

            case "week":
                return filterByWeek()

            case 'month':
                return filterByMonth()

            default:
                return inflows
        }
    }, [filterType, inflows, filterByDay, filterByWeek, filterByMonth])

    useEffect(() => {
        setFiltered(filterInflows())
    }, [filterInflows])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setDescription(item.description)
        setDate(item.date)
        setValue(item.value)
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
        value,
        setValue,
        method,
        setMethod,
        selectedDate,
        setSelectedDate,
        filterType,
        setFilterType,
        filtered,
        inflows,
        columns,
        isOpen,
        tag,
        createInflow,
        updateInflow,
        deleteInflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel,
        formatToBRL
    }
}
