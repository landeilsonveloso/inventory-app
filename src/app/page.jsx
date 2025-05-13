"use client"

import Button from "../components/Button"
import Input from "../components/Input"
import Link from "next/link"
import Logo from "../components/Logo"
import useUser from "src/hooks/useUser"

export default function SignInPage() {
    const {signIn, setEmail, setPassword} = useUser() 

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-black via-gray-900 to-black shadow-lg">
                <Logo/>
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form className="flex flex-col" onSubmit={signIn}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={60}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                        
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        maxLength={18}
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Link className="text-right text-sm text-blue-400 hover:underline mb-4 cursor-pointer" href="/forgotpassword">
                        Esqueceu a senha?
                    </Link>

                    <Button>Entrar</Button>
                </form>
            </div>
        </div>
    )
}
