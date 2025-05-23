'use client'

import { MdEdit, MdDelete} from 'react-icons/md'

export default function Table({columns, data, onEdit, onDelete}) {
    return (
        <div className="overflow-x-auto rounded-md shadow">
            <table className="min-w-full text-left text-sm bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <thead className="uppercase text-gray-300 bg-[#1c1a3a]">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        {columns.map((col) => (
                            <th key={col.key} className="px-6 py-4">
                                {col.label}
                            </th>
                        ))}
                        <th className="px-6 py-4">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.id || index} className="border-b border-gray-700 hover:bg-[#34315d] transition">
                                <td className="px-6 py-4">{index + 1}</td>
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4">
                                        {item[col.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 flex gap-4">
                                    <button onClick={() => onEdit?.(item)} className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer transition">
                                        <MdEdit/>
                                    </button>
                                    <button onClick={() => onDelete?.(item)} className="p-2 rounded-md bg-red-600 hover:bg-red-700 cursor-pointer transition">
                                        <MdDelete/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 2} className="px-6 py-4 text-center text-white">
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
