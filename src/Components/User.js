import * as React from 'react';
import '../styles/UserStyle.css';
import {useSelector} from 'react-redux';
import {Paper} from '@material-ui/core';

const User = (props) => {
	const state = useSelector((state) => state);
	const userName = state.name;
	const phone = state.phone;

	return (
		<Paper className="userContainer">
			<div className="userName">
				<div className="lable">User name:</div>
				<div>{userName}</div>
			</div>
			<div className="phoneNumber">
				<div className="lable">Phone Number: </div>
				<div>{phone}</div>
			</div>
		</Paper>
	);
};

export default User;
