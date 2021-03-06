import React from 'react';
import config from '_config';
import axios from 'axios';
import TaskList from 'components/List/TaskList/TaskList';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reports: []
		};
	}

	componentDidMount() {
		axios.get(`${config.serverAPI2}/employee/dashboard`, { withCredentials: true }).then((response) => {
			this.setState({ reports: response.data });
		});
	}

	asJson(item) {
		item = typeof item !== "string"
			? JSON.stringify(item)
			: item;
	
		try {
			return JSON.parse(item);
		} catch (e) {
			return false;
		}
	}

	parseReportData(report, data) {
		switch (report) {
			case 'Hangfire Jobs':
				let jobs = [];
				data = this.asJson(data);
				data.forEach((record) => {
					console.log(record);
					jobs.push(`${record.Job.Method}: ${record.Error}\\${record.Success}`);
				});
				return jobs.join('\n');
			default:
				return data;
		}
	}

	render() {
		var styles = {
			iframe : {
				width: '100%',
				height: '50vw',
				border: 'none',
			},
		}
		return (
			<section>
				<TaskList></TaskList>
				<iframe src="https://static.auburnalabama.org/media/charts/wrm-lake-level/drought-decision.html" title="WRM Chart - Drought" style={styles['iframe']}></iframe>
				<iframe src="https://static.auburnalabama.org/media/charts/wrm-lake-level/lake-level.html" title="WRM Chart - Lake Level" style={styles['iframe']}></iframe>
				{this.state.reports.map(report => (
					<section key={report.ID}>
						<header><h3>{report.Name}</h3></header>
						<dl>
						{JSON.parse(report.Data).map(data => (
							<span key={data.Date}>
								<dt>{data.Date}</dt>
								<dd style={{whiteSpace:"pre"}}>{this.parseReportData(report.Name, data.Data)}</dd>
							</span>
						))}
						</dl>
					</section>
				))}
			</section>
		)
	}
}

export default Dashboard;
