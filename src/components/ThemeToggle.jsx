function ThemeToggle(props) {
    return (
        <button
            onClick={() =>
                props.setTheme(
                    props.theme === "light"
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