'use client'

import Link from 'next/link'
import {MdDashboard, MdInventory, MdPeople, MdPerson, MdLocalShipping, MdAttachMoney, MdLogout} from 'react-icons/md'

export default function SideBar() {
    return (
        <aside className="w-60 h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 shadow-lg flex flex-col justify-between">
            
            <div>
                <div className="flex justify-center">
                    <Link className='flex flex-col items-center cursor-pointer w-20 mb-10' href="/profile">
                        <img className="rounded-full mb-2 border-2 border-pink-500" src="/logo.png" alt="Logo A. S. Cell"/>
                        <span>Meu Perfil</span>
                    </Link>
                </div>

                <nav className="flex flex-col gap-4">
                    <NavItem href="/dashboard" label="Painel" icon={<MdDashboard size={20} />} />
                    <NavItem href="/products" label="Produtos" icon={<MdInventory size={20} />} />
                    <NavItem href="/clients" label="Clientes" icon={<MdPeople size={20} />} />
                    <NavItem href="/employees" label="Funcionários" icon={<MdPerson size={20} />} />
                    <NavItem href="/suppliers" label="Fornecedores" icon={<MdLocalShipping size={20} />} />
                    <NavItem href="/finance" label="Financeiro" icon={<MdAttachMoney size={20} />} />
                </nav>
            </div>

            <Link className="flex px-4 py-3 gap-3 rounded-md transition hover:bg-red-600 hover:text-white mt-10"  href="/">
                <MdLogout/>
                <span>Sair</span>
            </Link>
        </aside>
    )
}

function NavItem({href, label, icon}) {
    return (
        <Link className="flex px-4 py-3 gap-3 rounded-md transition hover:bg-blue-600 hover:text-white" href={href}>
            {icon}
            <span>{label}</span>
        </Link>
    )
}
