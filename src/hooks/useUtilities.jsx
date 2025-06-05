import { useCallback } from "react"

export default function useUtilities() {
    const formatToBRL = useCallback((value) => {
        return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value)
    }, [])
    
    return {
        formatToBRL
    }
}