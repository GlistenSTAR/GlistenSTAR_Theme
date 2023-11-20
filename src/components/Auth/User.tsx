import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
    id: string;
}

const User: React.FC = () => {
    const { id } = useParams<Params>();

    return (
        <div>
            <h1>User Page</h1>
            <p>ID: {id}</p>
        </div>
    );
};

export default User;