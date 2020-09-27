import Joi, { ObjectSchema, Schema } from '@hapi/joi';

export class LoginSchema {
    public login(): ObjectSchema<Schema> {
        return Joi.object({
            password: Joi.string().min(4).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] }}).required(),
        });
    }
}