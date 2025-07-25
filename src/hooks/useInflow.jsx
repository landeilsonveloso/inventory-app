import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useInflow() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [method, setMethod] = useState("")
    const [value, setValue] = useState(0)
    const [inflows, setInflows] = useState([])
    const [filtered, setFiltered]  = useState([])
    const [filterType, setFilterType] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [disabledInflowsButton, setDisabledInflowsButton] = useState(false)
    const [loading, setLoading] = useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readInflowsUrl = `${apiUrlBase}/inflows`
    const createInflowUrl = `${apiUrlBase}/inflows`
    const updateInflowUrl = `${apiUrlBase}/inflows/${id}`
    const deleteInflowUrl = `${apiUrlBase}/inflows/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "date", label: "Data"},
        {key: "method", label: "Método"},
        {key: "value", label: "Valor"}
    ]
    
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

        setDisabledInflowsButton(true)
        
        await axios
                    .post(createInflowUrl, {description, date, method, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledInflowsButton(false)
                            closingModal()
                            readInflows()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledInflowsButton(false)
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
                            setDisabledInflowsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledInflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createInflowUrl, description, date, method, value, closingModal, readInflows, router])

    const updateInflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledInflowsButton(true)

        await axios
                    .put(updateInflowUrl, {description, date, method, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledInflowsButton(false)
                            closingModal()
                            readInflows()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledInflowsButton(false)
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
                            setDisabledInflowsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledInflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateInflowUrl, description, date, method, value, closingModal, readInflows, router])

    const deleteInflow = useCallback(async (e) => {
        e.preventDefault()

        setDisabledInflowsButton(true)

        await axios
                    .delete(deleteInflowUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledInflowsButton(false)
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
                            setDisabledInflowsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteInflowUrl, closingModal, readInflows, router])

    useEffect(() => {
        const fetch = async () => {
            await readInflows()
            setLoading(false)
        }

        fetch()
    }, [readInflows])

    const filterByDay = useCallback(() => {
        const selDate = new Date(selectedDate)
        const selDay = selDate.getUTCDate()
        const selMonth = selDate.getUTCMonth()
        const selYear = selDate.getUTCFullYear()

        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
            return (
                inflowDate.getUTCDate() === selDay &&
                inflowDate.getUTCMonth() === selMonth &&
                inflowDate.getUTCFullYear() === selYear
            )
        })
    }, [inflows, selectedDate])

    const filterByWeek = useCallback(() => {
        const date = new Date(selectedDate)
        const dayOfWeek = date.getUTCDay()

        const startOfWeek = new Date(date)
        startOfWeek.setUTCDate(date.getUTCDate() - dayOfWeek)
        startOfWeek.setUTCHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6)
        endOfWeek.setUTCHours(23, 59, 59, 999)

        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
            return inflowDate >= startOfWeek && inflowDate <= endOfWeek
        })
    }, [inflows, selectedDate])
    
    const filterByMonth = useCallback(() => {
        const selMonth = selectedDate.getUTCMonth()
        const selYear = selectedDate.getUTCFullYear()

        return inflows.filter(inflow => {
            const inflowDate = new Date(inflow.date)
            return (
                inflowDate.getUTCMonth() === selMonth &&
                inflowDate.getUTCFullYear() === selYear
            )
        })
    }, [inflows, selectedDate])

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
        setMethod(item.method)
        setValue(item.value)
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
        method,
        setMethod,
        value,
        setValue,
        inflows,
        filtered,
        selectedDate,
        filterType,
        setFilterType,
        selectedDate,
        setSelectedDate,
        disabledInflowsButton,
        loading,
        isOpen,
        tag,
        columns,
        createInflow,
        updateInflow,
        deleteInflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
