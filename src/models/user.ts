import mongoose from 'mongoose'
import {Password} from "../services/password";
import {Account} from "../services/account";

//An interface that describes the properties to create a user

interface UserAttrs {
    email: string,
    password: string,
    fname: string,
    lname: string,
    address: string,
    phone: string
}

// An interfaace that describe the properties that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that descibes the properties that a user document has

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    fname: string,
    lname: string,
    address: string,
    phone: string
    account: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));

        this.set('password', hashed);

    }

    if (this.isModified('account')) {
        const account = await Account.getAccount();
        this.set('account', account);
        done();
    }

})
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};

