import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


const Profile = () => {

    const { user } = useContext(AuthContext);

    const [name, setName] = useState(user.displayName);

    const handleSubmit = event => {
        event.preventDefault();
        console.log(name);
    }

    const handleNameChange = event => {
        setName(event.target.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control readOnly defaultValue={user?.email} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleNameChange} defaultValue={name} type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>photoURL</Form.Label>
                <Form.Control defaultValue={user?.photoURL} type="text" placeholder="photoURL" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Profile;