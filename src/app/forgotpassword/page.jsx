"use client"

import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import { HiMail } from "react-icons/hi"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import Navigation from "src/components/Navigation"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"

export default function ForgotPasswordPage() {
    const {setEmail, forgotPassword} = useUser()

    return (
    <Main>
        <Form className="flex flex-col" onSubimit={forgotPassword}>
            <Logo/>

            <Title>Recuperar Senha</Title>

            <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                <HiMail className="text-2xl"/>

                <Input
                    className="w-full px-2 text-white outline-none"
                    id="email"
                    name="email"
                    type="email"
                    maxLength={60}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Div>

            <Button className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition cursor-pointer">
                Enviar
            </Button>
                
            <Navigation className="text-center my-2" href="/">
                Voltar
            </Navigation>
        </Form>
    </Main>
  )
}
