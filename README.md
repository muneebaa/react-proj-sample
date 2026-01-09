# React Project Sample - Signup Form with Dark/Light Mode

A modern React + TypeScript + Tailwind CSS project featuring a beautiful signup form with dark/light mode theme switching.

## 🚀 Features

- ✅ **Signup & Login Forms** with Formik + Zod validation
- 🎨 **Dark/Light Mode** with Redux state management
- 🎯 **Reusable Components** (CommonInput, CommonButton)
- 📱 **Fully Responsive** design
- 🔒 **Professional Form Validation** with real-time feedback
- 💅 **CSS Variables** for easy theming
- ⚡ **Vite** for fast development
- 🎭 **TypeScript** for type safety
- 📦 **Redux Toolkit** for global state

## 📦 Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Redux Toolkit** - State Management
- **Formik** - Form Management
- **Zod** - Schema Validation
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build Tool
- **Axios** - HTTP Client (configured)

## 🏃 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── CommonButton/   # Button component
│   └── CommonInput/    # Input component with validation
├── pages/              # Page components
│   ├── Signup/        # Signup page (implemented)
│   └── Login/         # Login page (ready for implementation)
├── store/              # Redux state management
│   ├── index.ts       # Store configuration
│   ├── hooks.ts       # Typed Redux hooks
│   └── slices/        # Redux slices
│       └── themeSlice.ts  # Theme state
├── lib/               # Utilities
│   ├── apiInvoker.ts  # API wrapper functions
│   ├── apiURL.ts      # API endpoints
│   ├── axiosInstance.ts # Configured axios
│   ├── localStorage.ts  # LocalStorage helpers
│   └── utils.ts       # General utilities
├── services/          # API services
│   └── usersService.ts
├── types/            # TypeScript types
│   └── users.ts
├── validators/       # Validation schemas
│   └── authValidator.ts
├── App.tsx          # Main app with theme toggle
├── main.tsx         # Entry point with Redux Provider
└── index.css        # Global styles + CSS variables
```

## 🎨 Theming System

### CSS Variables

The project uses CSS variables for easy theming. All variables are defined in `src/index.css`:

```css
:root {
  /* Light Mode */
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-text-primary: #111827;
  /* ... more variables */
}

.dark {
  /* Dark Mode */
  --color-primary: #60a5fa;
  --color-background: #111827;
  --color-text-primary: #f9fafb;
  /* ... more variables */
}
```

### Available Variables

- **Colors**: primary, secondary, background, surface, text, border, error, success
- **Shadows**: shadow-sm, shadow-md, shadow-lg
- **Spacing**: spacing-xs to spacing-xl
- **Border Radius**: radius-sm to radius-xl
- **Transitions**: transition-fast, transition-normal, transition-slow

### Using Variables

In Tailwind (configured in `tailwind.config.js`):
```jsx
<div className="bg-background text-text-primary border-border">
```

In CSS:
```css
.my-class {
  background-color: var(--color-primary);
}
```

## 🧩 Component Usage

### CommonInput

```tsx
import CommonInput from './components/CommonInput';

<CommonInput
  label="Email"
  name="email"
  type="email"
  placeholder="john@example.com"
  value={email}
  onChange={handleChange}
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### CommonButton

```tsx
import CommonButton from './components/CommonButton';

<CommonButton
  variant="primary"  // primary | secondary | outline
  fullWidth
  isLoading={loading}
  onClick={handleClick}
>
  Sign Up
</CommonButton>
```

## 🔐 Form Validation

The Signup form includes comprehensive validation:
- ✅ Required fields
- ✅ Email format validation
- ✅ Password strength (min 8 chars, uppercase, lowercase, number)
- ✅ Password confirmation matching
- ✅ Real-time error clearing
- ✅ Name length validation

## 🎯 Next Steps for Junior Developers

### Easy Tasks
1. **Implement Login Page** - Similar to Signup, use the same components
2. **Add More Input Types** - Extend CommonInput for checkbox, radio, select
3. **Create More Variants** - Add button variants (danger, success)
4. **Add Icons** - Install and use an icon library (lucide-react, heroicons)

### Medium Tasks
1. **Add Routing** - Install react-router-dom and create navigation
2. **Connect to API** - Use the pre-configured axios instance in `lib/`
3. **Add Toast Notifications** - For success/error messages
4. **Form Persistence** - Save draft form data to localStorage

### Advanced Tasks
1. **Add Authentication Flow** - JWT tokens, protected routes
2. **Implement Zod Validation** - Replace manual validation
3. **Add Loading States** - Skeleton screens, shimmer effects
4. **Add Animations** - Use Framer Motion for smooth transitions
5. **Implement Password Strength Meter** - Visual feedback for password

## 🎨 Customization Guide

### Change Color Scheme

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --color-primary: #your-color;  /* Change brand color */
}
```

### Add New Component

1. Create folder in `components/`
2. Create `ComponentName.tsx` and `index.ts`
3. Export from `index.ts`: `export { default } from './ComponentName';`

### Add New Page

1. Create folder in `pages/`
2. Create `PageName.tsx` and `index.ts`
3. Import in `App.tsx` and add to your routing

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Formik Documentation](https://formik.org/docs/overview)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vite.dev/guide/)

### 📖 Detailed Guides

- **REDUX_GUIDE.md** - Complete Redux Toolkit implementation guide
- **FORMS_GUIDE.md** - Formik + Zod forms and validation guide
- **THEMING_GUIDE.md** - Dark/light mode theming system

## 🐛 Common Issues

### Tailwind styles not working?
- Make sure you have `tailwind.config.js` in root
- Check `index.css` has the `@tailwind` directives
- Restart the dev server

### Dark mode not persisting?
- Check browser localStorage is enabled
- Look for `theme` key in DevTools > Application > Local Storage

### Types not working?
- Run `npm install` to ensure all @types packages are installed
- Check `tsconfig.json` configuration

## 📝 Code Style

- Use **functional components** with hooks
- Use **TypeScript** for all new files
- Follow **React best practices** (component composition, prop drilling awareness)
- Use **Tailwind utilities** first, custom CSS as fallback
- Keep components **small and focused**
- Write **meaningful variable names**

## 🤝 Contributing

This is a starter template. Feel free to:
- Add new features
- Improve validation
- Enhance accessibility
- Add tests
- Improve documentation

## 📄 License

MIT License - feel free to use this for learning and projects!

---

**Happy Coding! 🚀**

If you have questions, check the code comments or refer to the official documentation of the libraries used.
