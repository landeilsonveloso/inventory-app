"use client"

import Button from "../components/Button"
import Form from "src/components/Form"
import { HiLockClosed, HiMail } from "react-icons/hi"
import Input from "../components/Input"
import Logo from "../components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"
import Div from "src/containers/Div"
import Navigation from "src/components/Navigation"

export default function SignInPage() {
    const {
            signIn,
            setEmail,
            setPassword,
            disabledButton
        } = useUser()

    return (
        <Main>
            <Form className="flex flex-col" onSubimit={signIn}>
                <Logo/>

                <Title>Entrar</Title>
                
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

                <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <HiLockClosed className="text-2xl"/>

                    <Input
                        className="w-full px-2 text-white outline-none"
                        id="password"
                        name="password"
                        type="password"
                        maxLength={18}
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Div>

                <Navigation className="flex justify-end" href="/forgotpassword">
                    Esqueceu a senha?
                </Navigation>

                <Button className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-800 transition cursor-pointer"disabled={disabledButton}>
                    Entrar
                </Button>
            </Form>
        </Main>
    )
}
