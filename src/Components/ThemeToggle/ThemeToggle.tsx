import { Button } from '../ui/button';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleToggle} className="rounded-full border-2 hover:transition-transform duration-300 hover:scale-110" >
        {theme === 'light' ? (
          <FaMoon className="h-5 w-5" />
        ) : (
          <FaSun className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
