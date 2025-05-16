export default function Input({id, name, type, minLength, maxLength, placeholder, onChange}) {
    return (
        <input
            className="w-full px-2 text-white outline-none"
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
