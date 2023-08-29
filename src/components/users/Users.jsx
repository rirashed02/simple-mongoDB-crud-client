import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const usersData = useLoaderData()
    const [users, setUsers] = useState(usersData)

    const handleDelate = _id => {
        console.log('delete', _id)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    alert('deleted Successfully')
                    const remaining = users.filter(user => user._id !== _id)
                    setUsers(remaining)
                }
            })
    }

    return (
        <div>
            <p>user Number: {users.length}</p>
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name} {user.email} {user._id}<Link to={`/update/${user._id}`}><button>Update</button></Link> <button onClick={() => handleDelate(user._id)}>X</button></p>)
                }
            </div>
            <Link to='/'><button>Home</button></Link>
        </div>
    );
};

export default Users;