import mongoose from 'mongoose'
import {Account} from "../services/account";

//An interface that describes the properties to create a Transaction
export enum TRANSACTIONTYPE {
    CREDIT = 0,
    DEBIT = 1
}

export enum TRANSACTIONSTATUS {
    PENDING = 0,
    APPROVED = 1,
    DECLIENDED = 2
}

interface TransactionAttrs {
    userId: string
    amount: number
    type:number,
    status: number
}

// An interfaace that describe the properties that a Transaction model has

interface TransactionModel extends mongoose.Model<TransactionDoc> {
    build(attrs: TransactionAttrs): TransactionDoc;
}

//An interface that descibes the properties that a Transaction document has

interface TransactionDoc extends mongoose.Document {
    userId: string
    amount: number
    reference: string,
    type:number,
    status: number
}

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
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

TransactionSchema.pre('save', async function (done) {
    if (this.isModified('reference')) {
        const reference = await Account.getReference();
        this.set('reference', reference);
        done();
    }

})
TransactionSchema.statics.build = (attrs: TransactionAttrs) => {
    return new Transaction(attrs);
}

const Transaction = mongoose.model<TransactionDoc, TransactionModel>('Transaction', TransactionSchema);

export {Transaction};

