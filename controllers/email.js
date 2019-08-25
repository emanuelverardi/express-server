'use strict';


exports.send = (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'gallijessica329@gmail.com',
        from: 'noreply@veradi.me',
        subject: 'This 👻 is an email BOOOO',
        text: 'A nice email for my personal website',
        html: '<strong>I Love you my love Jessica 👻  my</strong><br>',
    };

    sgMail.send(msg);

    res.status(200).json({
        status: 'success'
    });
};