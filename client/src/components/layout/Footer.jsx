import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            {/* Top Section */}
            <div className="shadow-sm bg-light">
                <div className="container py-5">
                    <div className="row">
                        {/* Legals */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5 className="text-primary fw-bold mb-3">
                                Legals
                            </h5>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/about"
                                >
                                    About
                                </Link>
                            </p>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/refund"
                                >
                                    Refund Policy
                                </Link>
                            </p>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/terms"
                                >
                                    Terms
                                </Link>
                            </p>
                        </div>

                        {/* Information */}
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5 className="text-primary fw-bold mb-3">
                                Information
                            </h5>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/how-to-buy"
                                >
                                    How to Buy
                                </Link>
                            </p>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/contact"
                                >
                                    Contact
                                </Link>
                            </p>
                            <p className="my-2">
                                <Link
                                    className="nav-link text-dark"
                                    to="/complain"
                                >
                                    Complain
                                </Link>
                            </p>
                        </div>

                        {/* About */}
                        <div className="col-md-4">
                            <h5 className="text-primary fw-bold mb-3">
                                About ELP
                            </h5>
                            <p className="text-muted">
                                ELP is your go-to platform for discovering,
                                hosting, and managing events. Join us in
                                creating memorable experiences.
                            </p>
                            <img
                                className="img-fluid mt-3"
                                style={{ maxWidth: "220px" }}
                                src="https://www.uiu.ac.bd/wp-content/uploads/2021/02/Card-Logo-Pay-With-01-1.png"
                                alt="Payment Methods"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-primary py-3 text-center">
                <p className="text-white mb-0 small">
                    © {new Date().getFullYear()} ELP — All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
