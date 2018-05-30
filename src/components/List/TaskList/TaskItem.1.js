import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './TaskList.css';
import 'assets/css/dashboard.css';

class TaskItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: props.completed
		}
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	render() {
		return (
			<label className={styles.root}>
				<Checkbox type="checkbox" checked={this.state.completed} onChange={this.handleChange('completed')} /> {this.props.name}
			</label>
		)
	}
}

export default TaskItem;
