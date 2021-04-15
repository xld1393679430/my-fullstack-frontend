import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import useCount from '../../hooks/useCount';

function Count(){
    const { count, increase, decrease, zero } = useCount();
    const countRef = useRef();
    if (count === 2) {
        countRef.current = count;
    }

    useEffect(() => {
        if (count === 2) {
            console.log(11111, count, countRef);
        }
     }, [count]);

    useEffect(() => {
       console.log(22222);
    }, [countRef.current === 2]);

    return (
        <div>
            <p>count: {count}</p>
            <Button onClick={increase}>increase</Button>
            <Button onClick={decrease}>decrease</Button>
            <Button onClick={zero}>zero</Button>
        </div>
    );
}

export default Count;