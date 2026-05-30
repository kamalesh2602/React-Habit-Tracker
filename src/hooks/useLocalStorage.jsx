import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {

        const val = localStorage.getItem(key);

        if (val) {
            return JSON.parse(val);
        }

        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;