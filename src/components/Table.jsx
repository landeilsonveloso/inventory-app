import { useCallback } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

export default function Table({columns, data, onEdit, onDelete, action}) {
    const formatToBRL = useCallback((value) => {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value)
    }, [])

    return (
        <div className="overflow-x-auto rounded-md shadow">
            <table className="min-w-full text-center text-sm bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <thead className="uppercase text-gray-300 bg-[#1c1a3a]">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-6 py-4">
                                {col.label}
                            </th>
                        ))}

                        {action ? (<th className="px-6 py-4">Ações</th>) : null}
                    </tr>
                </thead>
                
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.id || index} className="border-b border-gray-700 hover:bg-[#34315d] transition">
                                {columns.map((col) => {
                                    const value = item[col.key]

                                    if (["cost", "price", "value", "inflow", "outflow", "lucre"].includes(col.key)) {
                                        return (
                                            <td key={col.key} className="px-6 py-4">
                                                {formatToBRL(value)}
                                            </td>
                                        )
                                    }

                                    if (["date", "createdAt", "updatedAt"].includes(col.key)) {
                                        const formattedDate = new Date(value).toLocaleDateString("pt-BR", {timeZone: "UTC"})

                                        return (
                                            <td key={col.key} className="px-6 py-4">
                                                {formattedDate}
                                            </td>
                                        )
                                    }

                                    return (
                                        <td key={col.key} className="px-6 py-4">
                                            {value}
                                        </td>
                                    )
                                })}

                                {action ? (
                                    <td className="flex justify-center items-center px-6 py-4 gap-4">
                                        <button className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer transition" onClick={() => onEdit?.(item)}>
                                            <MdEdit />
                                        </button>

                                        <button className="p-2 rounded-md bg-red-600 hover:bg-red-700 cursor-pointer transition" onClick={() => onDelete?.(item)}>
                                            <MdDelete />
                                        </button>
                                    </td>
                                ) : (
                                    null
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-white">
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
