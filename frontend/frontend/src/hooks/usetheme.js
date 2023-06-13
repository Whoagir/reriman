import { useLayoutEffect } from "react"
import { useState } from "react"

// Чтобы использовать этот хук... а впрочем и не надо. он понадобиться лишь один раз, и его уже использовали

export const useTheme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'dark')

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return { theme, setTheme }
}
