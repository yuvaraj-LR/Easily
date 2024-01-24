export default class JobsModel {
    constructor(job_id, company_name, position, location, salary_from, salary_to, skills) {
        this.job_id = job_id;
        this.company_name = company_name;
        this.position = position;
        this.location = location;
        this.salary_from = salary_from;
        this.salary_to = salary_to;
        this.skills = skills;
    }

    static getAll() {
        return jobs;
    }

    static getJobByQueryParam(id) {
        return jobs.find(job => job.job_id == id);
    }

    static deleteJob(id) {
        let jobId = jobs.find(job => job.job_id == id).job_id;
        jobs.splice(jobId, 1);
        return jobs;
    }

    static updateJob(id, company_name, position, location, salary_from, salary_to) {
        let job = jobs.find(job => job.job_id == id);

        job.company_name = company_name;
        job.position = position;
        job.location = location;
        job.salary_from = salary_from;
        job.salary_to = salary_to;

        console.log("<----- Update Successfully ---------->");
    }

    static addJob(company_name, position, location, salary_from, salary_to) {
        let id = jobs.length + 1;

        const newJob = new JobsModel(id, company_name, position, location, salary_from, salary_to, ["HTML", "CSS", "Javascript", "React Js", "Java", "DSA", "Github"]);

        jobs.push(newJob);
        console.log("<----- Added Successfully ---------->");
    }
}

var jobs = [
    new JobsModel(1, "Coding Ninjas", "TA - Frontend", "Bangalore, India", 10, 12, ["HTML", "CSS", "Javascript", "React Js", "Java", "DSA", "Github"]),

    new JobsModel(2, "Google", "Senior Manager", "Bangalore, India", 20, 25, ["Leadership", "Team Work", "Communicator", "MS Office", "Time Management", "Windows"]),

    new JobsModel(3, "Apple", "Software Engineer", "Delhi, India", 18, 55, ["Svelte", "Node JS", "Express", "MangoDB", "SQL", "Linux", "Python"]),
];

