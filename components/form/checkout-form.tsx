'use client';
import type { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import IMask from 'imask';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';


type Props = ComponentProps<'form'>;

const minMsg = (name: string, numb: number) => `${name} must be at least ${numb} characters.`;
const maxMsg = (name: string, numb: number) => `${name} must be less than ${numb} characters.`;

const formSchema = z.object({
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

export function CheckoutForm({ className, ...props }: Props) {
  const cartItemsLength = useCartStore(store => store.cartItems.length);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      address: '',
      city: '',
      postCode: '',
    },
  });

  const handleCartSubmit = form.handleSubmit((_values) => {
    // TODO: process
  });

  return (
    <Form {...form}>
      <form {...props} className={cn('flex flex-col gap-4', className)}>
        <h3 className="text-xl font-bold text-center">Personal info</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="(555) 555-55-55"
                    type="tel"
                    onChange={e => field.onChange(IMask.pipe(e.currentTarget.value, { mask: '(000) 000-00-00' }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-xl font-bold text-center">Shipping info</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="England" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="London" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="555555" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-auto lg:col-span-3">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1234 Avenue" type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-xl font-bold text-center">Additional info</h3>
        <FormField
          control={form.control}
          name="additional"
          render={({ field }) => (
            <FormItem className="col-auto lg:col-span-3">
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Write additional information about the order here"
                  rows={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={cartItemsLength <= 0} onClick={handleCartSubmit}>
          Checkout
        </Button>
      </form>
    </Form>
  );
}
