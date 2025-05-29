import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useOutflow() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [value, setValue] = useState(0)
    const [method, setMethod] = useState("")
    const [outflows, setOutflows] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readOutflowsUrl = `${apiUrlBase}/outflows`
    const createOutflowUrl = `${apiUrlBase}/outflows`
    const updateOutflowUrl = `${apiUrlBase}/outflows/${id}`
    const deleteOutflowUrl = `${apiUrlBase}/outflows/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "date", label: "Data"},
        {key: "value", label: "Valor"},
        {key: "method", label: "Forma de Pagamento"}
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
    }, [readOutflowsUrl, router])

    const createOutflow = useCallback(async (e) => {
        e.preventDefault()
        
        await axios
                    .post(createOutflowUrl, {description, date, value, method}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
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
    }, [createOutflowUrl, description, date, value, method, closingModal, readOutflows, router])

    const updateOutflow = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .put(updateOutflowUrl, {description, date, value, method}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
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
    }, [updateOutflowUrl, description, date, value, method, closingModal, readOutflows, router])

    const deleteOutflow = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .delete(deleteOutflowUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
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
                    
    }, [deleteOutflowUrl, closingModal, readOutflows, router])

    useEffect(() => {
        readOutflows()
    }, [readOutflows])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            setFiltered(outflows)
            return
        }

        const results = outflows.filter((cat) =>
            cat.description.toLowerCase().includes(term)
        )

        setFiltered(results)
    }, [search, outflows])

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
        outflows,
        filtered,
        search,
        setSearch,
        columns,
        isOpen,
        tag,
        createOutflow,
        updateOutflow,
        deleteOutflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
