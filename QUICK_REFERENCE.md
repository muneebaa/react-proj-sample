# 🚀 Quick Reference Card

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app component with theme toggle |
| `src/main.tsx` | Entry point with Redux Provider |
| `src/index.css` | Global styles & CSS variables |
| `src/store/` | Redux state management |
| `src/validators/` | Zod validation schemas |
| `src/components/` | Reusable UI components |
| `src/pages/` | Page components (Login, Signup) |

## 🎨 Using Theme Colors

```tsx
// In JSX
<div className="bg-background text-text-primary border-border">
<div className="bg-primary text-white">
<button className="bg-surface hover:bg-background">

// In CSS
.my-class {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}
```

## 🔄 Using Redux

```tsx
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setTheme, toggleTheme } from './store/slices/themeSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  
  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Toggle Theme
    </button>
  );
}
```

## 📝 Creating a Form

### 1. Create Validation Schema

```tsx
// src/validators/myValidator.ts
import { z } from 'zod';

export const mySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

export type MyFormValues = z.infer<typeof mySchema>;
```

### 2. Create Form Component

```tsx
import { Formik, Form } from 'formik';
import { mySchema, type MyFormValues } from '../../validators/myValidator';
import { toFormikValidationSchema } from '../../lib/formikHelper';

const MyForm = () => {
  const initialValues: MyFormValues = {
    name: '',
    email: '',
  };

  const handleSubmit = async (values: MyFormValues, { setSubmitting }: any) => {
    try {
      console.log(values);
      // API call here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={toFormikValidationSchema(mySchema).validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange, handleBlur }) => (
        <Form>
          <CommonInput
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : undefined}
          />
          
          <CommonButton type="submit" isLoading={isSubmitting}>
            Submit
          </CommonButton>
        </Form>
      )}
    </Formik>
  );
};
```

## 🧩 Using Reusable Components

### CommonInput

```tsx
<CommonInput
  label="Email"
  name="email"
  type="email"
  placeholder="john@example.com"
  value={value}
  onChange={handleChange}
  onBlur={handleBlur}
  error={error}
  helperText="Optional help text"
/>
```

### CommonButton

```tsx
<CommonButton
  variant="primary"        // primary | secondary | outline
  fullWidth                // Optional: makes button full width
  isLoading={loading}      // Shows spinner
  disabled={disabled}
  onClick={handleClick}
>
  Click Me
</CommonButton>
```

## 📖 Zod Validation Examples

```tsx
// String
z.string().min(1, 'Required').min(2, 'At least 2 chars')

// Email
z.string().email('Invalid email').toLowerCase()

// Number
z.number().min(0).max(100)

// Password
z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Complex password')

// Enum
z.enum(['option1', 'option2', 'option3'])

// Optional
z.string().optional()

// Transform
z.string().transform((val) => val.trim())

// Custom validation
z.string().refine((val) => val !== 'admin', 'Reserved word')

// Object with matching fields
z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
})
```

## 🎯 Common Tasks

### Switch Between Login and Signup

In `src/App.tsx`:
```tsx
import Login from './pages/Login';    // Uncomment
import Signup from './pages/Signup';

// Then change:
<Login />    // or <Signup />
```

### Add New Redux Slice

1. Create `src/store/slices/mySlice.ts`
2. Add to `src/store/index.ts`:
   ```tsx
   import myReducer from './slices/mySlice';
   
   export const store = configureStore({
     reducer: {
       theme: themeReducer,
       my: myReducer,  // Add here
     },
   });
   ```

### Change Primary Color

In `src/index.css`:
```css
:root {
  --color-primary: #your-color;
}

.dark {
  --color-primary: #your-dark-color;
}
```

### Add Custom CSS Variable

1. Add to `src/index.css`:
   ```css
   :root {
     --my-variable: value;
   }
   ```

2. Add to `tailwind.config.js`:
   ```js
   colors: {
     myColor: 'var(--my-variable)',
   }
   ```

3. Use in components:
   ```tsx
   <div className="bg-myColor">
   ```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Styles not working | Run `npm install`, restart dev server |
| TypeScript errors | Check types match schema, hover over error |
| Form not validating | Check schema is passed to `validate` prop |
| Redux not working | Ensure Provider wraps app in `main.tsx` |
| Dark mode not working | Check Redux DevTools, verify theme state |

## 📚 Documentation Files

- **README.md** - Main project overview
- **FORMS_GUIDE.md** - Complete Formik + Zod guide
- **REDUX_GUIDE.md** - Complete Redux guide
- **THEMING_GUIDE.md** - Complete theming guide
- **QUICK_REFERENCE.md** - This file!

## 🔗 Quick Links

- [React Docs](https://react.dev)
- [Formik Docs](https://formik.org)
- [Zod Docs](https://zod.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Tailwind Docs](https://tailwindcss.com)

---

**Happy Coding! 🎉**

