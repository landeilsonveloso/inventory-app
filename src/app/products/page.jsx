"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import { MdAdd, MdCategory, MdClose, MdDescription, MdInventory, MdMonetizationOn, MdMoneyOff, MdNotes, MdNumbers } from "react-icons/md"
import Modal from "src/components/Modal"
import Table from "src/components/Table"
import Title from "src/components/Title"
import Option from "src/components/Option"
import useProduct from "src/hooks/useProduct"
import Select from "src/components/Select"

export default function ProductsPage() {
    const {
        name,
        setName,
        description,
        setDescription,
        date,
        setDate,
        cost,
        setCost,
        price,
        setPrice,
        quantity,
        setQuantity,
        method,
        setMethod,
        filtered,
        search,
        setSearch,
        columns,
        isOpen,
        tag,
        createProduct,
        sellProduct,
        updateProduct,
        deleteProduct,
        handleAdd,
        handleSell,
        handleEdit,
        handleDelete,
        handleCancel,
        disabledProductsButton
    } = useProduct()
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Produtos: {filtered.reduce((sum, item) => sum + parseFloat(item.quantity), 0)}</Title>

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
                    onSell={handleSell}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubimit={createProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Novo Produto</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdInventory className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="name"
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Nome"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={60}
                                    placeholder="Descrição"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMoneyOff className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    placeholder="Custo"
                                    step={0.01}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Preço"
                                    step={0.01}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNumbers className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantidade"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-800 transition" disabled={disabledProductsButton}>
                                    Adicionar
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Sell" ? (
                    <Modal>
                        <Form onSubimit={sellProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Nova Venda</Title>

                            <Div className="flex items-center w-full mb-6 p-3 bg-gray-100 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="name"
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Nome"
                                    value={name}
                                    readOnly={true}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder="Data"
                                    value={date.toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        const newValue = e.target.value
                                        
                                        if (newValue) {
                                            setDate(new Date(newValue))
                                        } else {
                                            setDate(new Date())
                                        }
                                    }}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Preço"
                                    step={0.01}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNumbers className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantidade"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Div> 

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                    
                                <Select className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent" value={method} onChange={(e) => setMethod(e.target.value)}>
                                    <Option value="">
                                        Forma de Pagamento
                                    </Option>

                                    <Option value="Cartão">
                                        Cartão
                                    </Option>

                                    <Option value="Espécie">
                                        Espécie
                                    </Option>

                                    <Option value="Pix">
                                        Pix
                                    </Option>
                                </Select>
                            </Div>
                        
                            <Div className="flex items-center w-full mb-6 p-3 bg-gray-100 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="totalValue"
                                    name="totalValue"
                                    type="number"
                                    placeholder="Valor Total"
                                    step={0.01}
                                    value={price * quantity}
                                    readOnly={true}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-800 transition" disabled={disabledProductsButton}>
                                    Vender
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : (
                    null
                )}

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubimit={updateProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Editar Produto</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdInventory className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="name"
                                    name="name"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdDescription className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={60}
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMoneyOff className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    placeholder="Custo"
                                    step={0.01}
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Preço"
                                    step={0.01}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNumbers className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="Quantidade"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-800 transition" disabled={disabledProductsButton}>
                                    Salvar
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Delete" ? (
                    <Modal>
                        <Form className="flex flex-col" onSubimit={deleteProduct}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir esse produto?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" disabled={disabledProductsButton}>
                                    Excluir
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
