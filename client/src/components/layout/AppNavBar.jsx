import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/event.png";
import axios from "axios";

const AppNavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(status === "true");
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get(
                "https://os-b-8-assignment-fa-5-m-26.vercel.app/api/v1/UserLogout",
                {
                    withCredentials: true,
                }
            );

            localStorage.removeItem("isLoggedIn");
            setIsLoggedIn(false);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <>
            {/* Top Bar */}
            <div className="container-fluid text-white p-2 bg-primary">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6">
                            <span style={{ fontSize: "14px" }}>
                                <i className="bi bi-envelope"></i>{" "}
                                support@elp.com
                            </span>
                            <span style={{ fontSize: "14px" }} className="mx-3">
                                <i className="bi bi-phone"></i> +880 17XX XXXXXX
                            </span>
                        </div>
                        <div className="col-md-6 text-end">
                            <i className="bi bi-facebook mx-2"></i>
                            <i className="bi bi-twitter mx-2"></i>
                            <i className="bi bi-instagram mx-2"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3 shadow-sm">
                <div className="container">
                    <Link
                        className="navbar-brand d-flex align-items-center justify-content-center "
                        to="/"
                    >
                        <img
                            className="img-fluid"
                            src={logo}
                            alt="ELP Logo"
                            width="30px"
                        />{" "}
                        <span
                            className="navbar-brand text-primary fw-bold fs-3 p-1"
                            href="#"
                        >
                            ELP
                        </span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navMenu"
                        aria-controls="navMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navMenu">
                        <ul className="navbar-nav ms-auto align-items-lg-center">
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-dark fw-semibold fs-5"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-primary fw-semibold fs-5"
                                    to="/all-events"
                                >
                                    All Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                {isLoggedIn && (
                                    <Link
                                        className="nav-link text-info fw-semibold fs-5"
                                        to="/create-event"
                                    >
                                        Create Event
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item">
                                {isLoggedIn && (
                                    <Link
                                        className="nav-link text-secondary fw-semibold fs-5"
                                        to="/my-events"
                                    >
                                        My Events
                                    </Link>
                                )}
                            </li>
                        </ul>

                        <div className="d-flex ms-3">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        className="btn btn-outline-secondary me-2 fw-medium"
                                        to="/profile"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-danger fw-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="btn btn-outline-primary me-2 fw-medium"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        className="btn btn-primary fw-medium"
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppNavBar;
