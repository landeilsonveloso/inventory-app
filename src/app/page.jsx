"use client"

import Button from "../components/Button"
import Form from "src/components/Form"
import { HiLockClosed, HiMail } from "react-icons/hi"
import Input from "../components/Input"
import Link from "next/link"
import Logo from "../components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"
import Div from "src/containers/Div"
import Navigation from "src/components/Navigation"

export default function SignInPage() {
    const {signIn, setEmail, setPassword} = useUser()

    return (
        <Main>
            <Logo/>

            <Title>Login</Title>

            <Form className="flex flex-col" onSubimit={signIn}>
                <Div>
                    <HiMail className="text-2xl"/>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={60}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Div>

                <Div>
                    <HiLockClosed className="text-2xl"/>

                    <Input
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

                <Button>Entrar</Button>
            </Form>
        </Main>
    )
}
