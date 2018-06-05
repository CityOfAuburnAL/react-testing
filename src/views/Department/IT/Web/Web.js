import React from 'react';
import AppToolsForm from 'components/Form/AppTools/AppTools';
import {
	withStyles
} from '@material-ui/core';
import RegularCard from 'components/Card/RegularCard';

const style = theme => ({
	root: {}
});

function Web({ ...props }) {
	const {
		classes,
	} = props;

	return (
		<div className={classes.root}>
			<RegularCard
				headerColor="purple"
				cardTitle="AppTools"
				cardSubtitle="House Check, Press Release, ePackets, Bids, Spills, ED Properties"
				content={
					<AppToolsForm></AppToolsForm>
				}
				footer={<small><em>New user will be emailed login instructions. <strong>Press Release and ePackets require additional permissions assigned in <a href="http://apptools/" target="_blank" rel="noopener noreferrer">AppTools</a></strong>. Existing users will be granted new programs.</em></small>}
			/>
		</div>
	)
}

export default withStyles(style)(Web);
