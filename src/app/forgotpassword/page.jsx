import Button from "src/components/Button"
import Input from "src/components/Input"
import Link from "next/link"
import Logo from "src/components/Logo"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-black via-gray-900 to-black shadow-lg">
            <Logo/>

            <h2 className="text-2xl font-semibold text-center mb-4">Recuperar Senha</h2>

            <form className="flex flex-col">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={60}
                    placeholder="Email"
                />

                <Button>Enviar</Button>
                
                <Link className="text-center text-sm text-blue-400 hover:underline mt-4 cursor-pointer" href="/">
                    Voltar
                </Link>
            </form>
        </div>
    </div>

  )
}
