import User from "../models/Users.js";
import { hash } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        // get all the users
        const users = await User.find();
        return res.status(200).json({ message: "Ok", users });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        // user SignUp
        // Destructuring the body data into the variables for easy use
        const { name, email, password } = req.body;
        // Encrypt the password before sending it to the database for the security reasons with the help of bcrypt
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        user.save();
        return res.status(200).json({ message: "Ok", userId: user._id });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "ERROR", cause: err.message });
    }
};
//# sourceMappingURL=user-controllers.js.map