'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {MdClose, MdDashboard, MdInventory, MdLogout, MdMenu} from 'react-icons/md'

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        isOpen ? (
            <nav className="mr-72">
                <aside className="w-72 h-screen fixed top-0 left-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-8 shadow-lg flex flex-col justify-between">
                    <div>
                        <div className='w-full flex justify-end'>
                            <MdClose className="cursor-pointer" size={30} onClick={() => setIsOpen(false)}/>
                        </div>

                        <div className="flex justify-center">
                            <Link className='flex flex-col items-center cursor-pointer w-20 mb-10' href="/profile">
                                <img className="rounded-full mb-2 border-2 border-pink-500" src="/logo.png" alt="Logo A. S. Cell"/>
                                <span>Meu Perfil</span>
                            </Link>
                        </div>

                        <nav className="flex flex-col gap-4">
                            <NavItem href="/dashboard" label="Painel" icon={<MdDashboard size={20}/>} />
                            <NavItem href="/products" label="Produtos" icon={<MdInventory size={20}/>} />
                        </nav>
                    </div>

                    <Link className="flex px-4 py-3 gap-3 rounded-md transition hover:bg-red-600 hover:text-white mt-10"  href="/">
                        <MdLogout className="pt-2"/>
                        <span >Sair</span>
                    </Link>
                </aside>
            </nav>

        ) : (
            <MdMenu className="cursor-pointer m-8" size={30} onClick={() => setIsOpen(true)}/>
        )
    )
}

function NavItem({href, label, icon}) {
    const pathName = usePathname()
    const isActive = pathName === href

    return (
        <Link className={`flex px-4 py-3 gap-3 rounded-md transition hover:bg-blue-600 hover:text-white ${isActive ? "bg-blue-600" : ""}`} href={href}>
            {icon}
            {label}
        </Link>
    )
}
