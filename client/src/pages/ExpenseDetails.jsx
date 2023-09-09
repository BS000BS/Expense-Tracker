import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateExpense from './UpdateExpense';
import CreateExpense from './CreateExpense';

const ExpenseDetails = () => {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);

    useEffect(() => {
        const fetchedExpense = async () => {
            const response = await fetch(`/api/expenses/${id}`);
            const json = await response.json();

            if (response.ok) {
                setExpense(json);
            }

        }
        if (id != null) {
            fetchedExpense();
        }
    }, [id]);

    return (
        <div>
            <div>
                {id ? (
                    expense ? (
                        <UpdateExpense expense={expense} />
                    ) : (
                        <div className="d-flex justify-content-center p-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                ) : (
                    <CreateExpense />
                )}
            </div>

        </div>
    );
};

export default ExpenseDetails;
