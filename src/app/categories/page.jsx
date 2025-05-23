"use client"

import AuthProvider from "src/contexts/AuthContext"
import Button from "src/components/Button"
import Input from "src/components/Input"
import { MdAdd, MdCategory, MdClose } from "react-icons/md"
import Modal from "src/components/Modal"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useCategory from "src/hooks/useCategory"
import Div from "src/containers/Div"
import Form from "src/components/Form"

export default function CategoriesPage() {
    const {name, filtered, columns, isOpen, tag, search, setSearch, handleAdd, handleEdit, handleDelete, handleCancel, setName, createCategory, updateCategory, deleteCategory} = useCategory()

    return (
        <AuthProvider>
            <Div className="p-6 text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Categorias</Title>

                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 cursor-pointer rounded-md transition" onClick={handleAdd}>
                        <MdAdd size={20}/>
                        Nova Categoria
                    </Button>
                </Div>

                <Input
                    className="w-full p-3 mb-16 rounded-md bg-white text-black focus:outline-none"
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Busque por uma categoria..."
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
                        <Form onSubimit={createCategory}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Nova Categoria</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nome"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-400 transition" onClick={handleCancel}>
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
                        <Form onSubimit={updateCategory}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Title>Editar Categoria</Title>

                            <Div className="flex items-center w-full mb-6 p-3 border border-gray-400 rounded-lg focus-within:ring-2 focus-within:ring-gray-400 transition-all">
                                <MdCategory className="text-gray-600 text-xl mr-2"/>

                                <Input
                                    className="w-full text-black placeholder-gray-500 px-2 outline-none bg-transparent"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Div>

                            <Div className="flex justify-end gap-3">
                                <Button className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-400 transition" onClick={handleCancel}>
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
                        <Form className="flex flex-col" onSubimit={deleteCategory}>
                            <Div className="w-full flex justify-end">
                                <MdClose className="cursor-pointer" size={30} onClick={handleCancel}/>
                            </Div>

                            <Div className="text-center text-xl mt-4 mb-8">
                                Deseja excluir essa categoria?
                            </Div>

                             <Div className="flex justify-end gap-3">
                                <Button className="bg-gray-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-400 transition" onClick={handleCancel}>
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
