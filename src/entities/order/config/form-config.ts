export const orderFormConfig = {
  firstName: { minLength: 3, maxLength: 1000, required: true },
  lastName: { minLength: 3, maxLength: 1000, required: true },
  address: { minLength: 5, maxLength: 1000, required: true },
  phone: { minLength: 3, maxLength: 1000, required: true },
  comments: { minLength: 0, maxLength: 4000, required: false },
} as const;
