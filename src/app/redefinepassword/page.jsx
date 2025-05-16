"use client"

import { HiLockClosed } from "react-icons/hi"
import Button from "src/components/Button"
import DivInput from "src/components/DivInput"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Title from "src/components/Title"
import Main from "src/containers/Main"
import useUser from "src/hooks/useUser"

export default function RedefinePassword() {
    const {setPassword, setConfirmPassword, redefinePassword} = useUser()

    return (
        <Main>

            <Form className="flex flex-col" onSubimit={redefinePassword}>
                <Logo/>

                <Title>Redefinir Senha</Title>

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

                <DivInput>
                    <HiLockClosed className="text-2xl"/>
                    
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        maxLength={18}
                        placeholder="Confirmar Senha"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DivInput>

                <Button>Redefinir</Button>
            </Form>
        </Main>
    )
}
