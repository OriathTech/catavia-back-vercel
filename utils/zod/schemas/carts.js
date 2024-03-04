import { z } from "zod";

const itemCart = z.object({
    productId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
        message: 'Id must be a valid ObjectId.',
    }),
    quantity: z.number().int().gte(1)
});


const cartSchemaZ = z.object({
    products: z.array(itemCart),
    deliveryDate: z.string().refine((value) => /^\d{4}\-\d{2}\-\d{2}$/.test(value), {
        message: 'deliveryDate must be a String with format year-month-day.'
    }).optional()
})

export default cartSchemaZ;