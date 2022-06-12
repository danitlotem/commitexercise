import React, {useState} from 'react';
import Form from './Form';
import User from './User';
import {Paper, Tab, Tabs} from '@material-ui/core';
import '../styles/TabsStyle.css';

const MyTabs = () => {
	const [activeTab, setActiveTab] = useState('Form');

	return (
		<div style={{marginInline: '20%', marginTop: '10%'}}>
			<Paper style={{width: 320, marginInline: 'auto'}}>
				<Tabs
					value={activeTab}
					textColor="primary"
					indicatorColor="primary"
					onChange={(event, newValue) => {
						event.preventDefault();
						setActiveTab(newValue);
					}}
				>
					<Tab value="Form" label="Form" />
					<Tab value="User" label="User" />
				</Tabs>
			</Paper>
			<div className="currComponent">{activeTab === 'Form' ? <Form /> : <User />}</div>
		</div>
	);
};
export default MyTabs;