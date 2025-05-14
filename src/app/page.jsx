"use client"

import Button from "../components/Button"
import Form from "src/components/Form"
import Input from "../components/Input"
import Link from "next/link"
import Logo from "../components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"

export default function SignInPage() {
    const {signIn, setEmail, setPassword} = useUser() 

    return (
        <Main>
            <Logo/>

            <Title>Login</Title>

            <Form className="flex flex-col" onSubimit={signIn}>
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
            </Form>
        </Main>
    )
}
