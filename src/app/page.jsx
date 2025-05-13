import Button from "../components/Button"
import Input from "../components/Input"
import Logo from "../components/Logo"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-black via-gray-900 to-black shadow-lg">
        <Logo/>
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form className="flex flex-col">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
          <div className="text-right text-sm text-blue-400 hover:underline mb-4 cursor-pointer">
            Esqueceu a senha?
          </div>
          <Button>Entrar</Button>
        </form>
      </div>
    </div>
  )
}
