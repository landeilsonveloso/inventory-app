import Image from "next/image"

export default function Logo() {
    return (
        <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Logo A. S. Cell" width={150} height={150} priority />
        </div>
    )
}
