import { MdEdit, MdDelete, MdShoppingCart } from 'react-icons/md'
import useUtilities from 'src/hooks/useUtilities'

export default function Table({name, columns, data, onSell, onEdit, onDelete}) {
    const {
        formatToBRL
    } = useUtilities()

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

                        {name === "dashboard" ? null : (<th className="px-6 py-4">Ações</th>)}
                    </tr>
                </thead>
                
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={item.id || index} className="border-b border-gray-700 hover:bg-[#34315d] transition">
                                {columns.map((col) => {
                                    const value = item[col.key]

                                    if (["cost", "price", "unitValue", "totalValue", "inflow", "outflow", "lucre"].includes(col.key)) {
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

                                {name === "dashboard" ? (
                                    null
                                ) : (

                                    name === "products" ? 
                                        <td className="flex justify-center items-center px-6 py-4 gap-4">
                                            <button className="p-2 rounded-md bg-green-600 hover:bg-green-800 cursor-pointer transition" onClick={() => onSell?.(item)}>
                                                <MdShoppingCart/>
                                            </button>

                                            <button className="p-2 rounded-md bg-blue-600 hover:bg-blue-800 cursor-pointer transition" onClick={() => onEdit?.(item)}>
                                                <MdEdit/>
                                            </button>

                                            <button className="p-2 rounded-md bg-red-600 hover:bg-red-800 cursor-pointer transition" onClick={() => onDelete?.(item)}>
                                                <MdDelete/>
                                            </button>
                                        </td>
                                    : 
                                        <td className="flex justify-center items-center px-6 py-4 gap-4">
                                            <button className="p-2 rounded-md bg-blue-600 hover:bg-blue-900 cursor-pointer transition" onClick={() => onEdit?.(item)}>
                                                <MdEdit/>
                                            </button>
    
                                            <button className="p-2 rounded-md bg-red-600 hover:bg-red-800 cursor-pointer transition" onClick={() => onDelete?.(item)}>
                                                <MdDelete/>
                                            </button>
                                        </td>
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
