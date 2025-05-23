import config from "src/config/config"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import useModal from "./useModal"

export default function useCategory() {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const createCategoryUrl = `${apiUrlBase}/categories`
    const readCategoriesUrl = `${apiUrlBase}/categories`
    const updateCategoryUrl = `${apiUrlBase}/categories/${id}`
    const deleteCategoryUrl = `${apiUrlBase}/categories/${id}`

    const columns = [
        { key: 'name', label: 'Nome'}
    ]

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const readCategories = useCallback(async () => {
        await axios
                    .get(readCategoriesUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setCategories(res.data)
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
    }, [readCategoriesUrl, router])

    const createCategory = useCallback(async (e) => {
        e.preventDefault()
        
        await axios
                    .post(createCategoryUrl, {name}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            alert(res.data)
                            closingModal()
                            readCategories()
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
    }, [createCategoryUrl, router, name])

    const updateCategory = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .put(updateCategoryUrl, {name}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            closingModal()
                            readCategories()
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
    }, [updateCategoryUrl, name, router])

    const deleteCategory = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .delete(deleteCategoryUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            closingModal()
                            readCategories()
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
                    
    }, [deleteCategoryUrl, readCategories, router])

    useEffect(() => {
        readCategories()
    }, [readCategories])

    useEffect(() => {
        const term = search.toLowerCase()

        const results = categories.filter((cat) =>
            cat.name.toLowerCase().includes(term)
        )

        setFiltered(results)
    }, [search, categories])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setName(item.name)
    }, [openingModal])

    const handleDelete = useCallback((item) => {
        setTag("Delete")
        openingModal()
        setId(item.id)
    }, [])

    const handleCancel = useCallback(() => {
        closingModal()
    }, [closingModal])


    return {
        name,
        search,
        categories,
        filtered,
        columns,
        isOpen,
        tag,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel,
        setName,
        setSearch,
        createCategory,
        readCategories,
        updateCategory,
        deleteCategory
    }
}
