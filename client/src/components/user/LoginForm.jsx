import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(
                `/api/v1/VerifyLogin/${email}/${password}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data["status"] === "success") {
                // Store user ID and token in localStorage
                localStorage.setItem("user_id", res.data["user_id"]); // Store user ID
                localStorage.setItem("isLoggedIn", "true"); // Store login status
                toast.success("Login Successful");
                navigate("/"); // Reload to update navbar
            }
        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Invalid email or password"
            );
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h3 className="mb-4">Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
