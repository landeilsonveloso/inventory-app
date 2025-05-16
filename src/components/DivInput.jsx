export default function DivInput({children}) {
    return (
        <div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
            {children}
        </div>
    )
}
