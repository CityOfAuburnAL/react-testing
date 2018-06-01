import React from 'react';
import PropTypes from 'prop-types';
import config from '_config';
import axios from 'axios';
import {
	withStyles,
	Card,
	CardHeader,
	FormControl,
	IconButton,
	InputLabel,
	Input,
	InputAdornment,
	List,
	Tabs,
	Tab
  } from "@material-ui/core";
import { BugReport, Code, AccessTime, Add } from "@material-ui/icons";
import TaskItem from './TaskItem.js';

const styles = theme => ({
  root: {
		width: '100%',	
		padding: '0 15px 30px 0',
		boxSizing: 'border-box'
  },
  card: {
		display: "inline-block",
		backgroundColor: theme.palette.background.paper,
		position: "relative",
		width: "100%",
		margin: "25px 0",
		boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
		borderRadius: "3px",
		color: "rgba(0, 0, 0, 0.87)",
		background: "#fff",
		overflow: "visible"
  },
  cardHeader: {
    flex: "none",
    margin: "-20px 15px 0",
		borderRadius: "3px",
		padding: "15px",
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    boxShadow: "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)",
    [theme.breakpoints.down("sm")]: {
      display: "grid"
    }
  },
  cardTitle: {
    float: "left",
    fontWeight: "500",
    padding: "10px 10px 10px 0",
    lineHeight: "24px",
    fontSize: "14px",
    color: "#FFFFFF"
  },
  actionContainer: {
    display: "inline-flex",
		color: "#FFFFFF",
		flex: "1 1 auto",
		[theme.breakpoints.down("sm")]: {
		  flexWrap: "wrap",
	  }
  },
  actionInputWrapper: {
		marginRight: "15px",
		marginLeft: "auto",
		[theme.breakpoints.down("sm")]: {
		  marginLeft: "0",
	  }
  },
  actionInput: {
		color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "24px"
  },
  actionInputLabel: {
		color: "rgba(255, 255, 255, 0.54)",
		'&$actionInputLabelFocused': {
			color: "#F1F1F1"
		},
		'&:hover': {
			color: "rgba(255, 255, 255, 0.87)"
		},
		'&:focus': {
			color: "#F1F1F1"
		}
  },
  actionInputLabelFocused: {},
  actionInputUnderline: {
	'&:before': {
		borderColor: "rgba(255, 255, 255, 0.42)"
	},
	'&:after': {
		borderColor: "rgba(255, 255, 255, 0.42)"
	},
	'&:hover': {
		'&:before': {
			borderBottom: "2px solid rgba(255, 255, 255, 0.87) !important"
		}
	}
  },
  tabsContainer: {
    marginTop: "4px",
    color: "#FFFFFF"
  },
  cardHeaderContent: {
    flex: "none"
  },
  tabIcon: {
	  float: "left",
	  [theme.breakpoints.down("sm")]: {
		  marginTop: "-2px"
	  }
  },
  tabWrapper: {
    width: "auto",
    display: "inline-flex",
    alignItems: "inherit",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex"
    }
  },
  labelIcon: {
    height: "44px",
    width: "110px",
    minWidth: "72px",
    paddingLeft: "14px",
    borderRadius: "3px"
  },
  label: {
    lineHeight: "19px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "500",
    marginLeft: "-10px"
  },
  textColorInheritSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background-color .4s"
  },
  displayNone: {
    display: "none"
  }
});

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			tasks: [],
			filter: 'Projects',
			filteredTasks: [],
			newTask: ''
		};
	}
	
	componentDidMount() {
		axios.get(`${config.serverAPI2}/employee/tasks`, { withCredentials: true }).then((response) => {
			let t = response.data || []
			this.setState({ 
				isLoaded: true,
				tasks: t,
				filteredTasks: t.filter((i) => { return i.Tags === this.state.filter; })
			});
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			// @ref: https://reactjs.org/docs/faq-ajax.html
		}).catch((error) => { 
			this.setState({
				isLoaded: true,
				error
			});
		});
	}

	computedFilteredTasks = (tasks, filter) => {
		filter = filter || this.state.filter;
		return tasks.filter((i) => { return i.Tags === filter; })
	}

	handleTabChange = (event, value) => {
		this.setState({
			filter: value,
			filteredTasks: this.computedFilteredTasks(this.state.tasks, value)
		});
	}
	
	handleCompleted = (id) => {
		const { tasks } = this.state;
		const currentIndex = tasks.findIndex(e => e.ID === id);
		const newTasks = [...tasks];

		let isCompleted = !newTasks[currentIndex].Completed
		newTasks.splice(currentIndex, 1, Object.assign(newTasks[currentIndex], { Completed: isCompleted }));

		this.setState({
			tasks: newTasks,
			filteredTasks: this.computedFilteredTasks(newTasks)
		});

		axios.put(`${config.serverAPI2}/employee/task/${id}`, { Completed: isCompleted ? new Date().toISOString() : null }, { withCredentials: true }).then()
			.catch((error) => {
				newTasks.splice(currentIndex, 1, Object.assign(newTasks[currentIndex], { Completed: !isCompleted }));

				this.setState({
					tasks: newTasks,
					filteredTasks: this.computedFilteredTasks(newTasks)
				});
			})
	};
	
	handleAdded = (event) => {
		const { name, value } = event.currentTarget;
		this.setState({[name]: value});
	};

	handleSubmitAdded = (event) => {
		event.preventDefault();
		const { filter, newTask, tasks } = this.state;
		
		axios.post(`${config.serverAPI2}/employee/task`, { Name: newTask, Tags: filter }, { withCredentials: true }).then((response) => {
			tasks.push(response.data);
			// Add new item to list, can't do it immediately with server generated ID
			this.setState({
				tasks: tasks,
				filteredTasks: this.computedFilteredTasks(tasks)
			});
			// Clear the input
			document.getElementById('add-task').value = '';
		})
	}

	handleDeleted = (id) => {
		const { tasks } = this.state;
		const currentIndex = tasks.findIndex(e => e.ID === id);
		const newTasks = [...tasks];

		let oldTask = tasks[currentIndex];
		newTasks.splice(currentIndex, 1);

		this.setState({
			tasks: newTasks,
			filteredTasks: this.computedFilteredTasks(newTasks)
		});

		axios.delete(`${config.serverAPI2}/employee/task/${id}`, { withCredentials: true }).then()
			.catch((error) => { // on error we'll add the task back
				newTasks.splice(currentIndex, 1, oldTask);

				this.setState({
					tasks: newTasks,
					filteredTasks: this.computedFilteredTasks(newTasks)
				});
			})
	}

	render() {
		const { classes } = this.props;

		return (
			<section className={classes.root}>
				<Card className={classes.card}>
					<CardHeader 
					title="Task List"
					classes={{
						root: classes.cardHeader,
						title: classes.cardTitle,
						content: classes.cardHeaderContent,
						action: classes.actionContainer
					}}
					action={
						<div className={classes.actionContainer}>
							<Tabs value={this.state.filter} onChange={this.handleTabChange} classes={{flexContainer: classes.tabsContainer, indicator: classes.displayNone }} textColor="inherit">
								<Tab label="Bug" value="Bugs" icon={<BugReport className={classes.tabIcon} />} classes={{ wrapper: classes.tabWrapper, labelIcon: classes.labelIcon, label: classes.label, selected: classes.textColorInheritSelected }}></Tab>
								<Tab label="Project" value="Projects" icon={<AccessTime className={classes.tabIcon} />} classes={{ wrapper: classes.tabWrapper, labelIcon: classes.labelIcon, label: classes.label, selected: classes.textColorInheritSelected }}></Tab>
								<Tab label="Other" value="Other" icon={<Code className={classes.tabIcon} />} classes={{ wrapper: classes.tabWrapper, labelIcon: classes.labelIcon, label: classes.label, selected: classes.textColorInheritSelected }}></Tab>
							</Tabs>
							<form className={classes.actionInputWrapper} method="POST" action="https://api.auburnalabama.org/employee/task" onSubmit={(event) => { this.handleSubmitAdded(event); }}>
								<FormControl className={classes.actionInputWrapper}>
									<InputLabel htmlFor="add-task" FormLabelClasses={{root: classes.actionInputLabel, focused: classes.actionInputLabelFocused}}>New Task</InputLabel>
									<Input
										id="add-task"
										type="text"
										name="newTask"
										onChange={this.handleAdded}
										autoComplete="off"
										classes={{ root: classes.actionInput, underline: classes.actionInputUnderline }}
										endAdornment={
										<InputAdornment position="end">
											<IconButton
											aria-label="Add Task"
											classes={{root: classes.actionInputLabel}}
											type="Submit"
											>
												<Add/>
											</IconButton>
										</InputAdornment>
										}
									/>
								</FormControl>
							</form>
						</div>
					}
					></CardHeader>
					<List>
						{this.state.filteredTasks.map(task => (
							<TaskItem key={task.ID} name={task.Name} completed={task.Completed} onClick={() => { this.handleCompleted(task.ID)}} onDelete={() => { this.handleDeleted(task.ID)}}></TaskItem>
						))}
					</List>
				</Card>
			</section>
		);
	}
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);
