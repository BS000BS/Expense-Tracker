import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

const CreateExpense = () => {
    const [serverError, setServerError] = useState(null);
    const [emptyFormFields, setEmptyFormFields] = useState(false);
    const [emptyFieldsServer, setEmptyFieldsServer] = useState([]);
    const [success, setSuccess] = useState(null);

    const handleCreateExpense = (expenseData) => {
        // This function is passed as the onSubmit prop to ExpenseForm

        const createExpense = async () => {
            const response = await fetch('/api/expenses/', {
                method: 'POST',
                body: JSON.stringify(expenseData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (!response.ok) {
                setSuccess(null);
                setEmptyFormFields(false);
                setServerError(json.error);
                setEmptyFieldsServer(json.emptyFields);
            }
            if (response.ok) {
                setServerError(null);
                setSuccess('Expense successfully created!');
                setEmptyFormFields(true);
                setEmptyFieldsServer([]);
            }
        }
        createExpense();
    };

    const setSuccessNull = () => {
        setSuccess(null);
    }
    const setServerErrorNull = () => {
        setServerError(null);
    }
    const setEmptyFormFieldsFalse = () => {
        setEmptyFormFields(false);
    }

    return (
        <div>
            <h2 className='text-center'>Create Expense</h2>
            <ExpenseForm onSubmit={handleCreateExpense}
                serverError={serverError}
                emptyFormFields={emptyFormFields}
                emptyFieldsServer={emptyFieldsServer}
                success={success}
                setSuccessNull={setSuccessNull}
                setServerErrorNull={setServerErrorNull}
                setEmptyFormFieldsFalse={setEmptyFormFieldsFalse}
            />
        </div>
    );
};

export default CreateExpense;
