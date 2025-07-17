import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useService() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [value, setValue] = useState(0)
    const [services, setServices] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [disabledServicesButton, setDisabledServicesButton] = useState(false)
    const [loading, setLoading] = useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readServicesUrl = `${apiUrlBase}/services`
    const createServiceUrl = `${apiUrlBase}/services`
    const updateServiceUrl = `${apiUrlBase}/services/${id}`
    const deleteServiceUrl = `${apiUrlBase}/services/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "value", label: "Valor"},
    ]
    
    const readServices = useCallback(async () => {
        await axios
                    .get(readServicesUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setServices(res.data)
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
    }, [readServicesUrl, router])

    const createService = useCallback(async (e) => {
        e.preventDefault()

        setDisabledServicesButton(true)
        
        await axios
                    .post(createServiceUrl, {description, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledServicesButton(false)
                            closingModal()
                            readServices()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledServicesButton(false)
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
                            setDisabledServicesButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledServicesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createServiceUrl, description, value, closingModal, readServices, router])

    const updateService = useCallback(async (e) => {
        e.preventDefault()

        setDisabledServicesButton(true)

        await axios
                    .put(updateServiceUrl, {description, value}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledServicesButton(false)
                            closingModal()
                            readServices()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledServicesButton(false)
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
                            setDisabledServicesButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledServicesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateServiceUrl, description, value, closingModal, readServices, router])

    const deleteService = useCallback(async (e) => {
        e.preventDefault()

        setDisabledServicesButton(true)

        await axios
                    .delete(deleteServiceUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledServicesButton(false)
                            closingModal()
                            readServices()
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
                            setDisabledServicesButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteServiceUrl, closingModal, readServices, router])

    useEffect(() => {
        const fetch = async () => {
            await readServices()
            setLoading(false)
        }

        fetch()
    }, [readServices])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            const sorted = [...services].sort((a, b) =>
                a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
            )

            setFiltered(sorted)
            return
        }

        const results = services.filter((item) =>
            item.description.toLowerCase().includes(term)
        )

        const sorted = results.sort((a, b) =>
            a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
        )

        setFiltered(sorted)
    }, [search, services])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setDescription(item.description)
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
        value,
        setValue,
        filtered,
        search,
        setSearch,
        disabledServicesButton,
        loading,
        isOpen,
        tag,
        columns,
        createService,
        updateService,
        deleteService,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
