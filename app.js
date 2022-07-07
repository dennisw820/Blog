// Resources
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config;

const app = express();
// Don't forget to set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


// Dummy Text
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = 'Leave a message, we want to hear from you!';
const postContent = 'To get started, fill out the form to create a new post.';

// Home
app.get('/', (req, res) => {
    // Dont forget to use render method with ejs 
    res.render('home', {startingContent: homeStartingContent});
});

// About
app.get('/about', (req, res) => {
    // Dont forget to use render method with ejs 
    res.render('about', {aboutContent: aboutContent});
});

// Contact
app.get('/contact', (req, res) => {
    // Dont forget to use render method with ejs 
    res.render('contact', {contactContent: contactContent});
});
app.post('/contact', (req, res) => {
    let message = {
        fName: req.body.fName,
        lName: req.body.lName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        subject: req.body.subject,
        message : req.body.message
    }

    "use strict";
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: message.email, // sender address
        to: 'dennisw820@icloud.com', // list of receivers
        subject: message.subject, // Subject line
        text: message.message, // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

    res.redirect('/contact');
});

// Post Array
let posts = [];

// Create Post
app.get('/createpost', (req, res) => {
    res.render('createpost', {postContent:postContent});
}); 
app.post('/post', (req, res) => {
    let newPost = {
        imgUpload: req.body.imgUpload,
        title: req.body.title,
        content: req.body.content
    }
    console.log(newPost);
    posts.push(newPost);
    res.redirect('/post');
});

// Post (Search)
app.get('/post', (req, res) => {
    res.render('posts', {posts:posts});
});
app.post('/search', (req, res) => {
    // Some function to receive input from search and return search results
    let query = req.body.query;
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    // Sanitize input
    let userCredentials = {
        userName: req.body.userName,
        password: req.body.password
    }

    console.log(userCredentials);
    // Authenticate USer Credentials
    if(userName === req.body.userName && password === req.body.password) {
        res.redirect('/post');
    }
});

// Signup
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.post('/signup', (req, res) => {
    let newUser = {
        fName: req.body.fName,
        lName: req.body.lName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    console.log(newUser);

    res.redirect('/login');
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}.`);
});