import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import _config from '_config';
import {
	Button,
	IconButton,
	InputLabel,
	FormControl,
	TextField,
	NativeSelect,
	Snackbar,
	SnackbarContent,
	withStyles,
} from '@material-ui/core';
import {
	green,
} from '@material-ui/core/colors';
import {
	Close,
	Create,
} from '@material-ui/icons';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	formControl: {
		margin: theme.spacing.unit,
    	minWidth: 120,
	},
	select: { },
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	}
});

const departments = [
	'Economic Development',
	'Environmental Services',
	'Finance',
	'Human Resources',
	'Information Technology',
	'Judicial',
	'Library',
	'Parks and Recreation',
	'Planning',
	'Public Safety',
	'Public Works',
	'Water Resource Management',
	'Office of the City Manager',
];

const programs = [
	{ ShortName: 'HouseCheck', Name: 'House Check' },
	{ ShortName: 'PR', Name: 'Press Release Manager' },
	{ ShortName: 'Packet', Name: 'e-Packet Manager' },
	{ ShortName: 'Boards', Name: 'Boards and Commissions' },
	{ ShortName: 'Bids', Name: 'Bids Manager' },
	{ ShortName: 'Spills', Name: 'Spills Manager' },
	{ ShortName: 'Properties', Name: 'ED Property Manager' },
];

class AppTools extends React.Component {
	state = {
		Name: '',
		Department: '',
		Program: '',
		fname: '',
		lname: '',
		error: {
			open: false,
			message: 'Failed to create user.'
		},
		success: {
			open: false,
			message: 'User created!'
		}
	}

	handleFNameChange = event => {
		this.handleChange(event);
		this.setState({
			Name: `${event.target.value} ${this.state.lname}`
		});
	}

	handleLNameChange = event => {
		this.handleChange(event);
		this.setState({
			Name: `${this.state.fname} ${event.target.value}`
		});
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		// TODO - form validation?
		event.preventDefault();
		// TODO - disable button? waiting indicator?
		axios.post(`${_config.serverAPI2}/employee/permission/apptools`, this.state, { withCredentials: true })
				.then((response) => {
					if (response.data) { // returns true/false
						// Confirmation
						this.setState({
							success: {
								open: true,
								message: 'User Created!',
							}
						});
						// Reset form
						document.getElementById('apptools-user-form').reset();
						return true;
					}
					throw new Error('Failed to create user.');
				})
				.catch((error) => {
					// Display Error Message
					this.setState({
						error : {
							open: true,
							message: error.message || (error.data && error.data.Message ? error.data.Message : error.data),
						}
					});
				});
	}

	handleClose = snackbar => {
		this.setState({
			[snackbar]: {
				open: false,
				message: ''
			}
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<form id="apptools-user-form" className={classes.root} onSubmit={this.handleSubmit} autoComplete="off">
				<TextField className={classes.textField}
					label="First Name"
					name="fname"
					value={this.state.fname}
					onChange={this.handleFNameChange}
					inputProps={{ required: true }}
				/>
				<TextField className={classes.textField}
					label="Last Name"
					name="lname"
					value={this.state.lname}
					onChange={this.handleLNameChange}
					inputProps={{ required: true }}
				/>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="Department">Department</InputLabel>
					<NativeSelect className={classes.select}
						onChange={this.handleChange}
						value={this.state.Department}
						inputProps={{ name: 'Department', id: 'Department', required: true }}
					>
						<option disabled></option>
						{departments.map((department) => { return (
							<option key={department} value={department}>{department}</option>
						)})}
					</NativeSelect>
				</FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="program">Program</InputLabel>
					<NativeSelect className={classes.select}
						onChange={this.handleChange}
						value={this.state.Program}
						inputProps={{ name: 'Program', id: 'Program', required: true }}
					>
						<option disabled></option>
						{programs.map((program) => { return (
							<option key={program.ShortName} value={program.ShortName}>{program.Name}</option>
						)})}
					</NativeSelect>
				</FormControl>
				<FormControl style={{ marginLeft: 'auto' }}>
					<Button type="submit" variant="raised" color="primary" className={classes.button}>
						Create User
						<Create className={classes.rightIcon} />
					</Button>
				</FormControl>
				<Snackbar open={this.state.error.open}>
					<SnackbarContent classes={{ root: classes.error }}
						message={
							<span>{this.state.error.message}</span>
						}
						action={
							<IconButton key="close"
								aria-label="close"
								color="inherit"
								onClick={ () => this.handleClose('error') }
							>
								<Close/>
							</IconButton>
						}
					/>
				</Snackbar>
				<Snackbar open={this.state.success.open} autoHideDuration={6000} onClose={ () => this.handleClose('success') }>
					<SnackbarContent classes={{ root: classes.success }}
						message={
							<span>{this.state.success.message}</span>
						}
						action={
							<IconButton key="close"
								aria-label="close"
								color="inherit"
								onClick={ () => this.handleClose('success') }
							>
								<Close/>
							</IconButton>
						}
					/>
				</Snackbar>
			</form>
		);
	}
};

AppTools.propTypes = {
	classes: propTypes.object.isRequired
};

export default withStyles(styles)(AppTools);
