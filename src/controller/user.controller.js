import JobsModel from "../model/jobs.model.js";
import UserModel from "../model/user.model.js";

export default class UserController {
    addNewUser(req, res) {
        const {name, email, password} = req.body;
        
        UserModel.addNewUser(name, email, password);

        console.log("<--------------- New User has been added ------------------->");

        console.log("Updated list ", UserModel.getAll());

        res.render("login", {errorMessage: null})
    }

    loginUser(req, res) {
        const {email, password} = req.body;

        const logStatus = UserModel.loginUser(email, password);

        if (logStatus) {
            // Add details in session.
            req.session.userEmail = email;
            req.session.password = password;
            let jobs = JobsModel.getAll();
            console.log("<---------------- Login Successful ------------------>");
            res.render("jobs", {jobs, userEmail: req.session.userEmail});
        } else {
            console.log("<---------------- Login Failed ------------------->");
            res.render("login", {errorMessage: "Failed"});
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                res.clearCookie("lastVisit");
                res.redirect("/login");
            }
        })
    }
}