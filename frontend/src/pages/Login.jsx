import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const user = await loginUser(formData);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
        } catch (error) {
            alert(error.message || 'Invalid username or password');
        }
    }

    return (
        <div className="bg-[#f4f4f4] flex justify-center items-center h-screen">
            <form className="bg-white w-84 bg-blue px-12 py-8 flex flex-col rounded-md shadow-sm">
                <h1 className="font-bold text-2xl mb-2">Login Page</h1>
                <TextInput label="Username:" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                <TextInput label="Password:" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button className="bg-[#4cae4c] text-white text-sm p-2 my-2 cursor-pointer" type="submit" onClick={handleLogin}>Login</button>
                <Link to="/register" className="text-sm text-center underline text-blue-700 cursor-pointer">New user? Register here</Link>
            </form>
        </div>
    );
};

export default Login;