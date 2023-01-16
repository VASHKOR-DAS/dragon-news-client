import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {

    const { signIn, setLoading } = useContext(AuthContext);

    const navigate = useNavigate();


    const location = useLocation();
    const from = location.state?.from?.pathname || '/'












    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log('signIn user', user);
                // reset from after login
                form.reset();

                //user email verify na korle login korte dibo na
                if (user.emailVerified) {
                    navigate(from, { replace: true });
                }
                else {
                    toast.error('Email not verified.')
                }
            })
            .catch(error => {
                console.error(error);
            })

            //Email verified na hole PrivateRoute a gele loading... ta theke jay, seta remove korar jnno
            .finally(() => {
                setLoading(false);
            })







    }







    return (
        <Form onSubmit={handleLogIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;