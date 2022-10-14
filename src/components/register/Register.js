import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register(props) {

	const [inpValue, setInpValue] = useState({
		name:"",
		email:"",
		password:"",
		confirmPassword:""
	})

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
		const {name, email, password, confirmPassword} = inpValue;
		const validEmail = new RegExp(
			'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
	 );
		const validPass = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

		if(name === "" || email === "" || password === "" || confirmPassword=== "") {
			toast.error('Please Fill All The Field !!!');
		}
		else if(!validEmail.test(email)) {
			toast.error('Enter Correct Email !!!');
		}
		else if(!validPass.test(password)) {
			toast.error('Password Must Contain 1 Uppercase, 1 Number & 1 Special character !!!');
		}
		else if (password !== confirmPassword) {
			toast.error('Password Doesnot Match !!!');
		}
		else {
			props.addUserHandler(inpValue);
			setInpValue(()=>{
				return{
					name:"",
					email:"",
					password:"",
					confirmPassword:""				
				}
			});
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
							<Card.Title>Register Form</Card.Title>
								<Form>
									<Form.Group className="mb-3">
										<Form.Label>Full Name</Form.Label>
										<Form.Control 
											type="text"
											placeholder="Enter fullname"
											id="name"
											name="name"
											value={inpValue.name}
											onChange={getData}
										/>
									</Form.Group>

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
									
									<Form.Group className="mb-3">
										<Form.Label>Conform Password</Form.Label>
										<Form.Control 
											type="password"
											placeholder="Confirm Password"
											id="confirmPassword"
											name="confirmPassword"
											value={inpValue.confirmPassword}
											onChange={getData}
										/>
									</Form.Group>
									<Button variant="primary" type="submit" className="mb-3" onClick={handleSubmit}>
										Register
									</Button>
									<div>Already Have An Account? <Link to="/login">Login</Link></div>
								</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
		
	)
}

export default Register
