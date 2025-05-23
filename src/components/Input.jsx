export default function Input({className, id, name, type, minLength, maxLength, placeholder, value, onChange}) {
    return (
        <input
            className={className}
            id={id}
            name={name}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
    )
}
