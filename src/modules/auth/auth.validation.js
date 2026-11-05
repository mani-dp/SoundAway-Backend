import { body, validationResult } from "express-validator";
import { AUTH_CONSTANTS } from "./auth.constants.js";

export const validateRegister = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required.")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters.")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores."),

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .bail()
        .isLength({
            min: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH,
            max: AUTH_CONSTANTS.PASSWORD_MAX_LENGTH,
        })
        .withMessage(
            `Password must be between ${AUTH_CONSTANTS.PASSWORD_MIN_LENGTH} and ${AUTH_CONSTANTS.PASSWORD_MAX_LENGTH} characters.`
        ),

    body("confirmPassword")
        .notEmpty()
        .withMessage("Password confirmation is required.")
        .bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match."),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg,
                })),
            });
        }

        next();
    },
];