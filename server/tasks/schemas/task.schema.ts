import Joi, { Schema, ObjectSchema } from '@hapi/joi';

export class TaskSchema {
    public task(): ObjectSchema<Schema> {
        return Joi.object({
            name: Joi.string().min(4).required().trim(),
        });
    }
}