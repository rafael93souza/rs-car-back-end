const joi = require("joi");

const schemaRegisterSeller = joi.object({
    nome: joi.string().required().trim().messages({
        'any.required': "O campo nome é obrigatótio",
        'string.empty': "O campo nome é obrigatótio"
    }),
    email: joi.string().email().required().trim().messages({
        'any.required': "O campo email é obrigatótio",
        'string.empty': "O campo email é obrigatótio",
        'string.email': "O email deve ser um email valido"
    }),
    cpf: joi.string().min(11).max(11).required().trim().messages({
        'any.required': "O campo cpf é obrigatótio",
        'string.empty': "O campo cpf é obrigatótio",
        "string.min": "O campo cpf deve conter 11 dígitos",
        "string.max": "O campo cpf deve conter 11 dígitos"
    })
});
module.exports = { schemaRegisterSeller };