"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import { MdAdd, MdAttachMoney, MdClose, MdDateRange, MdMonetizationOn, MdNotes } from "react-icons/md"
import Modal from "src/components/Modal"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useInflow from "src/hooks/useInflow"

export default function InflowssPage() {
    const {
        description,
        setDescription,
        date,
        setDate,
        value,
        setValue,
        method,
        setMethod,
        inflows,
        filtered,
        search,
        setSearch,
        columns,
        isOpen,
        tag,
        createInflow,
        updateInflow,
        deleteInflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    } = useInflow()
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Total de Entradas: {inflows.length}</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Entrada
                    </Button>
                </Div>

                <Input
                    className="w-full p-3 mb-16 rounded-md bg-white text-black focus:outline-none"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Busque por uma entrada..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <Table
                    columns={columns}
                    data={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubimit={createInflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Nova Entrada</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={30}
                                    placeholder="Descrição"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdDateRange className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder="Data"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdAttachMoney className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="method"
                                    name="method"
                                    type="text"
                                    placeholder="Forma de Pagamento"
                                    onChange={(e) => setMethod(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-400 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-700 transition">
                                    Adicionar
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubimit={updateInflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Editar Entrada</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdNotes className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="description"
                                    name="description"
                                    type="text"
                                    maxLength={30}
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdDateRange className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder="Data"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdAttachMoney className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="method"
                                    name="method"
                                    type="text"
                                    placeholder="Forma de Pagamento"
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-400 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600 transition">
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
                        <Form className="flex flex-col" onSubimit={deleteInflow}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir essa entrada?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-400 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-400 transition">
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
