import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useExpenseContext from '../hooks/useExpenseContext';

function Home() {
    const [error, setError] = useState('');
    const notify = () => toast.error(error);
    const { expenses, selectedTimeFrame, dispatch } = useExpenseContext();

    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_EXPENSES', payload: json });
            }
        }

        fetchExpenses();
    }, []);
    
    const filterByWeek = () => {
        dispatch({ type: 'FILTER_WEEK' });
    };
    
    const filterByMonth = () => {
        dispatch({ type: 'FILTER_MONTH' });
    };
    
    const filterByYear = () => {
        dispatch({ type: 'FILTER_YEAR' });
    };

    const totalAmount = (expenseList) => {
        return expenseList.reduce((accumulator, currentExpense) => accumulator + currentExpense.amount, 0);
    }

    const parseUserDefinedDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const deleteExpense = async (id) => {
        if (id != null && id != undefined) {
            const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            }
            if (response.ok) {
                setError('');
                dispatch({ type: 'DELETE_EXPENSE', id: id })
            }
        }
    }

    useEffect(() => {
        if (error) {
            notify()
        }
    }, [error]);

    return (
        <>
            <div className='container'>
                <h4 className='my-5 text-center'>Your list of expenses</h4>
                <div className='d-flex justify-content-end'>
                    <Link to={'/create-expense'} className='btn btn-outline-primary mb-4'>Add new expense</Link>
                </div>
                {expenses.length > 0 &&
                    <div className='d-flex justify-content-end align-items-center'>
                        <span className='btn btn-outline-secondary m-3' onClick={filterByWeek} style={selectedTimeFrame === 'week' ? {fontWeight: 'bold'} : {}}>This week</span>
                        <span className='btn btn-outline-secondary m-3' onClick={filterByMonth} style={selectedTimeFrame === 'month' ? {fontWeight: 'bold'} : {}}>This month</span>
                        <span className='btn btn-outline-secondary m-3' onClick={filterByYear} style={selectedTimeFrame === 'year' ? {fontWeight: 'bold'} : {}}>This year</span>
                        <p className='m-0'>Total expenses: {totalAmount(expenses)}€</p>
                    </div>
                }
                <ol className="list-group list-group-numbered mb-5">
                    {expenses.length > 0 && expenses.map((exp, index) => (
                        <li key={exp._id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-start py-5 text-break" style={(index % 2 === 0) ? { backgroundColor: '#EFF7FD' } : { backgroundColor: '#E6F2FD' }}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{exp.title}</div>
                                {exp.amount} €
                                <p className='m-0'>{parseUserDefinedDate(exp.userDefinedDate)}</p>
                            </div>
                            <div className="d-flex flex-column gap-4 ps-2">
                                <Link to={`/update-expense/${exp._id}`} ><div className="badge bg-primary rounded-pill">Update</div></Link>
                                <div onClick={() => deleteExpense(exp._id)} className="badge bg-danger rounded-pill" style={{cursor: 'pointer'}}>Delete</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Home;
