const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
async function handleNewMail(req, res){
    const { name, email, message } = req.body;

    try {
        // Save to DB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send email
        let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});

await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL, // or use a different recipient
    subject: `New Portfolio Message from ${name}`,
    html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
});

        res.status(200).json({ message: 'Message sent and saved successfully!' });
    } catch (err) {
         console.error("❌ Email error:", err);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

router.get('/', (req, res) => res.send('Contact endpoint is live!'));

module.exports ={
    handleNewMail
}
