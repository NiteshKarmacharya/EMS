import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import UserEdit from './components/user/UserEdit';
import UserList from './components/user/UserList';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function App() {

	const [users, setUsers] = useState([]);
	const [usersEdit, setUsersEdit] = useState([]);
	const [usersEditId, setUsersEditId] = useState();
	const LOCAL_STORAGE_KEY = 'userkey';
	const loggedIn = window.localStorage.getItem("isLogin");
	console.log(loggedIn);

	const navigate = useNavigate();

	const addUserHandler = (user) => {
		setUsers([...users,{ id:uuidv4(), ...user }]);
		toast.info('User Added !!!');
	}

	const updateUserHandler = (user) => {
		setUsers(
			users.map((elem)=>{
				if(elem.id === usersEditId) {
					return {...users,...user }
				}
				return elem;
			})
		)
		toast.info('User Updated !!!');
		navigate('/userlist');
	}

	const removeUserHandler = (id) => {
		const newUserList = users.filter((user)=> {
			return user.id !== id;
		});
		setUsers(newUserList);
		toast.info('User Deleted !!!');
	}

	const editUserHandler = (id) => {
		const editUserList = users.find((user)=> {
			return user.id === id;
		});
		setUsersEdit(editUserList);
		setUsersEditId(id);
		navigate('/useredit');
	}

	const logOut = () => {
		window.localStorage.removeItem("isLogin");
	}

	useEffect(()=>{
		const retriveUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if(retriveUsers) {setUsers(retriveUsers)};
	},[])

	useEffect(()=>{
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
	},[users])


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
			<div className="App">
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand to="/">EMS</Navbar.Brand>
						{ loggedIn ?
							<Nav className="me-auto">
								<Link className='nav-link' to="/">Home</Link>
								<Link className='nav-link' to="/userlist">Users</Link>
								<Link className='nav-link' onClick={logOut}>Logout</Link>
							</Nav> : <Nav className="me-auto">
								<Link className='nav-link' to="/login">Login</Link>
								<Link className='nav-link' to="/register">Register</Link>
							</Nav>
						}
					</Container>
				</Navbar>
				<Container>
					<Routes>
						<Route path='/' element={loggedIn?<Home />:<Login users={users}/>} />
						<Route path='/login' element={<Login users={users}/>} />
						<Route path='/register' element={<Register addUserHandler={addUserHandler}/>} />
						<Route path='/useredit' element={loggedIn?<UserEdit usersEdit={usersEdit} updateUserHandler={updateUserHandler} editUserHandler={editUserHandler}/>:<Login users={users}/>} />
						<Route path='/userlist' element={loggedIn?<UserList users={users} getUserId={removeUserHandler} getUserEditId={editUserHandler}/>: <Login users={users}/>} />
					</Routes>
				</Container>
			</div>
		</>
  );
}

export default App;
