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
        template: 'SendEmail',
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