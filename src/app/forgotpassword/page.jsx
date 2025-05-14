import Button from "src/components/Button"
import Form from "src/components/Form"
import Input from "src/components/Input"
import Link from "next/link"
import Logo from "src/components/Logo"
import Main from "src/containers/Main"
import Title from "src/components/Title"

export default function ForgotPassword() {
    return (
    <Main>
        <Logo/>

        <Title>Recuperar Senha</Title>

        <Form className="flex flex-col">
            <Input
                id="email"
                name="email"
                type="email"
                maxLength={60}
                placeholder="Email"
            />

            <Button>Enviar</Button>
                
            <Link className="text-center text-sm text-blue-400 hover:underline mt-4 cursor-pointer" href="/">
                Voltar
            </Link>
        </Form>
    </Main>
  )
}
