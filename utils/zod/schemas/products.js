import { z } from "zod";


const thumbnails = z.object({
    first: z.object({
        url: z.string().nullable().optional()
    }),
    second: z.object({
        url: z.string().nullable().optional()
    }),
    third: z.object({
        url: z.string().nullable().optional()
    })
});

const itemElement = z.object({
    _id: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    status: z.string().optional(),
    quantity: z.number().optional(),
    category: z.string("extra", "ingredient").optional(),
});

const productSchemaZ = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string.'
    }).optional(),
    description: z.string({
        invalid_type_error: 'Product description must be a string.'
    }).max(140, { message: "Must be 140 or fewer characters long" }).optional(),
    status: z.enum(['online', 'offline', 'featured'],
        {
            invalid_type_error: 'Extra category must be a string of enum category.'
        }
    ).optional(),
    price: z.number({
        invalid_type_error: 'Product price must be a number.'
    }).nonnegative().optional(),
    category: z.array(
        z.enum(['salados', 'chocolatería', 'tortas', 'tartas', 'postres', 'individuales', 'frutales', 'regalos', 'temporada', 'catering', 'desayunos', 'panificados'])
    ).optional(),
    thumbnails: thumbnails.optional(),
    elements: z.array(itemElement).optional()
});

export default productSchemaZ;