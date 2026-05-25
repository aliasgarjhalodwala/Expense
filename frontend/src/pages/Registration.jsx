import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../api';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullName: ""
    });

    const handleRegistration = async (e) => {
        e.preventDefault();

        const { username, password, email, fullName } = formData;

        if (!username || !password || !email || !fullName) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const user = await registerUser(formData);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } catch (error) {
            alert(error.message || 'Registration failed');
        }
    };

    return (
        <div className="bg-[#f4f4f4] flex justify-center items-center h-screen rounded-md shadow-sm">
            <form className="bg-white w-84 bg-blue px-12 py-8 flex flex-col">
                <h1 className="font-bold text-2xl mb-2">Registration</h1>
                <TextInput label="Username:" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                <TextInput label="Password:" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <TextInput label="Email:" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <TextInput label="Full Name:" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                <button className="bg-[#337ab7] text-white text-sm p-2 my-2 cursor-pointer" type="submit" onClick={handleRegistration}>Register</button>
                <Link to="/" className="text-sm text-center underline text-blue-700 cursor-pointer">Already have an account? Login here</Link>
            </form>
        </div>
    );
};

export default Registration;