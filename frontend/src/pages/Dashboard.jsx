import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        description: ""
    });

  return (
    <div className="bg-[#f4f4f4] h-screen p-8">
        <main className='bg-white w-full p-4 rounded-md shadow-sm'>
            <h1 className='font-bold text-3xl mb-4 text-center'>Welcome to Expense Tracker</h1>

            <div className='flex items-center gap-4 justify-center mb-4'>
                <Link to="/add-expense" className="text-sm cursor-pointer text-green-500" expense={expense}>Add Expense</Link>
                <Link to="/expenses" className="text-sm cursor-pointer text-green-500">Expense List</Link>
            </div>

            <p className='text-sm text-gray-700'>Track and manage your expenses effectively. Use the navigation links to add new expenses or view your expense history.</p>
        </main>
    </div>
  )
}

export default Dashboard