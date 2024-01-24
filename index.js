// Importing the express module.
import express from "express";
import HomeController from "./src/controller/home.controller.js";
import JobsController from "./src/controller/jobs.controller.js";
import UserController from "./src/controller/user.controller.js";
import { uploadFile } from "./src/middleware/fileUploading.middleware.js";
import { auth } from "./src/middleware/auth.middleware.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

// Creating server.
const app = express();

const homeController = new HomeController();
const jobController = new JobsController();
const userController = new UserController();

// Using ejs layout
app.use(ejsLayouts);

//Set this public folder as public
app.use(express.static("./public")); 

// Excat the file location in correct way.
app.use(express.urlencoded({ extended: true }));

// Setup the engines
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Setup the session
app.use(session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

// Add cookiee Parser
app.use(cookieParser());

// <--------------------------  Creating routers ------------------------------->
// display home page.
app.get("/", homeController.displayHomePage);

// Display job list page. 
app.get("/jobs", jobController.displayJobsPage);

// Display register page.
app.get("/register", homeController.displayRegisterPage);

// Add a user by register page. 
app.post("/registerUser", userController.addNewUser);

// Display login page. 
app.get("/login", homeController.displayLoginPage);

// Check for the User Login 
app.post("/loginUser", userController.loginUser);

// Logout Function.
app.get("/logout", userController.logout);

// Dispaly view product page.
app.get("/view-job/:job_id", jobController.displaySpecificJobPage);

// Apply for a Job.
app.post("/apply-job", uploadFile.single("resume"), jobController.applyJob);

// Delete a Job. 
app.post("/delete-job/:job_id", jobController.deleteJob);

// Update page
app.get("/views/update-job/:job_id", jobController.updateJobPPage);

// Update a job
app.post("/views/update-job/:job_id", jobController.updateJob)

// Add Job Page
app.get("/add-job", jobController.addJobPage);

// Add a Job
app.post("/add-job", jobController.addJob);

// Add server listener.
app.listen(3000, ()=> {
    console.log("Server is listen on 3000.");
});
