"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Label from "src/containers/Label"
import Loading from "src/components/Loading"
import { MdAdd, MdClose, MdMonetizationOn, MdNotes, MdPerson, MdTimer } from "react-icons/md"
import Modal from "src/components/Modal"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Spinner from "src/components/Spinner"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useWarranty from "src/hooks/useWarranty"

export default function WarrantiesPage() {
    const {
        client,
        setClient,
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
        loading,
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

    if (loading) {
        return <Loading/>
    }

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
                    placeholder="Busque por um cliente..."
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
                        <Form onSubmit={createWarranty}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Nova Garantia</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="client">Cliente</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdPerson className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="client"
                                        name="client"
                                        type="text"
                                        placeholder="Cliente"
                                        onChange={(e) => setClient(e.target.value)}
                                    />
                                </Div>

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

                                <Label className="font-medium" htmlFor="value">Valor</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMonetizationOn className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="value"
                                        name="value"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="date">Data</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="date"
                                        name="date"
                                        type="date"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium">Tempo</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdTimer className="text-gray-600 mr-2"/>
                                
                                    <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" onChange={(e) => setTime(e.target.value)} required>
                                        <Option value=""></Option>
                                        <Option value="1 mês">1 mês</Option>
                                        <Option value="2 meses">2 meses</Option>
                                        <Option value="3 meses">3 meses</Option>
                                        <Option value="4 meses">4 meses</Option>
                                        <Option value="5 meses">5 meses</Option>
                                        <Option value="6 meses">6 meses</Option>
                                        <Option value="7 meses">7 meses</Option>
                                        <Option value="8 meses">8 meses</Option>
                                        <Option value="9 meses">9 meses</Option>
                                        <Option value="10 meses">10 meses</Option>
                                        <Option value="11 meses">11 meses</Option>
                                        <Option value="12 meses">12 meses</Option>
                                    </Select>
                                </Div>
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-green-600 text-white py-2 rounded transition ${disabledWarrantiesButton ? "cursor-default opacity-70" : "hover:bg-green-800 cursor-pointer"}`} disabled={disabledWarrantiesButton}>
                                    {disabledWarrantiesButton ? <Spinner/> : <>Adicionar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Edit" ? (
                    <Modal>
                        <Form onSubmit={updateWarranty}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel} title="Fechar Modal"/>
                            </Div>
                            
                            <Title className="text-center mb-4 text-xl font-bold">Editar Garantia</Title>
                            
                            <Div className="space-y-4">
                                <Label className="font-medium" htmlFor="client">Cliente</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdPerson className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="client"
                                        name="client"
                                        type="text"
                                        placeholder="Cliente"
                                        value={client}
                                        onChange={(e) => setClient(e.target.value)}
                                    />
                                </Div>

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

                                <Label className="font-medium" htmlFor="value">Valor</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdMonetizationOn className="text-gray-600 mr-2"/>

                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="value"
                                        name="value"
                                        type="number"
                                        step={0.01}
                                        placeholder="0,00"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium" htmlFor="date">Data</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <Input
                                        className="w-full outline-none bg-transparent"
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Div>

                                <Label className="font-medium">Tempo</Label>

                                <Div className="flex items-center border rounded-lg p-2 mt-1">
                                    <MdTimer className="text-gray-600 mr-2"/>
                                
                                    <Select className="w-full p-0.5 cursor-pointer bg-transparent outline-none" value={time} onChange={(e) => setTime(e.target.value)} required>
                                        <Option value=""></Option>
                                        <Option value="1 mês">1 mês</Option>
                                        <Option value="2 meses">2 meses</Option>
                                        <Option value="3 meses">3 meses</Option>
                                        <Option value="4 meses">4 meses</Option>
                                        <Option value="5 meses">5 meses</Option>
                                        <Option value="6 meses">6 meses</Option>
                                        <Option value="7 meses">7 meses</Option>
                                        <Option value="8 meses">8 meses</Option>
                                        <Option value="9 meses">9 meses</Option>
                                        <Option value="10 meses">10 meses</Option>
                                        <Option value="11 meses">11 meses</Option>
                                        <Option value="12 meses">12 meses</Option>
                                    </Select>
                                </Div>
                            </Div>

                            <Div className="flex justify-end gap-4 mt-6">
                                <Button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer" type="button" onClick={handleCancel}>
                                    Cancelar
                                </Button>

                                <Button className={`flex justify-center w-28 bg-blue-600 text-white py-2 rounded transition ${disabledWarrantiesButton ? "cursor-default opacity-70" : "hover:bg-blue-800 cursor-pointer"}`} disabled={disabledWarrantiesButton}>
                                    {disabledWarrantiesButton ? <Spinner/> : <>Salvar</>}
                                </Button>
                            </Div>
                        </Form>
                    </Modal>
                ) : 
                    null
                }

                {isOpen && tag === "Delete" ? (
                    <Modal>
                        <Form className="flex flex-col" onSubmit={deleteWarranty}>
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
