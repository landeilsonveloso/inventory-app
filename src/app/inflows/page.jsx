"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Loading from "src/components/Loading"
import { MdAdd, MdCategory, MdClose, MdMonetizationOn, MdNotes } from "react-icons/md"
import Modal from "src/components/Modal"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useInflow from "src/hooks/useInflow"
import useUtilities from "src/hooks/useUtilities"

export default function InflowsPage() {
    const {
        description,
        setDescription,
        date,
        setDate,
        method,
        setMethod,
        value,
        setValue,
        filtered,
        filterType,
        setFilterType,
        selectedDate,
        setSelectedDate,
        disabledInflowsButton,
        loading,
        isOpen,
        tag,
        columns,
        createInflow,
        updateInflow,
        deleteInflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel
    } = useInflow()

    const {
        formatToBRL
    } = useUtilities()

    if (loading) {
        return <Loading/>
    }
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Entrada: {formatToBRL(filtered.reduce((sum, item) => sum + parseFloat(item.value), 0))}</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Entrada
                    </Button>
                </Div>

                <Div className="w-full flex items-center justify-center gap-4 mb-8">
                    <Title>Filtrar</Title>
                    
                    <Select className="w-1/5 bg-black border rounded px-4 py-[10px] mb-4" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <Option value="">
                            
                        </Option>

                        <Option value="day">
                            Dia
                        </Option>

                        <Option value="week">
                            Semana
                        </Option>

                        <Option value="month">
                            Mês
                        </Option>
                    </Select>

                    <Input
                        className="border rounded px-4 py-2 mb-4 custom-date-icon"
                        id="date"
                        name="date"
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                        onChange={(e) => {e.target.value ? setSelectedDate(new Date(e.target.value)) : setSelectedDate(null)}}
                    />
                </Div>
                
                <Table
                    name="inflows"
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
                                    className="w-full placeholder-gray-500 px-2 outline-none"
                                    id="description"
                                    name="description"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Descrição"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <Input
                                    className="w-full px-2 outline-none"
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>                 

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full px-2 outline-none" onChange={(e) => setMethod(e.target.value)}>
                                    <Option value="">
                                        
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

                             <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-800 transition" disabled={disabledInflowsButton}>
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
                                    className="w-full placeholder-gray-500 px-2 outline-none"
                                    id="description"
                                    name="description"
                                    type="text"
                                    minLength={3}
                                    maxLength={60}
                                    placeholder="Descrição"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <Input
                                    className="w-full px-2 outline-none"
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>  

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">                                
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full px-2 outline-none" value={method} onChange={(e) => setMethod(e.target.value)}>
                                    <Option value="">
                                        
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

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full placeholder-gray-500 px-2 outline-none"
                                    id="value"
                                    name="value"
                                    type="number"
                                    placeholder="Valor"
                                    step={0.01}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-800 transition" disabled={disabledInflowsButton}>
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
                                <Button className="bg-gray-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-800 transition" disabled={disabledInflowsButton}>
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
