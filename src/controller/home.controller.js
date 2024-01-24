export default class HomeController {
    // Launch the home page 
    displayHomePage(req, res) {
        res.render("home");
    }

    // Lanuch the register page
    displayRegisterPage(req, res) {
        res.render("register");
    }

    // Launch the login page
    displayLoginPage(req, res) {
        res.render("login", {errorMessage: null});
    }
}