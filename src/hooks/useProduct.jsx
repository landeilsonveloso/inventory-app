import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useProduct() {
    const [id, setId] = useState(0)
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState(0)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")
    const [disabledProductsButton, setDisabledProductsButton] = useState(false)
    const [loading, setLoading] =useState(true)

    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readProductsUrl = `${apiUrlBase}/products`
    const createProductUrl = `${apiUrlBase}/products`
    const updateProductUrl = `${apiUrlBase}/products/${id}`
    const deleteProductUrl = `${apiUrlBase}/products/${id}`

    const columns = [
        {key: "description", label: "Descrição"},
        {key: "cost", label: "Custo"},
        {key: "price", label: "Preço"},
        {key: "quantity", label: "Quantidade"}
    ]
    
    const readProducts = useCallback(async () => {
        await axios
                    .get(readProductsUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setProducts(res.data)
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
    }, [readProductsUrl, router])

    const createProduct = useCallback(async (e) => {
        e.preventDefault()

        setDisabledProductsButton(true)
        
        await axios
                    .post(createProductUrl, {description, cost, price, quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            setDisabledProductsButton(false)
                            closingModal()
                            readProducts()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledProductsButton(false)
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
                            setDisabledProductsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                       }

                        else if (err.response.status >= 500) {
                            setDisabledProductsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [createProductUrl, description, cost, price, quantity, closingModal, readProducts, router])

    const updateProduct = useCallback(async (e) => {
        e.preventDefault()

        setDisabledProductsButton(true)

        await axios
                    .put(updateProductUrl, {description, cost, price, quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledProductsButton(false)
                            closingModal()
                            readProducts()
                            return
                        }

                        else if (res.status === 400) {
                            setDisabledProductsButton(false)
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
                            setDisabledProductsButton(false)
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status === 401) {
                            localStorage.clear()
                            router.replace("/")
                            return
                        }

                        else if (err.response.status >= 500) {
                            setDisabledProductsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [updateProductUrl, description, cost, price, quantity, closingModal, readProducts, router])

    const deleteProduct = useCallback(async (e) => {
        e.preventDefault()

        setDisabledProductsButton(true)

        await axios
                    .delete(deleteProductUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            setDisabledProductsButton(false)
                            closingModal()
                            readProducts()
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
                            setDisabledProductsButton(false)
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
                    
    }, [deleteProductUrl, closingModal, readProducts, router])

    useEffect(() => {
        const fetch = async () => {
            await readProducts()
            setLoading(false)
        }

        fetch()
    }, [readProducts])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            const sorted = [...products].sort((a, b) =>
                a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
            )

            setFiltered(sorted)
            return
        }

        const results = products.filter((item) =>
            item.description.toLowerCase().includes(term)
        )

        const sorted = results.sort((a, b) =>
            a.description.localeCompare(b.description, undefined, {numeric: true, sensitivity: "base"})
        )

        setFiltered(sorted)
    }, [search, products])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        openingModal()
        setId(item.id)
        setDescription(item.description)
        setCost(item.cost)
        setPrice(item.price)
        setQuantity(item.quantity)
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
        cost,
        setCost,
        price,
        setPrice,
        quantity,
        setQuantity,
        filtered,
        search,
        setSearch,
        disabledProductsButton,
        loading,
        isOpen,
        tag,
        columns,
        createProduct,
        updateProduct,
        deleteProduct,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
