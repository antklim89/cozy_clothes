'use client';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ComponentProps, MutableRefObject } from 'react';
import { useIMask } from 'react-imask';

type Props = ComponentProps<'form'>;

export const CheckoutForm = ({ className, ...props }: Props) => {
  const { ref, value, setValue } = useIMask({ mask: '+{55} (000) 000-00-00' });

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <h3 className="text-xl font-bold text-center">Personal info</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <FormItem>
          <Label htmlFor="color">First Name</Label>
          <Input placeholder="First Name" type="text" minLength={2} maxLength={100} />
        </FormItem>

        <FormItem>
          <Label htmlFor="color">Last Name</Label>
          <Input placeholder="Last Name" type="text" minLength={2} maxLength={100} />
        </FormItem>

        <FormItem>
          <Label htmlFor="color">Email Address</Label>
          <Input placeholder="example@mail.ru" type="email" maxLength={100} />
        </FormItem>

        <FormItem>
          <Label htmlFor="color">Phone number</Label>
          <Input
            ref={ref as MutableRefObject<HTMLInputElement>}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="+55 (555) 555-55-55"
            type="tel"
          />
        </FormItem>
      </div>

      <h3 className="text-xl font-bold text-center">Shipping info</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <FormItem>
          <Label htmlFor="color">Country</Label>
          <Input placeholder="England" type="text" minLength={2} maxLength={100} />
        </FormItem>

        <FormItem>
          <Label htmlFor="color">City</Label>
          <Input placeholder="London" type="text" minLength={2} maxLength={100} />
        </FormItem>

        <FormItem>
          <Label htmlFor="color">Post Code</Label>
          <Input placeholder="555555" type="number" minLength={6} maxLength={6} />
        </FormItem>

        <FormItem className="col-auto lg:col-span-3">
          <Label htmlFor="color">Address</Label>
          <Input placeholder="1234 Avenue" type="text" minLength={5} maxLength={1000} />
        </FormItem>
      </div>
    </form>
  );
};

export default CheckoutForm;
