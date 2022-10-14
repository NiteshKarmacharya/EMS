import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Trash, PencilSquare  } from 'react-bootstrap-icons';

function UserCard(props) {
	const {id,email,name} = props.user;

	return (
		<ListGroup className='mt-3'>
			<ListGroup.Item
				as="li"
				className="d-flex justify-content-between align-items-center"
			>
				<div className="ms-2 me-auto">
					<div className="fw-bold">{name}</div>
					{email}
				</div>
				<div className="d-flex justify-content-between align-items-center" >
					<div className='mx-1'>
						<PencilSquare color="royalblue" size={26} onClick={() => props.editUserHandler(id)}/>
					</div>
					<div>
						<Trash color="red" size={26} onClick={() => props.deleteUserHandler(id)}/>
					</div>
				</div>
			</ListGroup.Item>
		</ListGroup>
	)
}

export default UserCard
