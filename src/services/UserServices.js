const UserModel = require("../models/UserModel")

const { EncodeToken } = require("../utility/TokenHelper");

const UserRegisterService = async (req) => {
    try {
        let reqBody = req.body;
        let existUser = await UserModel.findOne({ email: reqBody.email });

        if (existUser) {
            return { status: "fail", message: "User already exists!" };
        } else {
            await UserModel.create(reqBody);
            return { status: "success", message: "Registration complete!" };
        }

    } catch (e) {
        return { status: "fail", message: e }
    }
}

const VerifyPasswordService = async (req) => {

    try {
        let email = req.params.email;
        let password = req.params.password;

        // User Count
        let total = await UserModel.find({ email: email, password: password }).countDocuments();

        if (total === 1) {

            // User ID Read
            let user_id = await UserModel.find({ email: email, password: password }).select('_id');

            // User Token Create
            let token = EncodeToken(email, user_id[0]['_id'].toString())

            return { status: "success", message: "Log in success", user_id: user_id[0]._id, token: token, total: total }
        }
        else {
            return { status: "fail", message: "Invalid email or password", total: total }
        }

    } catch (e) {
        return { status: "fail", message: "Something went wrong at login" }
    }
}

module.exports = {
    VerifyPasswordService,
    UserRegisterService
}
