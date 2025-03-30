import { Webhook } from "svix";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // Getting Data from request body
        const { data, type } = req.body

        // Switch Cases for differernt Events
        switch (type) {
            case 'user.created': {

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                // Send Email
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: email,
                    subject: "Welcome to Insider Jobs",
                    text: `Welcome to Insider Jobs. You are successfully register. Thank you for choosing our Website.
                                Your account has been created with email : ${email} `
                }
                await transporter.sendMail(mailOptions);
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                // Send Email
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: email,
                    subject: "Successfully Deleting Your Account",
                    text: `You are successfully Deleting Account. Thank you for choosing our Website.
                            Your account has been deletting with email : ${email} `
                }
                await transporter.sendMail(mailOptions);
                res.json({})
                break;
            }
            default:
                break;
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}