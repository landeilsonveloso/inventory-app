import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

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
        await axios
                    .get(readWarrantiesUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setWarranties(res.data)
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
    }, [readWarrantiesUrl, router])

    const createWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)
        
        await axios
                    .post(createWarrantyUrl, {client, description, value, date, time}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledWarrantiesButton(false)
                            closingModal()
                            readWarranties()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledWarrantiesButton(false)
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
                            setDisabledWarrantiesButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledWarrantiesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createWarrantyUrl, client, description, value, date, time, closingModal, readWarranties, router])

    const updateWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)

        await axios
                    .put(updateWarrantyUrl, {client, description, value, date, time}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledWarrantiesButton(false)
                            closingModal()
                            readWarranties()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledWarrantiesButton(false)
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
                            setDisabledWarrantiesButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledWarrantiesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateWarrantyUrl, client, description, value, date, time, closingModal, readWarranties, router])

    const deleteWarranty = useCallback(async (e) => {
        e.preventDefault()

        setDisabledWarrantiesButton(true)

        await axios
                    .delete(deleteWarrantyUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledWarrantiesButton(false)
                            closingModal()
                            readWarranties()
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
                            setDisabledWarrantiesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteWarrantyUrl, closingModal, readWarranties, router])

    useEffect(() => {
        readWarranties()
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
