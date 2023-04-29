import nodemailer from 'nodemailer';

const SendMail = async(email, subject, message, link) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.Host,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: 'issabobobaldepro@gmail.com',
                pass: process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text : `${message}`,
            html: `<p><b>${message}</b></p></br><a href="${link}" target="_blank">Activer votre compte.</p>`
        })
        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}
export default SendMail;