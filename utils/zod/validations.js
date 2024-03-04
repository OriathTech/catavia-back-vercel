import { z } from "zod";


export function validateElement(schema, data) {
    const result = schema.safeParse(data, { extra: 'remove' });
    return result
}

export function validateNewElement(schema, data, required) {
    const requiredFields = required;

    const result = schema.safeParse(data, { extra: 'remove' });

    if (result.success) {
        const missingFields = requiredFields.filter(field => !(field in result.data));
        if (missingFields.length > 0) {
            return {
                success: false,
                error: {
                    message: JSON.stringify({
                        code: "missing_required_fields",
                        fields: missingFields,
                    })
                },
            };
        }
    }

    return result;
}

export function validateId(id) {
    const idSchema = z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
        message: 'Id must be a valid ObjectId.',
    })
    return idSchema.safeParse(id, { extra: 'remove' });
}

export function validatePosition(position) {
    const positionSchema = z.enum(['first', 'second', 'third'],
        {
            invalid_type_error: 'Extra category must be a string of enum category.'
        }
    )
    return positionSchema.safeParse(position, { extra: 'remove' });
}

export function validateUrl(url) {
    const urlSchema = z.string()
    return urlSchema.safeParse(url, { extra: 'remove' });
}

export function validatePoints(points) {
    const pointsSchema = z.number().int().nonnegative()
    return pointsSchema.safeParse(points, { extra: 'remove' });
}




