export default function Main({children}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-black via-gray-900 to-black shadow-lg">
                {children}
            </div>
        </div>
    )
}
