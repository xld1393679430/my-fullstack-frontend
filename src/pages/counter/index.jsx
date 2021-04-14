import React from 'react';
import { Button } from 'antd';
import useCount from '../../hooks/useCount';

function Count(){
    const { count, increase, decrease, zero } = useCount();

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