const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const User = require("../models/userModel")
const sendEmailVerification = require("../middlewares/sendEmailVerification")
const validator = require("validator")
const sendContact = require("../middlewares/sendContact")
const sendResetToken = require("../middlewares/sendResetToken")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return next("Please fill all the fields", 400)
    }
    const isUserExists = await User.findOne({ email })
    if (isUserExists) {
        return next(new ErrorHandler("User already exists", 400))
    }
    let newUser = new User({
        email,
        name,
        password
    })

    newUser = await newUser.save()

    if (newUser) {
        const getVerificationToken = await newUser.getVerificationToken()
        const verificationUrl = `${req.protocol}://${req.get("host")}/verify/email/${getVerificationToken}`

        const message = `Click on the link below to verify your email \n \n ${verificationUrl} \n \n if you not requested this email please ignore it`

        try {
            await sendEmailVerification({
                email: newUser.email,
                subject: "My Portfolio Email Verification",
                message
            })

        } catch (error) {
            newUser.emailVerificationToken = undefined
            newUser.emailVerificationTokenExpires = undefined
            newUser.save()
            return next(new ErrorHandler(error.message, 500))
        }
        return res.status(200).json({
            success: true,
            message: `An Email Sent to ${newUser.email}`
        })
    }
})

exports.accountVerification = catchAsyncErrors(async (req, res, next) => {
    const emailVerificationToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({ emailVerificationToken, emailVerificationTokenExpires: { $gt: Date.now() } })

    if (!user) {
        return next(new ErrorHandler("Verification Failed: Token is expired or has invalid", 401))
    }

    user.isVerified = true
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save()
    const token = await user.generateAuthToken()
    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Account Verified"
    })

})

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    const user = await User.findOne({ email })
    if (!user) {
        return next(new ErrorHandler("Invalid login details", 400))
    }

    const comparePass = await user.comparePassword(password)
    if (!comparePass) {
        return next(new ErrorHandler("Invalid login details", 400))
    }

    if (!user.isVerified) {
        const getVerificationToken = await user.getVerificationToken()
        const verificationUrl = `${req.protocol}://${req.get("host")}/verify/email/${getVerificationToken}`

        const message = `Click on the link below to verify your email \n \n ${verificationUrl} \n \n if you not requested this email please ignore it`

        try {
            await sendEmailVerification({
                email: user.email,
                subject: "My Portfolio Email Verification",
                message
            })
            return res.status(200).json({
                success: true,
                message: `An Email Sent to ${user.email}`
            })
        } catch (error) {
            user.emailVerificationToken = undefined
            user.emailVerificationTokenExpires = undefined
            user.save()
            return next(new ErrorHandler(error.message, 500))
        }

    } else {
        const token = await user.generateAuthToken()
        res.cookie("token", token, {
            expires: new Date(Date.now() + 90 * 60 * 60 * 1000),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "Logged In Successfully"
        })
    }
})

exports.logout = catchAsyncErrors((req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
})

exports.createProject = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    const { title, techStack, description, demoUrl, adminEmail, adminPassword, keyFeatures, github, thumbnail } = req.body;
    if (!title || !techStack || !description || !demoUrl || !keyFeatures || !thumbnail) {
        return next(new ErrorHandler("Please fill required fields", 400))
    }

    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "Personal Portfolio"
    })

    user.projects.unshift({
        title,
        techStack,
        description,
        demoUrl,
        github,
        keyFeatures,
        adminEmail,
        adminPassword,
        thumbnail: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })
    await user.save()
    res.status(200).json({
        success: true,
        message: "Project Created"
    })
})

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return next(new ErrorHandler("Project id is required", 400))
    }
    const user = await User.findById(req.user._id)

    const isProjectExists = user.projects.find((pro) => {
        return pro._id.toString() == id.toString()
    })

    if (!isProjectExists) {
        return next(new ErrorHandler(`Project is not found with this id: ${id}`, 404))
    }
    const projects = user.projects.filter((project) => project._id.toString() !== id.toString())

    user.projects = projects
    await user.save()

    res.status(200).json({
        success: true,
        message: "Project Deleted"
    })
})

exports.addSkill = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    if (!req.body.name || !req.body.image || !req.body.experience) {
        return next(new ErrorHandler("Please fill all the fields", 400))
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "Personal Portfolio"
    })

    user.skills.push({
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        },
        name: req.body.name,
        experience: req.body.experience
    })
    await user.save()
    res.status(200).json({
        success: true,
        message: "Skill Added"
    })
})

exports.getUserData = catchAsyncErrors(async (req, res, next) => {
    const data = await User.findOne().select("about projects skills")
    res.status(200).json({
        success: true,
        data
    })

})

exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return next(new ErrorHandler("Skill id is required", 400))
    }
    const user = await User.findById(req.user._id)

    const isSkillExists = user.skills.find((skill) => {
        return skill._id.toString() === id.toString()
    })

    if (!isSkillExists) {
        return next(new ErrorHandler(`Skill is not found with this id:${id}`, 404))
    }

    user.skills = user.skills.filter((skil) => {
        return skil._id.toString() !== id.toString()
    })

    await user.save()
    res.status(200).json({
        success: true,
        message: "Skill Deleted"
    })
})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    const { oldPassword, newPassword, confirmPassword } = req.body

    const isMatch = await user.comparePassword(oldPassword)

    if (!isMatch) {
        return next(new ErrorHandler("Your old password is incorrect", 400))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New password and confirm password are not matching", 400))
    }

    user.password = oldPassword
    // await user.save()

    res.status(200).json({
        success: true,
        message: "Password Updated"
    })

})



exports.createContact = catchAsyncErrors(async (req, res, next) => {
    const { name, email, msg } = req.body;
    if (!name || !email || !msg) {
        return next(new ErrorHandler("Please fill all the fields", 400))
    }

    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Email is not valid", 400))
    }

    const message = `You got a message from your portfolio\n \nEmail: ${email}\nName: ${name}\nMessage: ${msg}`

    try {
        await sendContact({
            subject: "Message From My Portfolio",
            email,
            message
        })
        res.status(200).json({
            success: true,
            message: "Contact Sent"
        })
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
})

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    if (!email) {
        return next(new ErrorHandler("Please enter your email", 400))
    }
    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("User doesn't exists", 404))
    }

    const resetToken = await user.generateResetPasswordToken()

    const resetUrl = `${req.protocol}://${req.get("host")}/reset/${resetToken}`

    const message = `Click on the link below to reset your password \n \n ${resetUrl} \n \n if you not requested this email please ignore it`

    try {
        await sendResetToken({
            subject: "My Portfolio Reset Password",
            email: user.email,
            message
        })
        res.status(200).json({
            success: true,
            message: `An email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpires = undefined;
        await user.save()
        return next(new ErrorHandler(error.message, 500))
    }
})

exports.updatePersonalDetails = catchAsyncErrors(async (req, res, next) => {
    const { name, email, avatar, title } = req.body

    const user = await User.findById(req.user._id)

    if (!name || !email || !avatar || !title) {
        return next(new ErrorHandler("Please fill all the fields", 400))
    }

    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Email is invalid", 400))
    }

    user.name = name
    user.about.name = name
    user.about.title = title


    const newCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "Personal Portfolio"
    })

    if (user.about.avatar.url && user.about.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id)
    }


    user.about.avatar = {
        public_id: newCloud.public_id,
        url: newCloud.secure_url
    }

    await user.save()

    if (email !== user.email) {

        const updateEmailToken = await user.generateUpdateEmailToken()
        const updateEmailUrl = `${req.protocol}://${req.get("host")}/update/${updateEmailToken}?email=${email}`

        const message = `Click on the link below to update your email \n \n ${updateEmailUrl} \n \n If you not requested this email please ignore it`

        try {
            await sendEmailVerification({
                subject: `My Portfolio: Update Email Request From ${user.email} to ${email}`,
                email,
                message
            })
            return res.status(200).json({
                success: true,
                message: `An email sent to ${email}`
            })
        } catch (error) {
            user.updateEmailToken = undefined;
            user.updateEmailTokenExpires = undefined;
            await user.save()
            return next(new ErrorHandler(error.message, 500))
        }
    } else {
        res.status(200).json({
            success: true,
            message: "Profile Updated"
        })
    }

})

exports.updateEmailRequest = catchAsyncErrors(async (req, res, next) => {
    const updateEmailToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({ updateEmailToken, updateEmailTokenExpires: { $gt: Date.now() } })

    if (!user) {
        return next(new ErrorHandler("Token is expired or has invalid", 400))
    }

    user.email = req.query.email
    user.updateEmailToken = undefined;
    user.updateEmailTokenExpires = undefined;
    await user.save()

    res.status(200).json({
        success: true,
        message: "Email Updated Successfully"
    })
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({ resetPasswordToken, resetPasswordTokenExpires: { $gt: Date.now() } })

    if (!user) {
        return next(new ErrorHandler("Token is expired or has invalid", 401))
    }

    if (!req.body.newPassword || !req.body.confirmPassword) {
        return next(new ErrorHandler("Please enter new password and confirm password", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("New password and confirm password is not matching", 400))
    }

    user.password = req.body.newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpires = undefined
    await user.save()
    const token = await user.generateAuthToken()

    res.cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Password Updated"
    })
})