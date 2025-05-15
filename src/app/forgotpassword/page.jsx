import Button from "src/components/Button"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Link from "next/link"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"
import Div from "src/containers/Div"
import { HiMail } from "react-icons/hi"
import Navigation from "src/components/Navigation"

export default function ForgotPassword() {
    return (
    <Main>
        <Logo/>

        <Title>Recuperar Senha</Title>

        <Form className="flex flex-col">
            <Div>
                <HiMail className="text-2xl"/>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={60}
                    placeholder="Email"
                />
            </Div>

            <Button>Enviar</Button>
                
            <Navigation className="text-center my-2" href="/">
                Voltar
            </Navigation>
        </Form>
    </Main>
  )
}
