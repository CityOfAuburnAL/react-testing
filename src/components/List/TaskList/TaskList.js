import React from 'react';
import PropTypes from 'prop-types';
import {
	withStyles,
	Card,
	CardContent,
	CardHeader,
	List,
	Typography,
	Tabs,
	Tab
  } from "@material-ui/core";
import TaskItem from './TaskItem.js';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			tasks: []
		};
	}
	
	componentDidMount() {
		fetch("/data/employee/task/employeeTasks.json")
			.then(res => res.json())
			.then(
			(result) => {
				this.setState({
				isLoaded: true,
				tasks: result || []
				});
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				this.setState({
				isLoaded: true,
				error
				});
			}
			);
	}
	
	handleCompleted(i) {
		const { tasks } = this.state;
		const currentIndex = tasks.findIndex(e => e.ID === i);
		const newTasks = [...tasks];

		newTasks.splice(currentIndex, 1, Object.assign(newTasks[currentIndex], { Completed: !newTasks[currentIndex].Completed }));

		this.setState({
			tasks: newTasks,
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.root}>
				<CardHeader 
				title={`${this.props.name}'s Task List`}
				action={
					<Tabs>
						<Tab label="Group 1"></Tab>
						<Tab label="Group 2"></Tab>
					</Tabs>
				}
				></CardHeader>
				<List>
					{this.state.tasks.map(task => (
						<TaskItem key={task.ID} name={task.Name} completed={task.Completed} onClick={() => { this.handleCompleted(task.ID)}}></TaskItem>
					))}
				</List>
			</Card>
		);
	}
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
};

export default withStyles(styles)(TaskList);
