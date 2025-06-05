export default function Input({className, id, name, type, minLength, maxLength, placeholder, step, value, onChange}) {
    return (
        <input
            className={className}
            id={id}
            name={name}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            step={step}
            value={value}
            onChange={onChange}
            required
        />
    )
}
