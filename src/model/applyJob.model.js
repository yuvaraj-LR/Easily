import nodemailer from "nodemailer";

export default class ApplyJob {

    constructor(index, name, email, companyName, position, phoneNo, resume) {
        this.index = index;
        this.name = name;
        this.email = email;
        this.companyName = companyName;
        this.position = position;
        this.phoneNo = phoneNo;
        this.resume = resume;
    }

    static getJobSeekerDetails() {
        return jobSeekersDetails;
    }

    static applyForAJob(name, email, companyName, position, phoneNo, resume) {
        let index = jobSeekersDetails.length + 1;
        console.log(index);
        let applicant = new ApplyJob(index, name, email, companyName, position, phoneNo, resume);

        jobSeekersDetails.push(applicant);
        sendMail(name, email);

        console.log(jobSeekersDetails, "Job Seeker Array");
    }
}

// Sending mail to client
async function sendMail(name, email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "easilydev17@gmail.com",
            pass: "thow vtoj chzy xwwy"
        }
    });

    const mailOptions = {
        from: "yuvarajrama121@gmail.com",
        to: email,
        subject: "Application Recieved",
        text: "Thank you, " + name + ". We have received your application. We will get back to you as soon as possible."
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfullly.");

    } catch (error) {
        console.log("Email was not sent.", error);
    }
    return;
}

var jobSeekersDetails = [
    new ApplyJob(1, "yuvaraj", "yuvarajrama121@gmail.com", "CN", "TA - Frontend", "987334221", "/resume/1706252513812-YuvarajLR's.pdf"),
    new ApplyJob(2, "demo", "demo@demo.com", "Google", "Senior Manager", "97345124243", "/resume/1706250792095-YuvarajLR's.pdf"),
];
