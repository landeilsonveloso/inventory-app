import SideBar from "src/components/SideBar"

export default function ProductsPageLayout({children}) {
    return (
        <div className="flex min-h-screen bg-black text-white ml-20">
            <SideBar/>
            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}
