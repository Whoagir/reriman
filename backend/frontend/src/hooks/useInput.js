import { useEffect, useState } from 'react'

// Чтобы использовать данный хук вам требуется создать переменную const test = useInput("") и указать в инпуте <input {...test} />

// Чтобы использоватть свойство onchange надо просто указазать вторым параметром функцию которую хотите использовать const test = useInput("", testik())

export default function useInput(initialValue, onChangeCallback) {
    const [value, setValue] = useState(initialValue);
    
    useEffect(() => {
        onChangeCallback(value);
    }, [value])

    function handleChange(e) {
        setValue(e.target.value)
    };

    return {
        value,
        onChange: handleChange,
    };
};
