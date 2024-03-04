import { z } from "zod";

const itemProduct = z.object({
    name: z.string(),
    quantity: z.number().int().min(1),
    price: z.number().min(0),
});

const ticketSchemaZ = z.object({
    user: z.object({
        userId: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
            message: 'User ID must be a valid ObjectId.',
        }),
        email: z.string().email(),
    }),
    purchaseDate: z.string().refine((value) => /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}$/.test(value), {
        message: 'Purchase Date must be a String with format day/month/year hour:minute.'
    }),
    deliveryDate: z.string().refine((value) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value), {
        message: 'Delivery Date must be a String with format day/month/year.'
    }),
    products: z.array(itemProduct),
    total: z.number().min(0),
});

export default ticketSchemaZ;