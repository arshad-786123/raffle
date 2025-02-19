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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false },
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    username: { type: String },
    email: {
        type: String,
        validate: {
            validator: validator_1.default.isEmail,
            message: 'EMAIL_IS_NOT_VALID',
        },
        lowercase: true,
    },
    picture: { type: String },
    kyc_status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
    password: { type: String },
    provider: { type: String },
    loginType: { type: String },
    google_id: { type: String },
    facebook_id: { type: String },
    profile_picture: { type: String },
    twofa: { type: String, enum: ['google', 'email', 'mobile', null], default: null },
    role: { type: String, enum: ['Business', 'Customer', 'Admin'], default: 'Business' },
    verification: { type: String },
    verified: { type: Boolean, default: false },
    dialCode: { type: Object },
    phone: { type: String },
    landline: {
        type: String,
        validate: {
            validator: function (value) {
                const phoneRegex = /^[0-9]{6,14}$/; // Example regex for landline numbers
                return phoneRegex.test(value);
            },
            message: 'LANDLINE_IS_NOT_VALID',
        },
        required: false,
    },
    city: { type: String },
    country: { type: String },
    region: { type: String },
    isActive: { type: Boolean },
    isSuspended: { type: Boolean, default: false },
    isKYCVerified: { type: Boolean },
    referralCode: { type: String, required: false },
    urlTwitter: {
        type: String,
        validate: {
            validator(v) {
                return v === '' ? true : validator_1.default.isURL(v);
            },
            message: 'NOT_A_VALID_URL',
        },
        lowercase: true,
    },
    urlGitHub: {
        type: String,
        validate: {
            validator(v) {
                return v === '' ? true : validator_1.default.isURL(v);
            },
            message: 'NOT_A_VALID_URL',
        },
        lowercase: true,
    },
    loginAttempts: { type: Number, default: 0 },
    businessName: { type: String, default: "" },
    businessAddress: { type: String, default: "" },
    postcode: { type: String, default: "" },
    businessEmailNote: { type: String, default: "" },
    businessEmailVerify: { type: String, default: "" },
    isFAQRead: { type: Boolean, default: false },
    description: { type: String, default: "" },
    VATNumber: { type: String, default: "" },
    companyNumber: { type: String, default: "" },
    image: { type: String, default: "" },
    websites: { type: String },
    companyName: { type: String },
    address: { type: String, default: "" },
    googleId: { type: String, unique: true, sparse: true },
    wallet: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserWallet"
    },
    blockExpires: { type: Date, default: Date.now, select: false },
    coupon: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: false
    },
    customerID: {
        type: String
    },
    opted: {
        type: Boolean,
        //required: true,
        default: false
    }
}, { versionKey: false, timestamps: true });
const hash = (user, salt, next) => {
    bcrypt_1.default.hash(user.password, salt, (error, newHash) => {
        if (error) {
            return next(error);
        }
        user.password = newHash;
        return next();
    });
};
const genSalt = (user, SALT_FACTOR, next) => {
    bcrypt_1.default.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        return hash(user, salt, next);
    });
};
UserSchema.pre('save', function (next) {
    const that = this;
    const SALT_FACTOR = 5;
    if (!that.isModified('password')) {
        return next();
    }
    return genSalt(that, SALT_FACTOR, next);
});
UserSchema.pre('updateOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (!update)
            return next();
        let password;
        // Check if password is being updated directly
        if (update.password && typeof update.password === 'string') {
            password = update.password;
        }
        // Check if password is being updated via $set
        if (update.$set && update.$set.password && typeof update.$set.password === 'string') {
            password = update.$set.password;
        }
        if (password) {
            try {
                const SALT_FACTOR = 10;
                const salt = yield bcrypt_1.default.genSalt(SALT_FACTOR);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                // Update the password in the update object
                if (update.password && typeof update.password === 'string') {
                    update.password = hashedPassword;
                }
                if (update.$set && update.$set.password && typeof update.$set.password === 'string') {
                    update.$set.password = hashedPassword;
                }
                // Set the updated update object back to the query
                this.setUpdate(update);
            }
            catch (error) {
                return next(error);
            }
        }
        next();
    });
});
UserSchema.methods.comparePassword = function (passwordAttempt, cb) {
    bcrypt_1.default.compare(passwordAttempt, this.password, (err, isMatch) => (err ? cb(err, isMatch) : cb(null, isMatch)));
};
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
