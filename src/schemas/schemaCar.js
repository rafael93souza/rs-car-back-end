const joi = require("joi");

const schemaCar = joi.object({
    marca: joi.string().required().trim().messages({
        'any.required': "O marca do carro é obrigatótio",
        'string.empty': "O marca do carro é obrigatótio"
    }),
    modelo: joi.string().required().trim().messages({
        'any.required': "O modelo do carro é obrigatótio",
        'string.empty': "O modelo do carro é obrigatótio"
    }),
    ano: joi.string().min(4).max(4).required().trim().messages({
        'any.required': "O ano do carro é obrigatótio",
        'string.empty': "O ano do carro é obrigatótio",
        "string.min": "Informe o ano do carro corretamente",
        "string.max": "Informe o ano do carro corretamente",
        "string.base": "Informe o ano como uma string"
    }),
    placa: joi.string().required().max(8).trim().messages({
        'any.required': "A placa do carro é obrigatótio",
        'string.empty': "A placa do carro é obrigatótio",
        "string.max": "Informe a placa do carro corretamente"
    }),
    preco: joi.number().min(1).required().messages({
        'any.required': "O valor do carro é obrigatótio",
        'number.empty': "O valor do carro é obrigatótio",
        "number.base": "O valor deve ser um número válido",
        "number.min": "informe o valor do carro corretamente",
    }),
    cor: joi.string().required().trim().messages({
        'any.required': "A cor do carro é obrigatótio",
        'string.empty': "A cor do carro é obrigatótio",
    }),

});
module.exports = { schemaCar };