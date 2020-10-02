import Joi, { ObjectSchema, Schema } from '@hapi/joi';

export class ProjectSchema {
    public project(): ObjectSchema<Schema> {
        return Joi.object({
            name: Joi.string().min(4).max(50).required().trim(),
        });
    }
}