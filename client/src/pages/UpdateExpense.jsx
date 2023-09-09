import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

const UpdateExpense = ({ expense }) => {
    const [serverError, setServerError] = useState(null);
    const [emptyFieldsServer, setEmptyFieldsServer] = useState([]);
    const [success, setSuccess] = useState(null);

    const handleUpdateExpense = (expenseData) => {
        // This function is passed as the onSubmit prop to ExpenseForm
        
        const updateExpense = async () => {
            const response = await fetch('/api/expenses/' + expenseData._id, {
                method: 'PATCH',
                body: JSON.stringify(expenseData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (!response.ok) {
                setSuccess(null);
                setServerError(json.error);
                setEmptyFieldsServer(json.emptyFields);
            }
            if (response.ok) {
                setServerError(null);
                setSuccess('Expense successfully updated!');
                setEmptyFieldsServer([]);
            }
        }
        updateExpense();
    };

    const setSuccessNull = () => {
        setSuccess(null);
    }
    const setServerErrorNull = () => {
        setServerError(null);
    }


    return (
        <div>
            <h2 className='text-center'>Update Expense</h2>
            <ExpenseForm onSubmit={handleUpdateExpense}
                initialExpense={expense}
                serverError={serverError}
                emptyFieldsServer={emptyFieldsServer}
                success={success}
                setSuccessNull={setSuccessNull}
                setServerErrorNull={setServerErrorNull}
            />
        </div>
    );
};

export default UpdateExpense;
