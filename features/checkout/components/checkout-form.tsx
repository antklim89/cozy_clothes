'use client';
import type { ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import IMask from 'imask';
import type { z } from 'zod';
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
import { cn } from '@/lib/utils';
import { formSchema } from '../schemas';


type Props = ComponentProps<'form'>;


const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  address: '',
  city: '',
  postCode: '',
};
export function CheckoutForm({ className, ...props }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
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

        <Button className="w-full" onClick={handleCartSubmit}>
          Checkout
        </Button>
      </form>
    </Form>
  );
}
