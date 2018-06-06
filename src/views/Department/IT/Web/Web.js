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
			<section>
				<header>
					<h3>Permissions</h3>
				</header>
				<main>
					<RegularCard
						headerColor="purple"
						cardTitle="AppTools"
						cardSubtitle="House Check, Press Release, ePackets, Bids, Spills, ED Properties"
						content={
							<AppToolsForm></AppToolsForm>
						}
						footer={<small><em>New user will be emailed login instructions. <strong>Press Release and ePackets require additional permissions assigned in <a href="http://apptools/" target="_blank" rel="noopener noreferrer">AppTools</a></strong>. Existing users will be granted new programs.</em></small>}
					/>
					<RegularCard
						headerColor="purple"
						cardTitle="Archive Site"
						cardSubtitle="eNotifier, UBO"
						content={
							<section>
								<header><p>User needs to first create an account before permissions can be assigned.</p></header>
								<main>
									<ol>
										<li>User creates account by logging in at: <a href="https://archive.auburnalabama.org/account/login" target="_blank" rel="noopener noreferrer">https://archive.auburnalabama.org/account/login</a></li>
										<li>Someone is emailed to assign permissions.</li>
										<li>???</li>
										<li>Profit.</li>
									</ol>
								</main>
							</section>
						}
						footer={<small><em>If user can't login we need to sync employees from Eden. UBO should get permissions based on position of employee. eNotifier will need someone to assign permissions.</em></small>}
					/>
					<RegularCard
						headerColor="purple"
						cardTitle="Website"
						cardSubtitle="Website"
						content={
							<section>
								<header><p>Access is granted to all users. User needs to click employee login in the footer of the page they want to edit. A pop-up will appear for logging in. Then they'll need to click the edit icon at the top right.</p></header>
								<main>
									<ul>
										<li>To upload a file: go into edit mode, highlight some text and select link. Uploaded document will be available at newly created link location even if link is not saved.</li>
										<li>Advanced editing is available at: <a href="https://www.auburnalabama.org/cms/" target="_blank" rel="noopener noreferrer">https://www.auburnalabama.org/cms/</a>.</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>If user can't login we need to sync employees from Eden.</em></small>}
					/>
					<RegularCard
						headerColor="purple"
						cardTitle="Public Safety"
						cardSubtitle="PSReporting, Body Camera"
						content={
							<section>
								<header><p>PS Reporting is at: <a href="http://psreporting/" target="_blank" rel="noopener noreferrer">http://psreporting/</a>. Body camera uploading is a desktop app on PS computers and the viewer is available at: <a href="https://admin.auburnalabama.org/" target="_blank" rel="noopener noreferrer">https://admin.auburnalabama.org/</a>.</p></header>
								<main>
									<ul>
										<li>To view PS Reporting you need to be in the appropriate AD Groups (Self-Note: Look up groups in code).</li>
										<li>Body Camera uploads require the officer to be in the COA database and to be in AD Group (Detectives or Patrol).</li>
										<li>Body Camera viewing requires advanced Police title: (Self-Note: Look up titles in code).</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>If user can't login for body camera we need to sync employees from Eden.</em></small>}
					/>
				</main>
			</section>
			<section>
				<header>
					<h3>Troubleshooting (coming soon)</h3>
				</header>
				<main>
					<ul>
						<li>eNotifier Fix (eNotifierFixSMSNull.sql)</li>
						<li>Sync Employees From Eden ([organization].[UpdatePosition], [organization].[UpdateEmployee])</li>
					</ul>
				</main>
			</section>
		</div>
	)
}

export default withStyles(style)(Web);
