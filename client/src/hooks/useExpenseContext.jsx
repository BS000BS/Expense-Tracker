import { useContext } from "react"
import { ExpenseContext } from "../context/expenseContext"

const useExpenseContext = () => {
    const context = useContext(ExpenseContext)

    if (!context) {
        throw Error('useExpenseContext must be used inside an ExpenseContextProvider')
    }

    return context
}

export default useExpenseContext;