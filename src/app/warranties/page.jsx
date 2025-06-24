"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import { MdAdd, MdClose, MdMonetizationOn, MdNotes, MdPerson, MdTimer } from "react-icons/md"
import Modal from "src/components/Modal"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useWarranty from "src/hooks/useWarranty"

export default function WarrantiesPage() {
    const {
        consumer,
        setConsumer,
        description,
        setDescription,
        value,
        setValue,
        date,
        setDate,
        time,
        setTime,
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
    } = useWarranty()

    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Garantias</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Garantia
                    </Button>
                </Div>

                <Input
                    className="w-full p-3 mb-16 rounded-md bg-white text-black focus:outline-none"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Busque por um consumidor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                
                <Table
                    name="warranties"
                    columns={columns}
                    data={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {isOpen && tag === "Create" ? (
                    <Modal>
                        <Form onSubimit={createWarranty}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Nova Garantia</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdPerson className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="consumer"
                                    name="consumer"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Consumidor"
                                    onChange={(e) => setConsumer(e.target.value)}
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
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">                                
                                <MdTimer className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent" onChange={(e) => setTime(e.target.value)}>
                                    <Option value="">
                                        
                                    </Option>

                                    <Option value="1 mês">
                                        1 mês
                                    </Option>

                                    <Option value="2 meses">
                                        2 meses
                                    </Option>

                                    <Option value="3 meses">
                                        3 meses
                                    </Option>

                                    <Option value="4 meses">
                                        4 meses
                                    </Option>

                                    <Option value="5 meses">
                                        5 meses
                                    </Option>

                                    <Option value="6 meses">
                                        6 meses
                                    </Option>

                                    <Option value="7 meses">
                                        7 meses
                                    </Option>

                                    <Option value="8 meses">
                                        8 meses
                                    </Option>

                                    <Option value="9 meses">
                                        9 meses
                                    </Option>

                                    <Option value="10 meses">
                                        10 meses
                                    </Option>

                                    <Option value="11 meses">
                                        11 meses
                                    </Option>

                                    <Option value="12 meses">
                                        12 meses
                                    </Option>
                                </Select>                  
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-800 transition" disabled={disabledWarrantiesButton}>
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
                        <Form onSubimit={updateWarranty}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Editar Garantia</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdPerson className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="consumer"
                                    name="consumer"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Consumidor"
                                    value={consumer}
                                    onChange={(e) => setConsumer(e.target.value)}
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">                                
                                <MdTimer className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent" value={time} onChange={(e) => setTime(e.target.value)}>
                                    <Option value="">
                                        
                                    </Option>

                                    <Option value="1 mês">
                                        1 mês
                                    </Option>

                                    <Option value="2 meses">
                                        2 meses
                                    </Option>

                                    <Option value="3 meses">
                                        3 meses
                                    </Option>

                                    <Option value="4 meses">
                                        4 meses
                                    </Option>

                                    <Option value="5 meses">
                                        5 meses
                                    </Option>

                                    <Option value="6 meses">
                                        6 meses
                                    </Option>

                                    <Option value="7 meses">
                                        7 meses
                                    </Option>

                                    <Option value="8 meses">
                                        8 meses
                                    </Option>

                                    <Option value="9 meses">
                                        9 meses
                                    </Option>

                                    <Option value="10 meses">
                                        10 meses
                                    </Option>

                                    <Option value="11 meses">
                                        11 meses
                                    </Option>

                                    <Option value="12 meses">
                                        12 meses
                                    </Option>
                                </Select>                  
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-800 transition" disabled={disabledWarrantiesButton}>
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
                        <Form className="flex flex-col" onSubimit={deleteWarranty}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir essa garantia?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" disabled={disabledWarrantiesButton}>
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
