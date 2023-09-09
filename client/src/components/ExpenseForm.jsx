import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = ({ onSubmit, serverError, emptyFormFields, emptyFieldsServer, success, setSuccessNull, setServerErrorNull, setEmptyFormFieldsFalse, initialExpense = null }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [categorySelected, setCategorySelected] = useState(false);
    const notify = () => toast.error(serverError);
    const notifySuccess = () => toast.success(success);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categories');
            const json = await response.json();

            if (response.ok) {
                setCategories(json);
            }
        }

        fetchCategories();
    }, []);

    const [expenseData, setExpenseData] = useState({
        title: '',
        description: '',
        amount: '',
        category: '',
        note: '',
        userDefinedDate: new Date() // Initialize with the current date and time
    });

    useEffect(() => {
        if (emptyFormFields) {
            setExpenseData({
                title: '',
                description: '',
                amount: '',
                category: '',
                note: '',
                userDefinedDate: new Date()
            })
            setCategorySelected(false);
        }
    }, [emptyFormFields])

    useEffect(() => {
        if (success) {
            notifySuccess();
            setTimeout(() => {
                setSuccessNull();
            }, 1000);
        }
    }, [success]);
    useEffect(() => {
        if (serverError) {
            notify();
            setTimeout(() => {
                setServerErrorNull();
            }, 1000);
        }
    }, [serverError]);
    useEffect(() => {
        if (emptyFormFields) {
            notify();
            setTimeout(() => {
                setEmptyFormFieldsFalse();
            }, 1000);
        }
    }, [emptyFormFields]);



    useEffect(() => {
        if (initialExpense) {
            // If initialExpense is provided, populate the form fields for editing
            setExpenseData({
                ...initialExpense,
                userDefinedDate: initialExpense.userDefinedDate
                    ? new Date(initialExpense.userDefinedDate) // Parse the date string to a Date object
                    : new Date() // Use a default date if userDefinedDate is undefined
            });
        } else {
            // If there's no initialExpense, initialize with default values
            setExpenseData({
                title: '',
                description: '',
                amount: '',
                category: '',
                note: '',
                userDefinedDate: new Date()
            });
        }
    }, [initialExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({
            ...expenseData,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setExpenseData({
            ...expenseData,
            userDefinedDate: date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            amount,
            category,
            note,
            userDefinedDate,
        } = expenseData;

        const titleLimit = 70;
        const descriptionLimit = 400;
        const noteLimit = 120;

        if (
            title.trim() === '' ||
            description.trim() === '' ||
            category.trim() === '' ||
            (Number(amount) === 0 && !isNaN(Number(amount))) || 
            !userDefinedDate ||
            title.length > titleLimit ||
            description.length > descriptionLimit ||
            (note.length > 0 && note.length > noteLimit)
        ) {
            const errorMessages = [];

            if (title.trim() === '' || title.length > titleLimit) {
                errorMessages.push('Title must not be empty and should be less than 70 characters.');
            }

            if (description.trim() === '' || description.length > descriptionLimit) {
                errorMessages.push('Description must not be empty and should be less than 400 characters.');
            }

            if (amount.trim() === '' || (Number(amount) === 0 && !isNaN(Number(amount)))) {
                errorMessages.push('Amount can not be empty or 0.');
            }

            if (category.trim() === '') {
                errorMessages.push('Please select a category.');
            }

            if (!userDefinedDate) {
                errorMessages.push('Please select a valid date & time.');
            }

            if (note.length > noteLimit) {
                errorMessages.push(`Note should be less than ${noteLimit} characters.`);
            }

            setError(errorMessages.join(' '));
        } else {
            setError('');
            onSubmit(expenseData);
        }
    };


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, expenseData._id)} className='d-flex align-items-center flex-column container'>
                <input
                    type="text"
                    name="title"
                    value={expenseData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    id='title'
                    className={'col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3 ' + ((emptyFieldsServer && emptyFieldsServer.includes('title')) ? 'border border-danger' : '')}
                    title="Title"
                />
                <textarea
                    name="description"
                    value={expenseData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    id='description'
                    className={'col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3 ' + ((emptyFieldsServer && emptyFieldsServer.includes('description')) ? 'border border-danger' : '')}
                    title="Description"
                />
                <input
                    type="number"
                    name="amount"
                    value={expenseData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    id='amount'
                    className={'col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3 ' + ((emptyFieldsServer && emptyFieldsServer.includes('amount')) ? 'border border-danger' : '')}
                    title="Amount"
                />
                {categories.length > 0 ? <select
                    name="category"
                    value={expenseData.category}
                    onChange={(e) => {
                        handleChange(e);
                        setCategorySelected(true); // Mark category as selected
                    }}
                    id='category'
                    className={'col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3 ' + ((emptyFieldsServer && emptyFieldsServer.includes('category')) ? 'border border-danger' : '')}
                    title="Category"
                >
                    {/* Add an initial empty option */}
                    {!categorySelected && (
                        <option value="">
                            Select a category
                        </option>
                    )}

                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                    : <input className='text-danger col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3' placeholder='Please add some categories first!' value='Please add some categories first!' disabled />}
                <input
                    type="text"
                    name="note"
                    value={expenseData.note || ''}
                    onChange={handleChange}
                    placeholder="Note"
                    id='note'
                    className='col-lg-8 col-md-9 col-sm-12 col-11 p-2 m-3'
                    title="Note"
                />
                <DatePicker
                    selected={expenseData.userDefinedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select Date and Time"
                    id='date-time'
                    className='p-2 m-3'
                    title="Date & time"
                />
                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className='d-block m-4 btn btn-primary'>Save Expense</button>
            </form>

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
};

export default ExpenseForm;
