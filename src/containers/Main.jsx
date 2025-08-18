export default function Main({children}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-black text-white px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl sm:max-w-md lg:max-w-lg p-6 sm:p-8">
                {children}
            </div>
        </div>
    )
}

