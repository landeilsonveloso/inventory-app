"use client"

import Button from "../components/Button"
import Form from "src/components/Form"
import { HiLockClosed, HiMail } from "react-icons/hi"
import Input from "../components/Input"
import Logo from "../components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"
import DivInput from "src/components/DivInput"
import Navigation from "src/components/Navigation"

export default function SignInPage() {
    const {signIn, setEmail, setPassword} = useUser()

    return (
        <Main>


            <Form className="flex flex-col" onSubimit={signIn}>
                <Logo/>

                <Title>Login</Title>
                
                <DivInput>
                    <HiMail className="text-2xl"/>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        maxLength={60}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DivInput>

                <DivInput>
                    <HiLockClosed className="text-2xl"/>

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        maxLength={18}
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DivInput>

                <Navigation className="flex justify-end" href="/forgotpassword">
                    Esqueceu a senha?
                </Navigation>

                <Button>Entrar</Button>
            </Form>
        </Main>
    )
}
