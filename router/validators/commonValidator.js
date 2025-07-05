const { body } = require("express-validator");

const commonFieldsValidation = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),

    body("tag")
        .notEmpty().withMessage("Tag is required"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 10 }).withMessage("Description must be at least 10 characters")
];

module.exports = { commonFieldsValidation }