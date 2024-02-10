import Joi from "joi"

const validationSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    place: Joi.string().trim().required(),
    batch: Joi.string().trim().required(),
    domain: Joi.string().trim().required(),
    phone: Joi.number().required()
});
