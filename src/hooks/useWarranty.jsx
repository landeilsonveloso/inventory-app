import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function useWarranty() {
    const [id, setId] = useState(0)
    const [client, setClient] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState(0)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState("")
    const [warranties, setWarranties] = useState([])
    const [filtered, setFiltered]  = useState([])
    const [search, setSearch] = useState("")
    const [disabledWarrantiesButton, setDisabledWarrantiesButton] = useState(false)
    const [loading, setLoading] = useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readWarrantiesUrl = `${apiUrlBase}/warranties`
    const createWarrantyUrl = `${apiUrlBase}/warranties`
    const updateWarrantyUrl = `${apiUrlBase}/warranties/${id}`
    const deleteWarrantyUrl = `${apiUrlBase}/warranties/${id}`

    const columns = [
        {key: "client", label: "Cliente"},
        {key: "description", label: "Descrição"},
        {key: "value", label: "Valor"},
        {key: "date", label: "Data"},
        {key: "time", label: "Tempo"}
    ]

    const readWarranties = useCallback(async () => {
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.get(readWarrantiesUrl, {headers})

            if (res.status === 200) {
                setWarranties(res.data)
            }
                        
            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }

            else {
                toast.error("Erro inespirado.")
            }
        }
    }, [readWarrantiesUrl, router])

    const createWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)
        
        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.post(createWarrantyUrl, {client, description, value, date, time}, {headers})

            if (res.status === 201) {
                toast.success(res.data)
                closingModal()
                readWarranties()
            }

            else if (res.status === 400) {
                toast.error(res.data)
            }
                        
            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data)
            }

            else if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }

            else {
                toast.error("Erro inesperado.")
            }
        }

        finally {
            setDisabledWarrantiesButton(false)
        }
    }, [createWarrantyUrl, client, description, value, date, time, closingModal, readWarranties, router])

    const updateWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.put(updateWarrantyUrl, {client, description, value, date, time}, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                readWarranties()
            }

            else if (res.status === 400) {
                toast.error(res.data)
            }
                        
            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 400) {
                toast.error(err.response.data)
            }

            else if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }

            else {
                toast.error("Erro inesperado.")
            }
        }

        finally {
            setDisabledWarrantiesButton(false)
        }
    }, [updateWarrantyUrl, client, description, value, date, time, closingModal, readWarranties, router])

    const deleteWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)

        try {
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

            const res = await axios.delete(deleteWarrantyUrl, {headers})

            if (res.status === 200) {
                toast.success(res.data)
                closingModal()
                readWarranties()
            }

            else if (res.status === 401) {
                localStorage.clear()
                router.replace("/")
            }
        }
        
        catch (err) {
            if (err.response?.status === 401) {
                localStorage.clear()
                router.replace("/")
            }

            else if (err.response?.status >= 500) {
                toast.error("Erro no servidor, recarregue a página!")
            }

            else {
                toast.error("Erro inesperado.")
            }
        }

        finally {
            setDisabledWarrantiesButton(false)
        }  
    }, [deleteWarrantyUrl, closingModal, readWarranties, router])

    useEffect(() => {
        const fetch = async () => {
            await readWarranties()
            setLoading(false)
        }

        fetch()
    }, [readWarranties])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            const sorted = [...warranties].sort((a, b) =>
                a.client.localeCompare(b.client, undefined, {numeric: true, sensitivity: "base"})
            )

            setFiltered(sorted)
            return
        }

        const results = warranties.filter((item) =>
            item.client.toLowerCase().includes(term)
        )

        const sorted = results.sort((a, b) =>
            a.client.localeCompare(b.client, undefined, {numeric: true, sensitivity: "base"})
        )

        setFiltered(sorted)
    }, [search, warranties])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setClient(item.client)
        setDescription(item.description)
        setValue(item.value)
        setDate(item.date)
        setTime(item.time)
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
        client,
        setClient,
        description,
        setDescription,
        value,
        setValue,
        date,
        setDate,
        time,
        setTime,
        warranties,
        filtered,
        search,
        setSearch,
        disabledWarrantiesButton,
        loading,
        isOpen,
        tag,
        columns,
        createWarranty,
        updateWarranty,
        deleteWarranty,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
