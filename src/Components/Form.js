import * as React from 'react';
import {Grid, Button} from '@material-ui/core';
import {Alert, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/FormStyle.css';
import {Paper} from '@material-ui/core';

const Form = (props) => {
	const [userName, setUserName] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [showAlert, setShowAlert] = React.useState(false);

	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const status = state.status;
	const message = state.message;
	const isConfirm = state.isConfirm;
	const isValidPassword = state.isValidPassword;
	const handleSubmit = (event) => {
		event.preventDefault();
		if (isValidPassword && isConfirm) {
			dispatch({
				type: 'UPDATE_DETAILS',
				name: userName,
				phone: phoneNumber,
				status: 'updated',
			});
		}
	};

	React.useEffect(() => {
		dispatch({
			type: 'CLEAR',
			name: '',
			phone: '',
			isValidPassword: false,
			isConfirm: false,
			message: '',
			status: '',
		});
	}, []);

	const handleNameChange = (event) => {
		const limit = 32;
		setUserName(event.target.value.slice(0, limit));
	};
	const handlePhoneChange = (event) => {
		const limit = 10;
		setPhoneNumber(event.target.value.slice(0, limit));
	};
	const handlePassword = (event) => {
		var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,12}$/;
		setPassword(event.target.value);
		if (regularExpression.test(event.target.value) === false) {
			dispatch({
				type: 'SET_MESSAGE',
				message: 'The password does not match the template',
			});
		} else {
			dispatch({
				type: 'SET_PASSWORD_VELIDITY',
				isValidPassword: true,
			});
			setPassword(event.target.value);
		}
	};
	const handleConfirm = (event) => {
		setConfirmPassword(event.target.value);

		if (event.target.value !== password && password !== '') {
			dispatch({
				type: 'SET_MESSAGE',
				message: 'Different passwords',
			});
			setShowAlert(true);
		} else {
			dispatch({
				type: 'SET_PASSWORD_CONFIRM',
				isConfirm: true,
			});
			setShowAlert(false);
		}
	};
	return (
		<div className="form-container">
			<Paper className="form">
				<form onSubmit={handleSubmit}>
					<Grid container justifyContent="center">
						<TextField sx={{margin: 1, marginInline: 5}} required label="User name" value={userName} onChange={handleNameChange} />
						<TextField
							sx={{margin: 1, marginInline: 5}}
							type="number"
							required
							label="Phone number"
							value={phoneNumber}
							onChange={handlePhoneChange}
						/>
						<TextField sx={{margin: 1, marginInline: 5}} label="Password" type="password" value={password} onChange={handlePassword} />
						<TextField
							sx={{margin: 1, marginInline: 5}}
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={handleConfirm}
							disabled={isValidPassword ? false : true}
						/>
						<Button color="primary" size="small" type="submit" variant="contained" disabled={isValidPassword && isConfirm ? false : true}>
							Submit
						</Button>
					</Grid>
				</form>
				{status === 'updated' && <Alert severity="success">State updated!</Alert>}
				{showAlert ? <Alert severity="error">{message}</Alert> : <div />}
			</Paper>
		</div>
	);
};
export default Form;
