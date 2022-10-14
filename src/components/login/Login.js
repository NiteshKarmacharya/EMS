import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login(props) {
	const [inpValue, setInpValue] = useState({
		email:"",
		password:""
	})

	const navigate = useNavigate();

	const getData = (e) => {
		const {value, name} = e.target;
		setInpValue(()=>{
			return{
				...inpValue,
				[name]: value
			}
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password} = inpValue;

		if(email === "" || password === "") {
			toast.error('Please Fill All The Field !!!');
		}
		else {
			props.users.map((user)=>{
				if(user.email===email && user.password === password) {
					setInpValue(()=>{
						return{
							email:"",
							password:""
						}
					});
					window.localStorage.setItem("isLogin", true);
					navigate('/');
				}
			})
		}
	}

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={1}
			/>
			<Row className="justify-content-md-center align-items-center d-flex full-height">
				<Col xs={12} md={6} lg={4}>
					<Card>
						<Card.Body>
							<Card.Title>Login Form</Card.Title>
							<Form>
								<Form.Group className="mb-3">
									<Form.Label>Email address</Form.Label>
									<Form.Control 
										type="email" 
										placeholder="Enter email"
										id="email"
										name="email"
										value={inpValue.email}
										onChange={getData}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control 
										type="password" 
										placeholder="Password"
										id="password"
										name="password"
										value={inpValue.password}
										onChange={getData}
									/>
								</Form.Group>
								<Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
									Submit
								</Button>
								<p>Do Not Have An Account? <Link to="/register">Register</Link></p>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Login
