const { UserRegisterService, VerifyPasswordService } = require("../services/UserServices");

exports.Register = async (req, res) => {
    let result = await UserRegisterService(req);
    return res.status(200).json(result);
}

exports.VerifyLogin = async (req, res) => {
    let result = await VerifyPasswordService(req)

    if (result['status'] === "success") {

        // Cookies Option
        let cookieOption = { expires: new Date(Date.now() + 24 * 6060 * 1000), httpOnly: false }

        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)

    } else {
        return res.status(200).json(result)
    }
}

exports.UserLogout = async (req, res) => {
    let cookieOption = { expires: new Date(Date.now() - 24 * 6060 * 1000), httpOnly: false }
    res.cookie('token', "", cookieOption)
    return res.status(200).json({ status: "success" })
}
