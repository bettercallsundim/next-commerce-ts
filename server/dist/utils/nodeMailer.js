"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "abc@gmail.com",
        pass: "abc",
    },
});
async function sendMail({ from, to, subject, text, html, }) {
    // send mail with defined transport object
    await transporter
        .sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    })
        .then((info) => {
        console.log("Message sent: %s", info.messageId);
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.sendMail = sendMail;
