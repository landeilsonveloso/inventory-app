import AuthProvider from "src/contexts/AuthContext"

export default function Dashboard() {
    return (
        <AuthProvider>
            <div>Dashboard</div>
        </AuthProvider>
    )
}
