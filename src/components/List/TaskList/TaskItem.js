import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  completed: {
	textDecoration: 'line-through !important'
  }
});

function TaskItem(props) {
	const { classes, name, onClick, onDelete, completed } = props;
	return (
		<div onClick={onClick}>
		<ListItem
		role={undefined}
		button
		className={(completed ? classes.completed : null)}
		>
			<ListItemText primary={name} />
			<ListItemSecondaryAction>
				<IconButton aria-label="Delete">
					<DeleteIcon onClick={(event) => { event.stopPropagation(); onDelete(); }} />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
		</div>
	);
}

TaskItem.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  completed: PropTypes.bool,
  onClick: PropTypes.func
};

export default withStyles(styles)(TaskItem);
