import React from "react";
import { ThemeContext } from "../Background";

const Toggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      {theme === "dark" ? (
        <i
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fa-solid fa-sun text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <i
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fa-solid fa-moon text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default Toggle;
