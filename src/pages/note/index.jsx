import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Page = () => {
    const { notes } = useSelector(state => state);
    const { id } = useParams();
    return (
        <div>
            note id: { id }
        </div>
    );
};

export default Page;