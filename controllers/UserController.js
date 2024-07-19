const UserModel = require("../models/user");

const cloudinary = require("cloudinary");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: "ddwlolvec",
  api_key: "453653465242666",
  api_secret: "ni1t4Fk16wpNT1y1Z5QVbq-7UYQ", // Click 'View Credentials' below to copy your API secret
});
class UserController {
  static userInsert = async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files.image);
      const { user, email, password, cpassword, phone, address } = req.body;

      const userr = await UserModel.findOne({ email: email });

      if (userr) {
        req.flash("error", "email already exists");
        res.redirect("/signin");
      } else {
        if (password == cpassword) {
          const file = req.files.image;
          const imageUpload = await cloudinary.uploader.upload(
            file.tempFilePath,
            { timeout: 120000 },
            {
              folder: "userimage",
            }
          );
          const hashPassword = await bcrypt.hash(password, 10);
          const result = new UserModel({
            name: user,
            email: email,
            password: hashPassword,
            phone: phone,
            address: address,
            image: {
              public_id: imageUpload.public_id,
              url: imageUpload.secure_url,
            },
          });

          //EMAIL VERIFICATION
          const userdata = await result.save();

          //console.log(userdata)
          if (userdata) {
            // const token = jwt.sign({ ID: userdata._id }, "jhbvcvghjhgcfcvhj");
            // console.log(token)
            // res.cookie("tokeb", token);
            this.sendVerifymail(user, email, userdata._id);

            req.flash(
              "success",
              "Registration has been successfull. Please verify your mail"
            );

            res.redirect("/login");
          } else {
            req.flash("error", "Not registered");
            res.redirect("/login");
          }

          //EMAIL VERIFICATION END

         
        } else {
          req.flash("error", "password does not match");
          res.redirect("/signin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifylogin = async (req, res) => {
    try {
      //  console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({email:email});
      // console.log(user)
      if (user!= null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          if (user.role == "admin") {
            let token = jwt.sign({ ID: user.id }, "kojihugvhijokjhvgjokkvv89");
            //console.log(token);

            res.cookie("token", token);
            res.redirect("/admin/dashboard");
          }

          if (user.role == "user" && user.is_verified && user.status == "approved") {
            let token = jwt.sign({ ID: user.id }, "kojihugvhijokjhvgjokkvv89");
            //console.log(token);

            res.cookie("token", token);
            res.redirect("/admin/dashboard");
          } else {
            req.flash("error", "Not Approved, Please wait");
            res.redirect("/login");
          }
        } else {
          req.flash("error", "Email or password isn't valid");
          res.redirect("/login");
        }
      } 
      else {
        req.flash("you are not a registered user");
        res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static display = async (req, res) => {
    try {
      const { name, image, role } = req.userdata;

      const users = await UserModel.find({ role: "user" });
      res.render("admin/user/display", {
        u: users,
        n: name,
        i: image,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static updateStatus = async (req, res) => {
    try {
      const { name, email, status } = req.body;
      const users = await UserModel.findByIdAndUpdate(req.params.id, {
        // status:req.body.status
        status: status,
      });
      this.sendEmail(name, email, status);

      res.redirect("/users");
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (name, email, status) => {
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "cdivyanshi2003@gmail.com",
        pass: "aopyoxshjrznjldi",
      },
    });

    let info = await transporter.sendMail({
      from: "test@gmail.com", //sender address
      to: email, //list of receivers
      subject: `Login ${status}`, //subject line
      text: "Hello", //plain text body
      html: `Hey ${name},<br> We wanted to inform you about the status of your login request for PenPalette has been ${status}.
      `, //html body
    });

    //console.log("Message sent: %s",info.messageId)
  };

  static sendVerifymail = async (name, email, user_id) => {
    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "cdivyanshi2003@gmail.com",
        pass: "aopyoxshjrznjldi",
      },
    });

    let info = await transporter.sendMail({
      from: "test@gmail.com", //sender address
      to: email, //list of receivers
      subject: "For Verification mail", //subject line
      text: "Hello", //plain text body
      html:
        "<p>Hii " +
        name +
        'Please click here to <a href="http://localhost:3000/verify?id=' +
        user_id +
        '">Verify </a> Your mail </p>.',
    });

    //console.log("Message sent: %s",info.messageId)
  };
}

module.exports = UserController;
