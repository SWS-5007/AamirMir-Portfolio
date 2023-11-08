const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [4, "Name must be greater than 4 characters"],
        maxLength: [30, "Name must be less than 30 characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"],
        validate: [validator.isEmail, "Your email is invalid"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "Password must be greater than 8 characters"]
    },
    projects: [
        {
            thumbnail: {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                }
            },
            adminEmail: {
                type: String
            },
            adminPassword: {
                type: String
            },
            title: {
                type: String,
            },
            keyFeatures: {
                type: String,
            },
            techStack: {
                type: String,
            },
            description: {
                type: String,
            },
            github: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            demoUrl: {
                type: String,
            }
        }
    ],
    about: {
        avatar: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        },
        name: {
            type: String,
        },
        title: {
            type: String,
        }
    },
    skills: [
        {
            image: {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                }
            },
            name: {
                type: String,
            },
            experience: {
                type: Number,
                validate: (value)=>{
                   if(value > 100){
                    return new Error("Experience must be less than 100")
                   }
                }
            }
        }
    ],
    emailVerificationToken: String,
    emailVerificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    updateEmailToken: String,
    updateEmailTokenExpires: Date
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAuthToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

userSchema.methods.getVerificationToken = async function () {
    const verificationToken = crypto.randomBytes(20).toString("hex")

    this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex")

    this.emailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000
    await this.save()
    return verificationToken
}
userSchema.methods.generateResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordTokenExpires = Date.now() + 3 * 60 * 60 * 1000
    await this.save()
    return resetToken;
}
userSchema.methods.generateUpdateEmailToken = async function () {
    const updateToken = crypto.randomBytes(20).toString("hex")
    this.updateEmailToken = crypto.createHash("sha256").update(updateToken).digest("hex")
    this.updateEmailTokenExpires = Date.now() + 3 * 60 * 60 * 1000
    await this.save()
    return updateToken;
}

module.exports = mongoose.model("User", userSchema)