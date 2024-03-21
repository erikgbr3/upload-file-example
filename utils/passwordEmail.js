const nodemailer = require("nodemailer");

exports.passwordEmail = async (name, email, token) => {
    try {

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER, // generated ethereal user
              pass: process.env.SMTP_PASSWORD, // generated ethereal password 
            },
          });

          let message = `Hola, ${name}<br>`;
          message += "Has solicitado restauración de  tu contraseña";
          message += `<a href="http://localhost:3000/recover-password/${token}">Haz clic aquí</a><br><br>`;
          message += "El enlace es valido por una hora.";

          let info = await transporter.sendMail({
            from: `Erik Gomez<${process.env.SMTP_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Recuepración de contraseña", // Subject line
            html: message, // html body
          });

          console.log("Message sent: %s", info.messageId);
          
          return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}