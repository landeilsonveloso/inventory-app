import axios from "axios"
import config from "src/config/config"
import { useCallback, useEffect, useState } from "react"
import useModal from "./useModal"
import { useRouter } from "next/navigation"

export default function useProduct() {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState(0)
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState("")

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const readProductsUrl = `${apiUrlBase}/products`
    const createProductUrl = `${apiUrlBase}/products`
    const updateProductUrl = `${apiUrlBase}/products/${id}`
    const deleteProductUrl = `${apiUrlBase}/products/${id}`

    const columns = [
        {key: 'name', label: 'Nome'},
        {key: "description", label: "Descrição"},
        {key: "cost", label: "Custo"},
        {key: "price", label: "Preço"},
        {key: "quantity", label: "Quantidade"}
    ]
    
    const {isOpen, openingModal, closingModal, tag, setTag} = useModal()

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
    }, [readProductsUrl, router])

    const createProduct = useCallback(async (e) => {
        e.preventDefault()
        
        await axios
                    .post(createProductUrl, {name, description, cost, price, quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 201) {
                            alert(res.data)
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
    }, [createProductUrl, name, description, cost, price, quantity, readProducts, router])

    const updateProduct = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .put(updateProductUrl, {name, description, cost, price, quantity}, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
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
    }, [updateProductUrl, name, description, cost, price, quantity, readProducts, router])

    const deleteProduct = useCallback(async (e) => {
        e.preventDefault()

        await axios
                    .delete(deleteProductUrl, {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }})
                    .then((res) => {
                        if (res.status === 200) {
                            alert(res.data)
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
                    
    }, [deleteProductUrl, readProducts, router])

    useEffect(() => {
        readProducts()
    }, [readProducts])

    useEffect(() => {
        const term = search.trim().toLowerCase()

        if (!term) {
            setFiltered(products)
            return
        }

        const results = products.filter((cat) =>
            cat.name.toLowerCase().includes(term)
        )

        setFiltered(results)
    }, [search, products])

    const handleAdd = useCallback(() => {
        setTag("Create")
        openingModal()
    }, [openingModal])

    const handleEdit = useCallback((item) => {
        setTag("Edit")
        console.log(item)
        openingModal()
        setId(item.id)
        setName(item.name)
        setDescription(item.description)
        setCost(item.cost)
        setPrice(item.price)
        setQuantity(item.quantity)
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
        setName,
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
        columns,
        isOpen,
        tag,
        createProduct,
        updateProduct,
        deleteProduct,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    }
}
