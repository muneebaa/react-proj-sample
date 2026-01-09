import { useEffect } from 'react';
import Signup from './pages/Signup';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setTheme, toggleTheme } from './store/slices/themeSlice';
// import Login from './pages/Login'; // Uncomment to use Login page

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  // Initialize theme from system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      dispatch(setTheme('dark'));
    }
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Theme Toggle Button */}
      <button
        onClick={handleToggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-surface border border-border shadow-md hover:shadow-lg transition-all duration-200 z-10"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Main Content */}
      <div className="container-center px-4">
        <Signup />
        {/* Replace <Signup /> with <Login /> to show login page */}
      </div>
    </div>
  );
}

export default App;
