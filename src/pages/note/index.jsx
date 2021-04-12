import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'

const Page = () => {
    const { notes } = useSelector(state => state)
    const routerMatch = useRouteMatch()
    const { params: { id } } = routerMatch

    return (
        <div>
            note id: {id}
        </div>
    )
}

export default Page