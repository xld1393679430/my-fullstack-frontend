import { useState } from 'react';

const useCount = () => {
    let [count, setCount] = useState(0);

    const increase = () => {
        setCount(count+1);
    };

    const decrease = () => {
        setCount(count-1);
    };

    const zero = () => {
        setCount(0);
    };

    return {
        count,
        increase,
        decrease,
        zero
    };
};

export default useCount;