import React, {useState, useEffect} from 'react'

const usePreferMode = () => {
    const [theme, setTheme] = useState(localStorage.theme || "dark");
    
    const colorTheme = theme === "dark"? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export default usePreferMode