# 🎨 Theming Guide - Dark & Light Mode

This project uses **CSS Variables** combined with **Tailwind CSS** for a flexible theming system.

## 📋 Quick Reference

### How Dark/Light Mode Works

1. **CSS Variables** are defined in `src/index.css`
2. **Tailwind config** (`tailwind.config.js`) maps these variables to Tailwind classes
3. **Toggle button** in `App.tsx` switches between modes by adding/removing `dark` class
4. **Theme preference** is saved in localStorage for persistence

## 🎯 Using Theme Colors

### In Tailwind Classes

```jsx
// Background colors
<div className="bg-background">      {/* Uses --color-background */}
<div className="bg-surface">         {/* Uses --color-surface */}
<div className="bg-primary">         {/* Uses --color-primary */}

// Text colors
<p className="text-text-primary">    {/* Uses --color-text-primary */}
<p className="text-text-secondary">  {/* Uses --color-text-secondary */}

// Border colors
<div className="border border-border"> {/* Uses --color-border */}

// Other colors
<button className="bg-primary hover:bg-primary-hover">
<span className="text-error">Error message</span>
<span className="text-success">Success message</span>
```

### In Custom CSS

```css
.my-custom-component {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  transition: var(--transition-normal);
}
```

## 🔧 Available CSS Variables

### Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--color-primary` | Blue (#3b82f6) | Light Blue (#60a5fa) | Primary buttons, links |
| `--color-secondary` | Purple (#8b5cf6) | Light Purple (#a78bfa) | Secondary actions |
| `--color-background` | White (#ffffff) | Dark Gray (#111827) | Page background |
| `--color-surface` | Light Gray (#f9fafb) | Gray (#1f2937) | Cards, modals |
| `--color-text-primary` | Dark (#111827) | White (#f9fafb) | Main text |
| `--color-text-secondary` | Gray (#6b7280) | Light Gray (#9ca3af) | Helper text |
| `--color-border` | Light Gray (#e5e7eb) | Dark Gray (#374151) | Borders, dividers |
| `--color-error` | Red (#ef4444) | Light Red (#f87171) | Error messages |
| `--color-success` | Green (#10b981) | Light Green (#34d399) | Success messages |

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);    /* Subtle shadow */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);  /* Medium shadow */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1); /* Large shadow */
```

### Spacing

```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
```

### Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - Small rounded corners */
--radius-md: 0.375rem;  /* 6px - Medium rounded corners */
--radius-lg: 0.5rem;    /* 8px - Large rounded corners */
--radius-xl: 0.75rem;   /* 12px - Extra large rounded corners */
```

### Transitions

```css
--transition-fast: 150ms ease-in-out;    /* Quick animations */
--transition-normal: 200ms ease-in-out;  /* Normal speed */
--transition-slow: 300ms ease-in-out;    /* Slow, smooth animations */
```

## 🎨 Customizing Colors

### Option 1: Edit CSS Variables (Recommended)

Edit `src/index.css`:

```css
:root {
  /* Change light mode primary color */
  --color-primary: #your-color-here;
  --color-primary-hover: #darker-shade;
}

.dark {
  /* Change dark mode primary color */
  --color-primary: #your-color-here;
  --color-primary-hover: #lighter-shade;
}
```

### Option 2: Add New Theme Colors

1. Add variable in `src/index.css`:

```css
:root {
  --color-warning: #f59e0b;
}

.dark {
  --color-warning: #fbbf24;
}
```

2. Add to Tailwind config (`tailwind.config.js`):

```js
theme: {
  extend: {
    colors: {
      warning: 'var(--color-warning)',
    },
  },
},
```

3. Use in your components:

```jsx
<div className="bg-warning text-white">Warning!</div>
```

## 🔄 How Theme Toggle Works

```jsx
// In App.tsx
const [isDarkMode, setIsDarkMode] = useState(false);

const toggleTheme = () => {
  setIsDarkMode((prev) => {
    const newMode = !prev;
    if (newMode) {
      // Enable dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Enable light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    return newMode;
  });
};
```

## 💡 Best Practices

### ✅ DO

```jsx
// Use theme colors for consistency
<div className="bg-surface text-text-primary">
  
// Use CSS variables in custom styles
<div style={{ backgroundColor: 'var(--color-primary)' }}>

// Combine with Tailwind utilities
<div className="bg-surface p-spacing-md rounded-lg">
```

### ❌ DON'T

```jsx
// Avoid hardcoded colors (breaks dark mode)
<div className="bg-white text-black">
<div style={{ color: '#000000' }}>

// Don't use both approaches (confusing)
<div className="bg-surface" style={{ backgroundColor: '#fff' }}>
```

## 🚀 Adding More Themes

Want to add more theme options (e.g., high contrast, colorful)?

1. Add new theme class in `src/index.css`:

```css
.theme-high-contrast {
  --color-primary: #000000;
  --color-background: #ffffff;
  --color-text-primary: #000000;
  /* ... more overrides */
}
```

2. Update toggle logic in `App.tsx`:

```jsx
const [theme, setTheme] = useState('light'); // 'light' | 'dark' | 'high-contrast'

const toggleTheme = () => {
  // Cycle through themes
  const themes = ['light', 'dark', 'high-contrast'];
  const currentIndex = themes.indexOf(theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  
  document.documentElement.className = nextTheme === 'light' ? '' : nextTheme;
  localStorage.setItem('theme', nextTheme);
  setTheme(nextTheme);
};
```

## 📖 Examples

### Custom Card Component

```jsx
function CustomCard({ children }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-md">
      <h2 className="text-text-primary text-xl font-bold mb-4">
        Card Title
      </h2>
      <p className="text-text-secondary">
        {children}
      </p>
    </div>
  );
}
```

### Custom Alert Component

```jsx
function Alert({ type, message }) {
  const colors = {
    error: 'bg-red-50 dark:bg-red-900/20 border-error text-red-800 dark:text-red-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-success text-green-800 dark:text-green-200',
  };
  
  return (
    <div className={`p-4 border rounded-lg ${colors[type]}`}>
      {message}
    </div>
  );
}
```

## 🎯 Testing Your Theme

1. **Toggle dark mode** - Click the theme button in top-right
2. **Check localStorage** - Open DevTools → Application → Local Storage → look for `theme`
3. **Refresh page** - Theme should persist
4. **Test all components** - Ensure all colors adapt properly
5. **Check contrast** - Text should be readable in both modes

## 📚 Additional Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Happy Theming! 🎨**

