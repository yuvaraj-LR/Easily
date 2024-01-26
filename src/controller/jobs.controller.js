import JobsModel from "../model/jobs.model.js";
import ApplyJob from "../model/applyJob.model.js";

export default class JobsController {
    // Launch the jobs page 
    displayJobsPage(req, res) {
        let jobs = JobsModel.getAll()
        res.render("jobs", {jobs, userEmail: req.session.userEmail});
    }

    // Launch the specific job page
    displaySpecificJobPage(req, res) {

        const id = req.params.job_id;
        const job = JobsModel.getJobByQueryParam(id);
        console.log(job, "Job Found...");

        if(job) {
            return res.render("view-job", {job, userEmail: req.session.userEmail})
        } else {
            return res.status(401).send("Product Not Found!!!");
        }
    }

    // apply for a job.
    applyJob(req, res) {
        const id = req.params.job_id;
        const job = JobsModel.getJobByQueryParam(id);
        console.log(job, "job's data");

        const {name, email, phNo} = req.body;
        const resumePath = "/resume/" + req.file.filename;

        const companyName = job.company_name;
        const position = job.position;

        ApplyJob.applyForAJob(name, email, companyName, position, phNo, resumePath);

        var jobs = JobsModel.getAll();
        res.render("jobs", {jobs});
    }

    // Delete a job 
    deleteJob(req, res) {
        const id = req.params.job_id;
        JobsModel.deleteJob(id);
        console.log(id, "th job has been deleted successfully....");

        var jobs = JobsModel.getAll();
        res.render("jobs", {jobs, userEmail: req.session.userEmail});
    }

    // Updaete a job form 
    updateJobPPage(req, res) {
        const id = req.params.job_id;
        const job = JobsModel.getJobByQueryParam(id);
        console.log(job, "Job Found...");

        res.render("update-job", {job, userEmail: req.session.userEmail})
    }

    // Update the job
    updateJob(req, res) {
        const id = req.params.job_id;
        const job = JobsModel.getJobByQueryParam(id);
        console.log(job, "Job Found...");

        const {company_name, position, location, salary_from, salary_to} = req.body;

        JobsModel.updateJob(id, company_name, position, location, salary_from, salary_to);

        const jobs = JobsModel.getAll();
        res.render("jobs", {jobs, userEmail: req.session.userEmail});
    }

    // Add Job Page
    addJobPage(req,res) {
        res.render("add-job", {userEmail: req.session.userEmail});
    }

    // Add a Job
    addJob(req, res) {
        const {company_name, position, location, salary_from, salary_to} = req.body;
        JobsModel.addJob(company_name, position, location, salary_from, salary_to);

        const jobs = JobsModel.getAll();
        res.render("jobs", {jobs, userEmail: req.session.userEmail});
    }

    // Show applicant table
    applicantsList(req, res) {
        let jobApplicants = ApplyJob.getJobSeekerDetails();
        res.render("applicants", {jobApplicants});
    }
}