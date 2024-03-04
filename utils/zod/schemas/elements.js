import { z } from "zod";

const elementSchemaZ = z.object({
    name: z.string({
        invalid_type_error: 'Extra name must be a string.',
    }).optional(),
    price: z.number(
        {
            invalid_type_error: 'Extra price must be a number.',
        }
    ).nonnegative().optional(),
    status: z.string({
        invalid_type_error: "Extra status must be a string."
    }).optional(),
    category: z.string("extra", "ingredient").optional(),
})

export default elementSchemaZ;