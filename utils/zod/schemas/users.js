import { z } from "zod";

const userSchemaZ = z.object({
    name: z.string({
        invalid_type_error: 'Name must be a string.'
    }).optional(),
    password: z.string({
        invalid_type_error: 'Password must be a string.'
    }).optional(),
    email: z.string({
        invalid_type_error: 'Email must be a string.'
    }).optional(),
    points: z.number({
        invalid_type_error: 'Points must be a number.',
    }).optional(),
    birthday: z.string().refine((value) => /^\d{4}\-\d{2}\-\d{2}$/.test(value), {
        message: 'Birthday must be a String with format year-month-day.'
    }).optional(),
    whatsapp: z.string().refine((value) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(value), {
        message: 'Whatsapp must be a String and a valid phone number.'
    }).optional(),
});

export default userSchemaZ;