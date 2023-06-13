import { useState } from 'react';

export const useToggle = (initialState = false) => {
    const [isOn, setIsOn] = useState(initialState)

    const handleState = () => setIsOn(!isOn)

    return [isOn, handleState]
};