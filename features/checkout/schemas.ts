import { z } from 'zod';


const minMsg = (name: string, numb: number) => `${name} must be at least ${numb} characters.`;
const maxMsg = (name: string, numb: number) => `${name} must be less than ${numb} characters.`;

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: minMsg('First name', 2) })
    .max(100, { message: maxMsg('First name', 100) }),
  lastName: z
    .string()
    .min(2, { message: minMsg('Last name', 2) })
    .max(100, { message: maxMsg('Last name', 100) }),
  email: z
    .string()
    .email()
    .min(2, { message: minMsg('E-mail', 2) })
    .max(100, { message: maxMsg('E-mail', 100) }),
  phone: z
    .string()
    .min(2, { message: minMsg('Phone number', 2) })
    .max(100, { message: maxMsg('Phone number', 100) }),
  country: z
    .string()
    .min(2, { message: minMsg('Country', 2) })
    .max(100, { message: maxMsg('Country', 100) }),
  city: z
    .string()
    .min(2, { message: minMsg('City', 2) })
    .max(100, { message: maxMsg('City', 100) }),
  postCode: z
    .string()
    .min(6, { message: minMsg('Post code', 6) })
    .max(6, { message: maxMsg('Post code', 6) }),
  address: z
    .string()
    .min(5, { message: minMsg('Address', 5) })
    .max(500, { message: maxMsg('Address', 500) }),
  additional: z
    .string()
    .min(0, { message: minMsg('Additional info', 5) })
    .max(5000, { message: maxMsg('Additional info', 5000) })
    .optional(),
});
