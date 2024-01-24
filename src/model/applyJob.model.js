export default class ApplyJob {

    constructor(index, name, email, phoneNo, resume) {
        this.index = index;
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.resume = resume;
    }

    static applyForAJob(name, email, phoneNo, resume) {
        let index = jobSeekersDetails.length + 1;
        console.log(index);
        let applicant = new ApplyJob(index, name, email, phoneNo, resume)

        jobSeekersDetails.push(applicant);

        console.log(jobSeekersDetails, "Job Seeker Array");
    }
}

var jobSeekersDetails = [];
