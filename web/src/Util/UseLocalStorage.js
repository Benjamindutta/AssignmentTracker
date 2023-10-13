import { useState, useEffect } from "react"

const useLocalStorage = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved);
            }
            return defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
    }, [value]);
    return [value, setValue];
}

export { useLocalStorage }