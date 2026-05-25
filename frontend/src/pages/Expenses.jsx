import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchExpenses } from '../api'

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadExpenses = async () => {
            setLoading(true);
            try {
                const response = await fetchExpenses();
                setExpenses(response);
            } catch (err) {
                setError(err.message || 'Unable to load expenses');
            } finally {
                setLoading(false);
            }
        };

        loadExpenses();
    }, []);

    return (
        <div className="bg-[#f4f4f4] h-screen p-8">
            <main className='bg-white w-full p-4 rounded-md shadow-sm'>
                <h1 className='font-bold text-xl my-4 text-center'>Expense List</h1>

                {loading && <p className='text-center text-gray-500'>Loading expenses...</p>}
                {error && <p className='text-center text-red-500'>{error}</p>}

                {!loading && expenses.length === 0 && (
                    <p className='text-center text-gray-700'>No expenses found. Add your first expense.</p>
                )}

                {expenses.map((expense) => (
                    <div
                        onClick={() => navigate(`/add-expense`, { state: { expense } })}
                        className="border-b border-gray-300 flex flex-col gap-1 p-4 cursor-pointer"
                        key={expense.id}
                    >
                        <h6 className='text-green-500 text-lg font-medium'>{expense.name}</h6>
                        <p className='font-bold text-xs'>Amount: <span className='font-normal text-gray-700'>{expense.amount}</span></p>
                        <p className='font-bold text-xs'>Date: <span className='font-normal text-gray-700'>{expense.date}</span></p>
                    </div>
                ))}
            </main>
        </div>
    )
}

export default Expenses