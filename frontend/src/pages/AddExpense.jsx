import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import { createExpense, updateExpense } from '../api'

const AddExpense = () => {
    const expense = useLocation()?.state?.expense;

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: expense?.id || null,
        name: expense?.name || "",
        amount: expense?.amount || "",
        date: expense?.date || "",
        description: expense?.description || ""
    })


    const handleAddExpense = async (e) => {
        e.preventDefault();

        const { name, amount, date } = formData;

        if (!name || !amount || !date) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            await createExpense(formData);
            navigate("/expenses");
        } catch (error) {
            alert(error.message || 'Unable to save expense');
        }
    }

    const handleUpdateExpense = async (e) => {
        e.preventDefault();
        const { id, name, amount, date } = formData;

        if (!name || !amount || !date) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            await updateExpense(id, formData);
            navigate("/expenses");
        } catch (error) {
            alert(error.message || 'Unable to update expense');
        }
    }

  return (
    <div className="bg-[#f4f4f4] h-screen p-8">
        <main className='bg-white w-full p-4 rounded-md shadow-sm'>
            <h1 className='font-bold text-3xl my-4 text-center'>{expense ? "Update Expense" : "Add New Expense"}</h1>           

            <TextInput label="Expense Name:" color="text-gray-700" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <TextInput label="Amount:" type="number" color="text-gray-700" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
            <TextInput label="Date:" type="date" color="text-gray-700" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />

            <p className='mt-2 text-gray-700'>Description</p>
            <textarea className="border border-gray-300 rounded-sm outline-none p-1 w-full" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            <button className="bg-[#4cae4c] text-white text-sm p-2 mt-4 cursor-pointer w-full" type="submit" onClick={expense ? handleUpdateExpense : handleAddExpense}>
                {expense ? "Update Expense" : "Add Expense"}
            </button>
        </main>
    </div>
  )
}

export default AddExpense