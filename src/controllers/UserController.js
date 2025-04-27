const { UserRegisterService, VerifyPasswordService } = require("../services/UserServices");

// Determine environment
const isProd = process.env.NODE_ENV === "production";

// Cookie options for both login and logout
const cookieOptions = {
    httpOnly: true,                            // JS cannot access the cookie
    secure: isProd,                            // send only over HTTPS in production
    sameSite: isProd ? "none" : "lax",      // allow cross-site in production
    path: "/",                               // cookie valid for entire site
    maxAge: 24 * 60 * 60 * 1000,               // 1 day
};

// Registration handler (public)
exports.Register = async (req, res) => {
    const result = await UserRegisterService(req);
    return res.status(200).json(result);
};

// Login handler (public)
exports.VerifyLogin = async (req, res) => {
    const result = await VerifyPasswordService(req);

    if (result.status === "success") {
        // Set auth token as HttpOnly cookie
        res.cookie("token", result.token, cookieOptions);
        return res.status(200).json(result);
    } else {
        // Authentication failed
        return res.status(401).json(result);
    }
};

// Logout handler (public)
exports.UserLogout = async (req, res) => {
    // Clear the cookie by matching the same options
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ status: "success" });
};
