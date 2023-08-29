import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData()
    const handleUpdate = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updateUser = { name, email }
        console.log(name, email)

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method:'PUT', 
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(updateUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0 ){
                alert('user modified successfully')
            }
            form.reset()
        })


    }

    return (
        <div>
            <h4>update information {loadedUser.name}</h4>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loadedUser?.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={loadedUser?.email} id="" />
                <br />
                <input type="submit" value="update" />
            </form>

            <Link to='/users'><button>Users</button></Link>
            <Link to='/'><button>Home</button></Link>
        </div>
    );
};

export default Update;