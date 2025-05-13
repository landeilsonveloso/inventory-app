export default function Input({ type, placeholder }) {
  return (
    <input
        className="w-full px-4 py-2 mb-4 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        type={type}
        placeholder={placeholder}
    />
  )
}
