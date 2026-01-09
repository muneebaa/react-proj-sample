# 📝 Forms Guide - Formik + Zod Validation

This project uses **Formik** for form management and **Zod** for schema validation, following industry best practices.

## 📦 Technologies

- **Formik** - Form state management, validation, and submission
- **Zod** - TypeScript-first schema validation
- **Custom Integration** - Helper functions to connect Formik + Zod

## 🏗️ Project Structure

```
src/
├── validators/
│   └── authValidator.ts       # Zod validation schemas
├── lib/
│   └── formikHelper.ts        # Formik + Zod integration helpers
├── pages/
│   ├── Signup/
│   │   └── Signup.tsx         # Signup form with Formik + Zod
│   └── Login/
│       └── Login.tsx          # Login form with Formik + Zod
```

## 🎯 Implementation Overview

### 1. Validation Schemas (`src/validators/authValidator.ts`)

```typescript
import { z } from 'zod';

// Define schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

// Infer TypeScript type from schema
export type LoginFormValues = z.infer<typeof loginSchema>;
```

### 2. Formik Integration Helper (`src/lib/formikHelper.ts`)

```typescript
export function toFormikValidationSchema<T>(schema: z.ZodSchema<T>) {
  return {
    validate: (values: T) => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.issues.forEach((issue) => {
            const path = issue.path.join('.');
            errors[path] = issue.message;
          });
          return errors;
        }
        return {};
      }
    },
  };
}
```

### 3. Form Component Implementation

```typescript
import { Formik, Form } from 'formik';
import { loginSchema, type LoginFormValues } from '../../validators/authValidator';
import { toFormikValidationSchema } from '../../lib/formikHelper';

const LoginForm = () => {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    try {
      // API call here
      console.log(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidationSchema(loginSchema).validate}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
        <Form>
          {/* Form fields */}
        </Form>
      )}
    </Formik>
  );
};
```

## ✅ Best Practices Implemented

### 1. Schema-First Validation

```typescript
// ✅ Define schema once
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters'),
  // ... more fields
});

// ✅ Infer TypeScript types automatically
export type SignupFormValues = z.infer<typeof signupSchema>;
```

**Benefits:**
- Single source of truth for validation
- Automatic TypeScript types
- Reusable across frontend and backend

### 2. Password Validation

```typescript
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export const signupSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(passwordRegex, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
```

**Features:**
- Minimum/maximum length
- Complexity requirements (uppercase, lowercase, numbers)
- Password confirmation matching
- Custom error messages

### 3. Error Handling

```typescript
const [submitError, setSubmitError] = useState<string | null>(null);

const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
  try {
    setSubmitError(null);
    await apiCall(values);
  } catch (error) {
    setSubmitError('An error occurred. Please try again.');
  } finally {
    setSubmitting(false);
  }
};

// Display error
{submitError && (
  <div className="p-4 bg-red-100 border border-red-400 rounded-lg">
    <p className="text-red-800">{submitError}</p>
  </div>
)}
```

### 4. Field-Level Error Display

```typescript
<CommonInput
  label="Email Address"
  name="email"
  value={values.email}
  onChange={handleChange}
  onBlur={handleBlur}
  error={touched.email ? errors.email : undefined}
/>
```

**Only shows errors when:**
- Field has been touched (blurred)
- Error exists for that field

### 5. Loading States

```typescript
<CommonButton
  type="submit"
  fullWidth
  isLoading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Signing In...' : 'Sign In'}
</CommonButton>
```

### 6. Form Reset After Success

```typescript
const handleSubmit = async (values: SignupFormValues, { setSubmitting, resetForm }: any) => {
  try {
    await apiCall(values);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      resetForm();
      setSubmitSuccess(false);
    }, 3000);
  } finally {
    setSubmitting(false);
  }
};
```

## 🔥 Advanced Validation Examples

### Email Normalization

```typescript
email: z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase(), // Automatically converts to lowercase
```

### Name Validation

```typescript
firstName: z
  .string()
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name must be less than 50 characters')
  .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters'),
```

### Conditional Validation

```typescript
const userSchema = z.object({
  role: z.enum(['user', 'admin']),
  adminCode: z.string().optional(),
}).refine(
  (data) => {
    if (data.role === 'admin') {
      return data.adminCode && data.adminCode.length > 0;
    }
    return true;
  },
  {
    message: 'Admin code is required for admin role',
    path: ['adminCode'],
  }
);
```

### Custom Transformations

```typescript
phoneNumber: z
  .string()
  .min(1, 'Phone number is required')
  .transform((val) => val.replace(/\D/g, '')) // Remove non-digits
  .refine((val) => val.length === 10, 'Phone number must be 10 digits'),
```

## 📚 Creating New Forms

### Step 1: Create Validation Schema

Create or update `src/validators/[feature]Validator.ts`:

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.enum(['general', 'support', 'feedback'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
```

### Step 2: Create Form Component

```typescript
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { contactSchema, type ContactFormValues } from '../../validators/contactValidator';
import { toFormikValidationSchema } from '../../lib/formikHelper';

const ContactForm: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    message: '',
    subject: 'general',
  };

  const handleSubmit = async (values: ContactFormValues, { setSubmitting, resetForm }: any) => {
    try {
      // API call
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      
      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidationSchema(contactSchema).validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          {/* Form fields here */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
```

## 🛠️ Common Patterns

### Pattern 1: Dynamic Fields

```typescript
const dynamicSchema = z.object({
  items: z.array(
    z.object({
      name: z.string().min(1, 'Item name required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
    })
  ).min(1, 'At least one item required'),
});
```

### Pattern 2: Async Validation (Unique Email Check)

```typescript
const checkEmailExists = async (email: string) => {
  const response = await fetch(`/api/check-email?email=${email}`);
  return response.json();
};

// In component
const validateAsync = async (values: SignupFormValues) => {
  const errors: any = {};
  
  if (values.email) {
    const exists = await checkEmailExists(values.email);
    if (exists) {
      errors.email = 'Email already registered';
    }
  }
  
  return errors;
};

<Formik
  validate={(values) => {
    const syncErrors = toFormikValidationSchema(signupSchema).validate(values);
    return validateAsync(values).then((asyncErrors) => ({
      ...syncErrors,
      ...asyncErrors,
    }));
  }}
  // ... rest of props
>
```

### Pattern 3: Multi-Step Forms

```typescript
const step1Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const step2Schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const fullSchema = step1Schema.merge(step2Schema);

// In component
const [step, setStep] = useState(1);

const validateStep = (values: any) => {
  const schema = step === 1 ? step1Schema : step2Schema;
  return toFormikValidationSchema(schema).validate(values);
};
```

## 🎨 Styling Best Practices

### Consistent Error Display

```typescript
// CommonInput component already handles this
<CommonInput
  error={touched.fieldName ? errors.fieldName : undefined}
/>
```

### Success Messages

```typescript
{submitSuccess && (
  <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 rounded-lg">
    <p className="text-green-800 dark:text-green-200 text-center">
      ✓ Success message here
    </p>
  </div>
)}
```

### Loading States

```typescript
<CommonButton
  type="submit"
  isLoading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Processing...' : 'Submit'}
</CommonButton>
```

## 🔒 Security Best Practices

### 1. Never Trust Client-Side Validation Alone

```typescript
// ❌ Don't do this
const handleSubmit = async (values: any) => {
  // Send directly to API without server-side validation
  await fetch('/api/signup', { body: JSON.stringify(values) });
};

// ✅ Do this
const handleSubmit = async (values: SignupFormValues) => {
  // Client validates, but server MUST also validate
  // Same schema can be used on backend
  await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(values),
    // Server will re-validate with same Zod schema
  });
};
```

### 2. Sanitize User Input

```typescript
const sanitizeSchema = z.object({
  comment: z
    .string()
    .transform((val) => val.trim())
    .transform((val) => val.replace(/<script>/gi, '')), // Basic XSS prevention
});
```

### 3. Rate Limiting (Backend)

```typescript
// Add rate limiting on backend for form submissions
// This is a reminder, not client-side code
```

## 📖 Formik API Reference

### Common Formik Props

```typescript
<Formik
  initialValues={initialValues}           // Initial form state
  validate={validateFunction}             // Validation function
  onSubmit={handleSubmit}                 // Submit handler
  validateOnChange={true}                 // Validate on field change
  validateOnBlur={true}                   // Validate on field blur
  validateOnMount={false}                 // Validate on mount
  enableReinitialize={false}              // Re-init when initialValues change
>
```

### Formik Render Props

```typescript
{({ 
  values,           // Current form values
  errors,           // Validation errors
  touched,          // Fields that have been touched
  isSubmitting,     // Is form currently submitting
  isValid,          // Is form valid
  dirty,            // Has form been modified
  handleChange,     // Change handler
  handleBlur,       // Blur handler
  handleSubmit,     // Submit handler
  setFieldValue,    // Set single field value
  setFieldError,    // Set single field error
  resetForm,        // Reset form to initial state
}) => (
  <Form>
    {/* Your form */}
  </Form>
)}
```

## 🎯 Testing Forms

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './Login';

test('shows validation error for invalid email', async () => {
  render(<LoginForm />);
  
  const emailInput = screen.getByLabelText('Email Address');
  await userEvent.type(emailInput, 'invalid-email');
  await userEvent.tab(); // Trigger blur
  
  await waitFor(() => {
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });
});
```

## 📚 Resources

- [Formik Documentation](https://formik.org/docs/overview)
- [Zod Documentation](https://zod.dev/)
- [Formik + Zod Integration](https://formik.org/docs/guides/validation#using-zod)

## 🎉 Summary

✅ **Formik** handles form state and submission  
✅ **Zod** provides type-safe validation  
✅ **Custom helper** connects them seamlessly  
✅ **Best practices** ensure security and UX  
✅ **TypeScript** ensures type safety throughout  

Start with the Login/Signup examples and build from there! 🚀

