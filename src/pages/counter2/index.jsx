import React from 'react'
import { Button } from 'antd'
import useCount from '../../hooks/useCount'

const Page = () => {
    const left = useCount()
    const right = useCount()

    return (
        <div>
            <p>left count: {left.count}</p>
            <Button onClick ={left.increase}>left increase</Button>
            <br/>
            <p>right count: {right.count}</p>
            <Button onClick ={right.increase}>right increase</Button>
        </div>
    )
}

export default Page