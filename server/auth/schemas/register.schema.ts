import Joi, { ObjectSchema, Schema } from "@hapi/joi";

export class RegisterSchema {
  public register(): ObjectSchema<Schema> {
    return Joi.object({
      image: Joi.string(),
      name: Joi.string().min(3).required(),
      repeat_password: Joi.ref('password'),
      password: Joi.string().min(4).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] }}).required(),
    });
  }
}
