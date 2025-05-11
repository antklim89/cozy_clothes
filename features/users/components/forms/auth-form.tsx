import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import type { PromiseResult } from '@/lib/result';
import { cn } from '@/lib/utils';
import { LoginSchema, RegisterSchema } from '../../schemas';
import type { LoginSchemaType, RegisterSchemaType } from '../../schemas';
import type { UserType } from '../../types';


interface Props extends Omit<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  type: 'login' | 'register';
  onSubmit: (data: LoginSchemaType | RegisterSchemaType) => PromiseResult<UserType, 'validation' | string>;
};

export function AuthForm({
  className,
  type,
  onSubmit,
  ...props
}: Props) {
  const form = useForm<LoginSchemaType | RegisterSchemaType>({
    resolver: zodResolver(type === 'login' ? LoginSchema : RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((_, info) => {
      if (info.type === 'change' && info.name === 'password' && form.formState.isSubmitted) {
        void form.trigger('confirmPassword');
      }
    });
    return unsubscribe;
  }, [form]);

  const handleSubmit = form.handleSubmit(async (data: LoginSchemaType | RegisterSchemaType) => {
    const result = await onSubmit(data);

    if (result.type === 'ok') {
      form.reset();
      return;
    }

    if (result.error.type === 'validation' && result.error.errors != null) {
      Object.entries(result.error.errors).forEach(([key, value]) => {
        form.setError(key as 'root', { message: value });
      });
    } else {
      form.setError('root', { message: result.error.message });
    }
  });


  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertTitle>Failed to {type}.</AlertTitle>
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === 'register' && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            className="w-full space-x-4"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting && <Loader2 className="animate-spin size-4 mr-2" />}
            {type === 'login' ? 'Login' : 'Register'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
