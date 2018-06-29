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
			<p>EMAIL me if you have further questions or need info. <a href="mailto:cgriffin@auburnalabama.org">cgriffin@auburnalabama.org</a></p>
			<section>
				<header>
					<h3>Permissions <small><em>Cynthia</em></small></h3>
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
						footer={<small><em>If user can't login try adding employee number and email to <a href="https://archive.auburnalabama.org/admin/modules/employees/employee" target="_blank" rel="noopener noreferrer">archive site</a>. If employee not there or user still can't login we need to sync employees from Eden (see troubleshooting). UBO should get permissions based on position of employee. eNotifier will need someone to assign permissions.</em></small>}
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
										<li>To view PS Reporting you need to be in the appropriate AD Groups (Jarrod put user in correct group. Greg put icon on desktop).</li>
										<li>Body Camera uploads require the officer to be in the COA database and to be in AD Group (Tell Jarrod add user to group: Detectives or Patrol).</li>
										<li>Body Camera viewing requires advanced Police title: (Tell Chris to change users' position in [COA].[organization].[employee] (find employee with email) to one with access "CAPTAIN,LIEUTENANT-ADMINISTRATION,LIEUTENANT-PATROL,Lieutenant- Patrol,LIEUTENANT-TRAINING,Lieutenant- Training,POLICE CHIEF,Assistant Police Chief,ASSISTANT POLICE CHIEF,SERGEANT-CID,SERGEANT-PATROL,LIEUTENANT-CID,SERGEANT NARCOTICS,DETECTIVE LIEUTENANT NARCOTICS,EVIDENCE & PROPERTY CONTROL SP").</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>If user can't can't login for body camera we need to sync employees from Eden (see Troubleshooting below).</em></small>}
					/>
				</main>
			</section>
			<section>
				<header>
					<h3>Application Information</h3>
				</header>
				<main>
					<RegularCard
						headerColor="red"
						cardTitle="IVR/Web Payments"
						cardSubtitle="Chris"
						content={
							<section>
								<header><p>UBO payments have been running smoothly so below is just basic info. Judicial payments occasionally are not posted to the account (because this is manual by court). If there is a problem I get an email (and court gets an application message). I'll forward the message to you and relevant people in finance and judicial but you may need to provide finance with additional details (namely last four digits on credit card)</p></header>
								<main>
									<ul>
										<li>UBO is IVR only, Judicial is Web and IVR for parking tickets and some traffic citations.</li>
										<li>Web and IVR use same backend on webserver1 (api.auburnalabama.org)</li>
										<li>If traffic citation cannot be paid online it's probably due to a criteria that court told us to disallow (court date in past, etc)</li>
										<li>Payment Attempt Record: sql\[COA].[finance].[PayPros] (timestamps, cc last 4, response codes, etc)</li>
										<li>UBO successful records are written to a file via trigger. File is imported by UBO.</li>
										<li>Judicial successful records are simultanously written to themis\[LESNET].[dbo].[CitePayReceive] where they sit until someone clicks import in the court software.</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>As always, email me for additional info.</em></small>}
					/>
					<RegularCard
						headerColor="blue"
						cardTitle="Body Camera App"
						cardSubtitle="Greg/Jarrod"
						content={
							<section>
								<header><p>Upload app is an exe on network share with desktop shortcuts on the appropriate machines. Search application is at: <a href="https://admin.auburnalabama.org/" target="_blank" rel="noopener noreferrer">https://admin.auburnalabama.org/</a>. Outside of permissions (see above) there have only been issues connecting to the API from odd locations, hard drive space running out, and a strange issue with SD Card corrupted.</p></header>
								<main>
									<ul>
										<li>If user has no desktop icon, tell Greg to place desktop shortcut.</li>
										<li>If user gets error: 'Badge Not Found' then run the stored procs on sql ([COA].[organization].[UpdatePosition], [COA].[organization].[UpdateEmployee]) and then verify tables have user's employee number.</li>
										<li>If user gets error: 'Network Error' then ask if they are in an unusual location (using campus vpn or the likes).</li>
										<li>If user gets error: 'Copy File Failed' or similiar then check diskspace.</li>
										<li>If user cannot download file then check permissions (above), browser compatibility, and finally file size (if connection is unstable and file large, try providing file manually).</li>
										<li>If upload succeeded but officer cannot find the file in search then check 'deleted' folder for timestamp matching file. These files were corrupted and I've been unable to play them.</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>As always, email me for additional info.</em></small>}
					/>
					<RegularCard
						headerColor="green"
						cardTitle="Parking Enforcement"
						cardSubtitle="Jarrod/Will"
						content={
							<section>
								<header><p>It's been running smoothly so below is just basic info.</p></header>
								<main>
									<ul>
										<li>Application: <a href="https://my.auburnalabama.org/parking-enforcement/#/" target="_blank" rel="noopener noreferrer">https://my.auburnalabama.org/parking-enforcement/#/</a>.</li>
										<li>Users: Employee in AD has access. Only if your department/group has `Police` does it post to Court</li>
										<li>Occupancy Data: Scheduled Task on webserver1</li>
										<li>Violation Data: API on webserver1 looking at sql.[COA] and themis.[LESNET]</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>As always, email me for additional info.</em></small>}
					/>
					<RegularCard
						headerColor="orange"
						cardTitle="Bids / Housecheck"
						cardSubtitle="Will"
						content={
							<section>
								<header><p>These tend not to get too many request outside of permissions (see above).</p></header>
								<main>
									<ul>
										<li>Bids has public interface on website, private interface in AppTools and DB on atlas\[Web].[dbo].[Bids*].</li>
										<li>Housecheck has public form on website, private interface in Apptools where it is approved and then inserted into themis\[CADSQL_NET]</li>
										<li>Only trick in Housecheck is that they need to parse the requested address before approving.</li>
									</ul>
								</main>
							</section>
						}
						footer={<small><em>As always, email me for additional info.</em></small>}
					/>
				</main>
			</section>
			<section>
				<header>
					<h3>Troubleshooting <small><em>Will/Chris</em></small></h3>
				</header>
				<main>
					<ul>
						<li>eNotifier Fix (sql\[Public_Enotifier].[dbo].[HackFixSMSSubscribers])</li>
						<li>Sync Employees From Eden (sql\[COA].[organization].[UpdatePosition], sql\[COA].[organization].[UpdateEmployee])</li>
					</ul>
				</main>
			</section>
		</div>
	)
}

export default withStyles(style)(Web);
