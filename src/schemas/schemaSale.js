const joi = require("joi");

const schemaSale = joi.object({
    vendedor_id: joi.number().required().messages({
        'any.required': "O código do vendedor é obrigatótio",
        'number.empty': "O código do vendedor é obrigatótio",
        "number.base": "O código do vendedor deve ser um número válido",
    }),
    carro_id: joi.number().required().messages({
        'any.required': "O código do carro é obrigatótio",
        'number.empty': "O código do carro é obrigatótio",
        "number.base": "O código do carro deve ser um número válido",
    }),
    valor: joi.number().min(1).required().messages({
        'any.required': "O valor do carro é obrigatótio",
        'number.empty': "O valor do carro é obrigatótio",
        "number.base": "O valor deve ser um número válido",
        "number.min": "informe o valor do carro corretamente",
    }),
    data: joi.string().required().trim().messages({
        'any.required': "A data é obrigatótio",
        'string.empty': "A data é obrigatótio",
    }),

});
module.exports = { schemaSale };