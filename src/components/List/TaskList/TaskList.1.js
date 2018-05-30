import React from 'react'
import TaskItem from './TaskItem'

class TaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [{name: "Laundry"}]
		}
	}

	renderTaskItem(task) {
		return <TaskItem name={task.name} completed={task.completed}></TaskItem>
	}
	render() {
		return (
			<div className="shopping-list">
				<h1>Task List for {this.props.name}</h1>
				<ul>
					<li>{this.renderTaskItem({name: "Laundry", completed: true})}</li>
					<li>WhatsApp</li>
					<li>Oculus</li>
				</ul>
			</div>
		)
	}
}

export default TaskList;
