"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailToOwner = exports.sendMailToWinners = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const nodemailer_sendgrid_1 = __importDefault(require("nodemailer-sendgrid"));
const user_1 = __importDefault(require("../../models/user"));
const raffle_1 = __importDefault(require("../../models/raffle"));
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com', // Your SMTP server host
//   port: 587, // SMTP port (e.g., 587 for TLS, 465 for SSL)
//   secure: false, // Set to true if you use SSL
//   auth: {
//     user: 'tech.crescentek@gmail.com', // Your email address
//     pass: 'pnmjshpswvlciqzh', // Your email password or app-specific password
//   },
// });
const transporter = nodemailer_1.default.createTransport((0, nodemailer_sendgrid_1.default)({
    apiKey: "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"
}));
const sendMailToWinners = (userDetails_1, ...args_1) => __awaiter(void 0, [userDetails_1, ...args_1], void 0, function* (userDetails, prize = {}, price_name = "") {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield user_1.default.findById({ _id: userDetails.userID });
            const raffleData = yield raffle_1.default.findById({ _id: userDetails.raffleID });
            const firstname = userData.firstname;
            const lastname = userData.lastname;
            const data = { firstname, lastname, purchaseData: userDetails, prize: prize, prize_name: price_name, raffleData };
            const ejsTemplatePath = path_1.default.join(__dirname, '../../../views', 'winner.ejs');
            const renderedHtml = yield ejs_1.default.renderFile(ejsTemplatePath, { data, headerImage: `https://raffily.com/services/main_logo.png` });
            const mailOptions = {
                from: `noreply@raffily.co.uk <noreply@raffily.co.uk>`,
                // to: `${data.user.name} <${data.user.email}>`,
                to: 
                //  userDetails.role === "Business"
                false ? `${userDetails.businessEmailVerify} <${userDetails.businessEmailVerify}>` : `${userDetails.email} <${userData.email}>`,
                subject: `${firstname}, You Are a Raffle Winner!`,
                // html: data.htmlMessage
                html: renderedHtml,
            };
            const info = yield transporter.sendMail(mailOptions);
            console.log(info);
            resolve(info);
        }
        catch (error) {
            console.log(error.message);
        }
    }));
});
exports.sendMailToWinners = sendMailToWinners;
const sendMailToOwner = (raffleId, winnerDetails, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Fetch the raffle data
            const raffleData = yield raffle_1.default.findById(raffleId);
            if (!raffleData) {
                return reject(new Error("Raffle not found"));
            }
            const userData = yield user_1.default.findById({ _id: userDetails.userID });
            // Fetch the owner's details
            const ownerDetails = yield user_1.default.findById(raffleData.owner);
            if (!ownerDetails) {
                return reject(new Error("Owner not found"));
            }
            const { raffle_name: raffleName } = raffleData;
            const { ticketID: winningTicketNumber, prizeName } = winnerDetails;
            // const firstname = ownerDetails.firstname
            // const raffleName = raffleData.raffle_name
            // const winnerName = winnerDetails.firstname
            // const winningTicketNumber = winnerDetails.ticketID
            // const prizeName = winnerDetails.prizeName
            const data = { firstname: userData.firstname, businessName: ownerDetails.businessName, raffleName, winningTicketNumber, prizeName };
            // Prepare dynamic data for the email
            // const data = {
            //   firstname: ownerDetails.firstname,
            //   raffleName: raffleData.raffle_name, // Adjust this based on your Raffle model
            //   winnerName: winnerDetails.firstname, // Assuming winnerDetails has a firstname property
            //   winningTicketNumber: winnerDetails.ticketID, // Assuming winnerDetails has a ticketID property
            //   prizeName: winnerDetails.prizeName // Adjust this based on how you store prize information
            // };
            // Render the EJS template
            const ejsTemplatePath = path_1.default.join(__dirname, '../../../views', 'ownerWinner.ejs'); // Update the path as needed
            const renderedHtml = yield ejs_1.default.renderFile(ejsTemplatePath, { data });
            // Setup mail options
            const mailOptions = {
                from: `noreply@raffily.co.uk <noreply@raffily.co.uk>`,
                to: `${ownerDetails.email} <${ownerDetails.email}>`, // Assuming the User model has an email property
                // Update the subject to include the owner's firstname
                subject: `${ownerDetails.businessName}, Your Raffle Has Ended – We Have a Winner!`,
                html: renderedHtml,
            };
            // Send the email
            const info = yield transporter.sendMail(mailOptions);
            console.log("Owner notification email sent successfully:", info);
            resolve(info);
        }
        catch (error) {
            console.error('Error sending owner email:', error);
            reject(error);
        }
    }));
});
exports.sendMailToOwner = sendMailToOwner;
