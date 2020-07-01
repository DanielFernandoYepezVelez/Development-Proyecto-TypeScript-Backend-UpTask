import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class HapiJoi {
  validateUser(): ObjectSchema<Schema> {
    const schemaUser: ObjectSchema<Schema> = Joi.object({
      name: Joi.string().required().trim(),

      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'co'] },
        }),

      password: Joi.string().trim().required(),
      repeat_password: Joi.ref('password'),
    });

    return schemaUser;
  }

  validateUserLogin(): ObjectSchema<Schema> {
    const schemaUser: ObjectSchema<Schema> = Joi.object({
      email: Joi.string()
        .trim()
        .required()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'co'] },
        }),

      password: Joi.string().trim().alphanum().required(),
      repeat_password: Joi.ref('password'),
    });

    return schemaUser;
  }

  validateProject(): ObjectSchema<Schema> {
    const schemaProject: ObjectSchema<Schema> = Joi.object({
      name: Joi.string().required().trim(),
      url: Joi.string().required().trim(),
      user_id: Joi.number().required(),
    });

    return schemaProject;
  }

  validateTask(): ObjectSchema<Schema> {
    const schemaTask: ObjectSchema<Schema> = Joi.object({
      task: Joi.string().required().trim(),
      project_id: Joi.string().required().trim(),
    });

    return schemaTask;
  }
}

export const hapiJoi = new HapiJoi();
