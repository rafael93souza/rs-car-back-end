const joi = require("joi");

const schemaRegisterAdmin = joi.object({
    nome: joi.string().required().trim().messages({
        'any.required': "O campo nome é obrigatótio",
        'string.empty': "O campo nome é obrigatótio"
    }),
    email: joi.string().email().required().trim().messages({
        'any.required': "O campo email é obrigatótio",
        'string.empty': "O campo email é obrigatótio",
        'string.email': "O email deve ser um email valido"
    }),
    senha: joi.string().min(6).required().trim().messages({
        'any.required': "O campo senha é obrigatótio",
        'string.empty': "O campo senha é obrigatótio",
        "string.min": "O campo senha deve conter no minimo 6 caracteres"
    })
});

const schemaLoginAdmin = joi.object({
    email: joi.string().email().required().trim().messages({
        'any.required': "O campo email é obrigatótio",
        'string.empty': "O campo email é obrigatótio",
        'string.email': "O email deve ser um email valido"
    }),
    senha: joi.string().required().trim().messages({
        'any.required': "O campo senha é obrigatótio",
        'string.empty': "O campo senha é obrigatótio"
    })
});
module.exports = { schemaRegisterAdmin, schemaLoginAdmin }