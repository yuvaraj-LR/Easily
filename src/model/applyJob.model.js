import nodemailer from "nodemailer";

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
        sendMail(name, email);

        console.log(jobSeekersDetails, "Job Seeker Array");
    }
}

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

var jobSeekersDetails = [];
