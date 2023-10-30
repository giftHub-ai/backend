const express = require('express')
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const viewPath = path.resolve(__dirname, './templates/views/');
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./templates/views/"))

exports.sendMail = (t,Name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gamotkn@rknec.edu',
            pass: 'upjpfhtvcqgjrhbv'
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            // partialsDir: viewPath,
            layoutsDir: viewPath,
            defaultLayout: false,

            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))

    var mailOptions = {
        from: 'gamotkn@rknec.edu',
        to: t,
        subject: 'Gift Recieve !!',
        template: 'ReturnedEmail',
        context: {
            name: Name
        }

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
exports.ReceveEmail = (t, Name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gamotkn@rknec.edu',
            pass: 'upjpfhtvcqgjrhbv'
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            // partialsDir: viewPath,
            layoutsDir: viewPath,
            defaultLayout: false,

            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))

    var mailOptions = {
        from: 'gamotkn@rknec.edu',
        to: t,
        subject: 'Gift Recieve !!',
        template: 'RecieveEmailTemplate',
        context: {
            name: Name
        }

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

exports.ReturnedEmail = (t, Name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gamotkn@rknec.edu',
            pass: 'upjpfhtvcqgjrhbv'
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            // partialsDir: viewPath,
            layoutsDir: viewPath,
            defaultLayout: false,

            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))

    var mailOptions = {
        from: 'gamotkn@rknec.edu',
        to: t,
        subject: 'Gift Returned !!',
        template: 'RecieveEmailTemplate',
        context: {
            name: Name
        }

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
exports.AcceptedEmail = (t, Name) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gamotkn@rknec.edu',
            pass: 'upjpfhtvcqgjrhbv'
        }
    });
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            // partialsDir: viewPath,
            layoutsDir: viewPath,
            defaultLayout: false,

            express
        },
        viewPath: viewPath,
        extName: '.handlebars',
    }))

    var mailOptions = {
        from: 'gamotkn@rknec.edu',
        to: t,
        subject: 'Gift Accepted!!',
        template: 'RecieveEmailTemplate',
        context: {
            name: Name
        }

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
