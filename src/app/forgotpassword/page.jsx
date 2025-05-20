"use client"

import Button from "src/components/Button"
import DivInput from "src/components/DivInput"
import Form from "src/components/Form"
import { HiMail } from "react-icons/hi"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import Navigation from "src/components/Navigation"
import Title from "src/components/Title"
import useUser from "src/hooks/useUser"

export default function ForgotPassword() {
    const {setEmail, forgotPassword} = useUser()

    return (
    <Main>
        <Form className="flex flex-col" onSubimit={forgotPassword}>
            <Logo/>

            <Title>Recuperar Senha</Title>

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

            <Button>Enviar</Button>
                
            <Navigation className="text-center my-2" href="/">
                Voltar
            </Navigation>
        </Form>
    </Main>
  )
}
