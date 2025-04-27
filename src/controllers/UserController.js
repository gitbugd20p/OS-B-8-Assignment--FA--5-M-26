const { UserRegisterService, VerifyPasswordService } = require("../services/UserServices");

// Cookie options for both login and logout
const cookieOptions = {
    httpOnly: true,            // JS can’t read document.cookie
    secure: true,            // must be HTTPS for sameSite:none
    sameSite: 'none',          // allow cross-site XHR/fetch
    path: '/',             // send on every route
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
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
