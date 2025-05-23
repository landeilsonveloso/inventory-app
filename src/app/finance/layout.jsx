import SideBar from "src/components/SideBar"

export default function FinancesPageLayout({children}) {
  return (
    <div className="flex min-h-screen bg-black text-white ml-60">
      <SideBar/>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
