"use client"

import AuthProvider from "src/contexts/AuthContext"
import Div from "src/containers/Div"
import Input from "src/components/Input"
import Option from "src/components/Option"
import Select from "src/components/Select"
import Table from "src/components/Table"
import Title from "src/components/Title"
import useDashboard from "src/hooks/useDashboard"

export default function DashboardPage() {
    const {
        selectedDate,
        setSelectedDate,
        filterType,
        setFilterType,
        filtered,
        filteredValues,
        columns
    } = useDashboard()
    
    return (
        <AuthProvider>
            <Div className="text-white min-h-screen bg-black">
                <Div className="flex justify-between items-center mb-6">
                    <Title>Entrada: R$ {filteredValues.inflow}</Title>
                    <Title>Saída: R$ {filteredValues.outflow}</Title>
                    <Title>Lucro: R$ {filteredValues.lucre}</Title>
                </Div>

                <Div className="w-full flex items-center justify-center gap-4 mb-8">
                    <Title>Filtrar</Title>
                    
                    <Select className="w-1/5 bg-black border rounded px-4 py-2 mb-4" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <Option value="">
                            
                        </Option>

                        <Option value="day">
                            Dia
                        </Option>

                        <Option value="week">
                            Semana
                        </Option>

                        <Option value="month">
                            Mês
                        </Option>
                    </Select>

                    <Input
                        className="border rounded px-4 py-2 mb-4"
                        id="date"
                        name="date"
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ""}
                        onChange={(e) => {
                            const newValue = e.target.value

                            if (newValue) {
                                setSelectedDate(new Date(newValue))
                            } else {
                                setSelectedDate(new Date())
                            }
                        }}
                    />

                </Div>
                
                <Table
                    columns={columns}
                    data={filtered}
                />
            </Div>
        </AuthProvider>
    )
}
