# 🔄 Redux Guide - State Management

This project uses **Redux Toolkit** for global state management.

## 📦 What's Installed

- `@reduxjs/toolkit` - Modern Redux with less boilerplate
- `react-redux` - React bindings for Redux

## 🏗️ Project Structure

```
src/
├── store/
│   ├── index.ts              # Redux store configuration
│   ├── hooks.ts              # Typed Redux hooks
│   └── slices/
│       └── themeSlice.ts     # Theme state slice
```

## 🎯 Current Implementation - Theme Management

### Store Configuration (`src/store/index.ts`)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Theme Slice (`src/store/slices/themeSlice.ts`)

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' },
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});
```

### Typed Hooks (`src/store/hooks.ts`)

```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🚀 How to Use Redux in Components

### 1. Import the Typed Hooks

```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setTheme, toggleTheme } from './store/slices/themeSlice';
```

### 2. Access State (Read)

```typescript
function MyComponent() {
  // Select state from Redux store
  const theme = useAppSelector((state) => state.theme.theme);
  
  return <div>Current theme: {theme}</div>;
}
```

### 3. Dispatch Actions (Write)

```typescript
function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleSetLight = () => {
    dispatch(setTheme('light'));
  };
  
  return (
    <div>
      <p>Current: {theme}</p>
      <button onClick={handleToggle}>Toggle</button>
      <button onClick={handleSetLight}>Set Light</button>
    </div>
  );
}
```

## 📝 Adding a New Slice (Example: User Authentication)

### Step 1: Create the Slice

Create `src/store/slices/authSlice.ts`:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

### Step 2: Add to Store

Update `src/store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice'; // Import new slice

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer, // Add to reducers
  },
});
```

### Step 3: Use in Components

```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loginSuccess, logout } from './store/slices/authSlice';

function LoginComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const handleLogin = async () => {
    const userData = { id: '1', email: 'user@example.com', name: 'John' };
    dispatch(loginSuccess(userData));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## 🔥 Advanced: Async Actions with Thunks

For async operations (like API calls), use `createAsyncThunk`:

```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Use in component
function UserProfile() {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchUser('123'));
  }, [dispatch]);
  
  if (status === 'loading') return <div>Loading...</div>;
  
  return <div>Welcome, {user?.name}</div>;
}
```

## 🛠️ Redux DevTools

Redux Toolkit automatically enables Redux DevTools. To use:

1. Install **Redux DevTools Extension** in your browser
2. Open browser DevTools
3. Go to "Redux" tab
4. See all state changes, actions, and time-travel debug!

## 📚 Best Practices

### ✅ DO

```typescript
// Use typed hooks
const dispatch = useAppDispatch();
const theme = useAppSelector((state) => state.theme.theme);

// Create focused selectors
const selectTheme = (state: RootState) => state.theme.theme;
const theme = useAppSelector(selectTheme);

// Keep slices focused on one concern
// themeSlice.ts - only theme
// authSlice.ts - only authentication
```

### ❌ DON'T

```typescript
// Don't use plain hooks
const dispatch = useDispatch(); // ❌ No type safety
const theme = useSelector((state) => state.theme.theme); // ❌

// Don't mutate state directly outside reducers
theme.theme = 'dark'; // ❌ Use dispatch(setTheme('dark'))

// Don't put everything in one slice
// megaSlice.ts with theme, auth, users, posts... ❌
```

## 🎯 When to Use Redux vs Context

### Use Redux When:
- ✅ Complex state logic
- ✅ State needed across many components
- ✅ Frequent state updates
- ✅ Need time-travel debugging
- ✅ Team needs predictable patterns

### Use Context When:
- ✅ Simple state (theme, language)
- ✅ State rarely changes
- ✅ Small app
- ✅ Don't need DevTools

## 📖 Learning Resources

- [Redux Toolkit Official Docs](https://redux-toolkit.js.org/)
- [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

## 🎓 Common Patterns

### Pattern 1: Form State Management

```typescript
interface FormState {
  email: string;
  password: string;
  errors: Record<string, string>;
}

const formSlice = createSlice({
  name: 'form',
  initialState: { email: '', password: '', errors: {} },
  reducers: {
    setField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
    setError: (state, action: PayloadAction<{ field: string; error: string }>) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    resetForm: () => initialState,
  },
});
```

### Pattern 2: Loading States

```typescript
interface DataState<T> {
  data: T | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
```

### Pattern 3: Normalized Data

```typescript
interface UsersState {
  byId: Record<string, User>;
  allIds: string[];
}

// Easier to update specific users
state.byId[userId].name = newName;
```

## 🎉 Summary

- **Store** - Single source of truth for state
- **Slices** - Organized pieces of state with reducers
- **Actions** - Events that describe state changes
- **Reducers** - Functions that handle actions and update state
- **Hooks** - `useAppSelector` to read, `useAppDispatch` to write

Start with the theme slice example and gradually add more features! 🚀

