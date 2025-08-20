"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Label from "src/containers/Label"
import Loading from "src/components/Loading"
import { MdAdd, MdClose, MdMonetizationOn, MdMoneyOff, MdNotes, MdNumbers } from "react-icons/md"
import Modal from "src/components/Modal"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useProduct from "src/hooks/useProduct"
import Spinner from "src/components/Spinner"

export default function ProductsPage() {
    const {
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
    } = useProduct()

    if (loading) {
        return <Loading/>
    }
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Produtos</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Novo Produto
                    </Button>
                </Div>

                <Input
                    className="w-full p-3 mb-16 rounded-md bg-white text-black focus:outline-none"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Busque por um produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <Table
                    name="products"
                    columns={columns}
                    data={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubmit={createProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Novo Produto</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="description">Descrição</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNotes className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Descrição"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="cost">Custo</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMoneyOff className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="cost"
                                        name="cost"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="price">Preço</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMonetizationOn className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="price"
                                        name="price"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="quantity">Quantidade</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNumbers className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="0"
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </Div>
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-green-600 text-white py-2 rounded transition ${disabledProductsButton ? "cursor-default opacity-70" : "hover:bg-green-800 cursor-pointer"}`} disabled={disabledProductsButton}>
                                    {disabledProductsButton ? <Spinner/> : <>Adicionar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>

                ) : 
                    null
                }

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubmit={updateProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Editar Produto</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="description">Descrição</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNotes className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Descrição"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="cost">Custo</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMoneyOff className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="cost"
                                        name="cost"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="price">Preço</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMonetizationOn className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="price"
                                        name="price"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="quantity">Quantidade</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdNumbers className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="0"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </Div>
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-blue-600 text-white py-2 rounded transition ${disabledProductsButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledProductsButton}>
                                    {disabledProductsButton ? <Spinner/> : <>Salvar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Delete" ? (
                    <Modal>
                        <Form className="flex flex-col" onSubmit={deleteProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir esse produto?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="w-24 bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-20 bg-red-600 text-white py-2 rounded transition ${disabledProductsButton ? "cursor-default opacity-70" : "hover:bg-red-800 cursor-pointer"}`} disabled={disabledProductsButton}>
                                    {disabledProductsButton ? <Spinner/> : <>Excluir</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }
            </Div>
        </AuthProvider>
    )
}
