"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import { MdAdd, MdCategory, MdClose, MdMonetizationOn, MdNotes, MdNumbers } from "react-icons/md"
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
        unitValue,
        setUnitValue,
        quantity,
        setQuantity,
        method,
        setMethod,
        productId,
        selectedDate,
        setSelectedDate,
        filterType,
        setFilterType,
        filtered,
        columns,
        isOpen,
        tag,
        createInflow,
        updateInflow,
        deleteInflow,
        handleAdd,
        handleEdit,
        handleDelete,
        handleCancel,
        disabledInflowsButton
    } = useInflow()

    const {
        formatToBRL
    } = useUtilities()
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Entrada: {formatToBRL(filtered.reduce((sum, item) => sum + parseFloat(item.unitValue), 0))}</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Entrada
                    </Button>
                </Div>

                <Div className="w-full flex items-center justify-center gap-4 mb-8">
                    <Title>Filtrar</Title>
                    
                    <Select className="w-1/5 bg-black border rounded px-4 py-2 mb-4" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
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
                        className="border rounded px-4 py-2 mb-4"
                        id="date"
                        name="date"
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
                        onChange={(e) => {
                            const newValue = e.target.value
                            
                            if (newValue) {
                                setSelectedDate(new Date(newValue))
                            } else {
                                setSelectedDate(new Date())
                            }
                        }}
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
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
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
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="date"
                                    name="date"
                                    type="date"
                                    placeholder="Data"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Div>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="unitValue"
                                    name="unitValue"
                                    type="number"
                                    placeholder="Valor Unitário"
                                    step={0.01}
                                    onChange={(e) => setUnitValue(e.target.value)}
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

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>
                                
                                <Select className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent" onChange={(e) => setMethod(e.target.value)}>
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
                                    value={unitValue * quantity}
                                    readOnly={true}
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

                            {productId ? (
                                <Div className="flex items-center w-full mb-6 p-3 bg-gray-100 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                    <MdNotes className="text-gray-600 text-xl mr-2"/>

                                    <Input
                                        className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                        id="description"
                                        name="description"
                                        type="text"
                                        minLength={3}
                                        maxLength={60}
                                        placeholder="Descrição"
                                        value={description}
                                        readOnly={true}
                                    />
                                </Div>
                            ) : (
                                <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                    <MdNotes className="text-gray-600 text-xl mr-2"/>

                                    <Input
                                        className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
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
                            )}


                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">                                
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
                                <MdMonetizationOn className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="unitValue"
                                    name="unitValue"
                                    type="number"
                                    placeholder="Valor Unitário"
                                    step={0.01}
                                    value={unitValue}
                                    onChange={(e) => setUnitValue(e.target.value)}
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
                                    value={unitValue * quantity}
                                    readOnly={true}
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
