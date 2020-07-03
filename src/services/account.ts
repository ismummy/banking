import {randomBytes, scrypt} from 'crypto';
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export class Account {
    static async getAccount() {
        return randomBytes(8).toString('hex');
    }

    static async getReference() {
        return randomBytes(8).toString('hex');
    }
}