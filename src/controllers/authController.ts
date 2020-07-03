import {Request, Response} from "express";
import jwt from 'jsonwebtoken'
import {User} from "../models/user";
import {BadRequestError} from "@jhaki/common";
import {Password} from "../services/password";

export class AuthController {

    static async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            throw new BadRequestError('Invalid credential!');
        }

        const passMatch = await Password.compare(user.password, password);

        if (!passMatch) {
            throw new BadRequestError('Invalid credential!');
        }
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJWT
        };

        res.status(200).send(user);
    }

    static async logout(req: Request, res: Response) {
        req.session = null;
        res.send({});
    }

    static async register(req: Request, res: Response) {
        const {fname, lname, address, phone, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new BadRequestError('Email in use')
        }

        const user = User.build({ email, password, fname, lname, address, phone,});
        await user.save();

        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJWT
        };

        res.status(201).send(user);
    }
}

