export default function Button({ children }) {
  return (
    <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition cursor-pointer">
      {children}
    </button>
  )
}
