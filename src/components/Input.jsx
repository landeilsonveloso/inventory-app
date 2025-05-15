export default function Input({id, name, type, minLength, maxLength, placeholder, onChange}) {
    return (
        <input
            className="w-full ml-2 px-4 py-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            id={id}
            name={name}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            required
        />
  )
}
