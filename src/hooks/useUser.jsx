import axios from "axios"
import config from "src/config/config"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

export default function useUser() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const apiUrlBase = config.API_URL_BASE

    const signInUrl = `${apiUrlBase}/users/signin`

    const verifyToken = useCallback(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            return router.replace("/")
        }

        return token
    }, [router])

    const signIn = useCallback(async (e) => {
        e.preventDefault()
        
        await axios
                    .post(signInUrl, {email, password})
                    .then((res) => {
                        if (res.status === 200) {
                            localStorage.setItem("token", res.data)
                            router.replace("/dashboard")
                            return
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data)
                            return
                        }

                        else if (err.response.status >= 500) {
                            alert("Erro no servidor, recarregue a página!")
                            return
                        }
                    })
    }, [router, signInUrl, email, password])

    return {
        email,
        password,
        setEmail,
        setPassword,
        verifyToken,
        signIn
    }
}
