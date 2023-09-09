import { createContext, useReducer } from "react";

export const ExpenseContext = createContext();

const currentDate = new Date();

export const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return {
                expenses: action.payload
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(e => e._id !== action.id)
            }
        case 'FILTER_WEEK':
            const oneWeekAgo = new Date(currentDate);
            oneWeekAgo.setDate(currentDate.getDate() - 7);

            const filteredWeek = state.expenses.filter((expense) => {
                const expenseDate = new Date(expense.userDefinedDate);
                return expenseDate >= oneWeekAgo && expenseDate <= currentDate;
            });

            return {
                expenses: filteredWeek,
                selectedTimeFrame: 'week'
            };

        case 'FILTER_MONTH':
            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
            const filteredMonth = state.expenses.filter((expense) => {
                const expenseDate = new Date(expense.userDefinedDate);
                return expenseDate >= firstDayOfMonth && expenseDate <= currentDate;
            });

            return {
                expenses: filteredMonth,
                selectedTimeFrame: 'month'
            };

        case 'FILTER_YEAR':
            const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
    
            const filteredYear = state.expenses.filter((expense) => {
                const expenseDate = new Date(expense.userDefinedDate);
                return expenseDate >= firstDayOfYear && expenseDate <= currentDate;
            });

            return {
                expenses: filteredYear,
                selectedTimeFrame: 'year'
            };
        default:
            return state
    }
}

export const ExpenseContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, {
        expenses: [],
        selectedTimeFrame: 'all'
    })

    return (
        <ExpenseContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    )
}
