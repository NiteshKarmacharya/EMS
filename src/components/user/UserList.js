import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from './UserCard';


function UserList(props) {
	const deleteUserHandler = (id) => {
		props.getUserId(id);
	}

	const editUserHandler = (id) => {
		props.getUserEditId(id);
	}

	const renderUsersList = props.users.map((user)=>{
		return <UserCard user={user} deleteUserHandler={deleteUserHandler} editUserHandler={editUserHandler} key={user.id}/>
	})

	return (
		<Row className="justify-content-md-center align-items-center d-flex ">
			<Col xs={12} md={6} >
				<h3 className='text-center mt-3'>User List</h3>
				{renderUsersList}
			</Col>
		</Row>
	)
}

export default UserList
