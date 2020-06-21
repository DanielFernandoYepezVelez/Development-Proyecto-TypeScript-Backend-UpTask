import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class HapiJoi {
  validateUser(): ObjectSchema<Schema> {
    const schemaUser: ObjectSchema<Schema> = Joi.object({
      name: Joi.string().required().trim(),

      password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      repeat_password: Joi.ref('password'),

      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        }),
    });

    return schemaUser;
  }

  validateProject(): ObjectSchema<Schema> {
    const schemaProject: ObjectSchema<Schema> = Joi.object({
      name: Joi.string().required().trim(),
    });

    return schemaProject;
  }

  validateTask(): ObjectSchema<Schema> {
    const schemaTask: ObjectSchema<Schema> = Joi.object({
      task: Joi.string().required().trim(),
    });

    return schemaTask;
  }
}

export const hapiJoi = new HapiJoi();
