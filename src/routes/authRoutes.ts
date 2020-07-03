import express from 'express';
import {body} from "express-validator";
import {validateRequest} from "@jhaki/common";
import {AuthController} from "../controllers/authController";

const router = express.Router();

router.post('/banking/login', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], validateRequest, AuthController.login);

router.post('/banking/logout', AuthController.logout);


router.post('/banking/register', [
    body('fname')
        .not()
        .isEmpty()
        .withMessage('First name is required!'),
    body('lname')
        .not()
        .isEmpty()
        .withMessage('Last name is required!'),
    body('address')
        .not()
        .isEmpty()
        .withMessage('Home address is required!'),
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number is required!'),
    body('email')
        .isEmail()
        .withMessage('Enter a valid email'),
    body('password')
        .trim()
        .isLength({
            min: 4,
            max: 20
        })
        .withMessage("Password must be between 4 and 20 characters")
], validateRequest, AuthController.register);

export {router as AuthRouter};