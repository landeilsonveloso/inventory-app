"use client"

import { HiLockClosed } from "react-icons/hi"
import Button from "src/components/Button"
import Div from "src/containers/Div"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Logo from "src/components/Logo"
import Title from "src/components/Title"
import Main from "src/containers/Main"
import AuthProvider from "src/contexts/AuthContext"
import useUser from "src/hooks/useUser"

export default function RedefinePasswordPage() {
    const {
            setPassword,
            setConfirmPassword,
            redefinePassword,
            disabledButton
        } = useUser()

    return (
        <AuthProvider>
            <Main>
                <Form className="flex flex-col" onSubimit={redefinePassword}>
                    <Logo/>

                    <Title>Redefinir Senha</Title>

                    <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <HiLockClosed className="text-2xl"/>
                        
                        <Input
                            className="w-full px-2 text-white outline-none"
                            id="newPassword"
                            name="password"
                            type="password"
                            minLength={6}
                            maxLength={18}
                            placeholder="Senha"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Div>

                    <Div className="flex items-center w-full mb-4 p-2 bg-black/30 text-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <HiLockClosed className="text-2xl"/>
                        
                        <Input
                            className="w-full px-2 text-white outline-none"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            minLength={6}
                            maxLength={18}
                            placeholder="Confirmar Senha"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Div>

                    <Button className="w-full py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition cursor-pointer" disabled={disabledButton}>
                        Redefinir
                    </Button>
                </Form>
            </Main>
        </AuthProvider>
    )
}
