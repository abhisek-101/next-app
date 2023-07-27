import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";



export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const salt = await bcrypt.genSalt(10)
    const hashedToken = await bcrypt.hash(userId.toString(), salt)

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "033ee0e9358ed7",
          pass: "59c74fefa87c0d",
        },
      });

      const mailOptions = {
        from : 'dev.abhiseklama@gmail.com',
        to: email,
        subject:emailType == 'VERIFY' ? "Verify your account" : "Reset your forgotten password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}" >here</a> to ${emailType=='VERIFY'?"verify your account":"reset your forgotten password"}</p>`

      }

      const mailResponse = transporter.sendMail(mailOptions)
      return mailResponse;
  } catch (error: any) {
    console.log("error sending in sending mail" + error)
  }
};
