
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function ThemeToggle(props) {
    const { theme, setTheme } =
        useContext(ThemeContext);
    return (
        <button
            onClick={() =>
                setTheme(
                    theme === "light"
                        ? "dark"
                        : "light"
                )
            }
        >
            Toggle Theme
        </button>
    );
}

export default ThemeToggle;