let barChart;
let doubleBarChart;

function makeBarChartInit(ctx) {
	let selTeam = teamDropdown.value;
	let selYear = teamYearDropdown.value;
	d3.json(`/api/barSingle/${selTeam}/${selYear}`).then((data) => {
		let rankData = [];

		// offensive
		rankData.push(data[0]['norm_ADJ_EM']);
		rankData.push(data[0]['norm_OE']);
		rankData.push(data[0]['norm_DE']);
		rankData.push(data[0]['norm_Tempo']);
		rankData.push(data[0]['norm_Exp']);
		rankData.push(data[0]['norm_Size']);

		barChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [ 'Adj EM','Tempo', 'OE', 'DE', 'Exp', 'Size' ],
				datasets: [
					{
						label: selTeam,
						data: rankData,
						backgroundColor: '#00009c',
						borderColor: '#000000',
						borderWidth: '2',
						hoverBorderColor: 'BD3D8B',
						hoverBackgroundColor: 'EBDF7C'
					}
				]
			}
		});
	});
}

function makeDoubleBarChartInit(ctx) {
	let selTeamHome = homeTeamDropdown.value;
	let selYearHome = homeYearDropdown.value;
	let selTeamAway = awayTeamDropdown.value;
	let selYearAway = awayYearDropdown.value;
	d3.json(`/api/barDouble/${selTeamHome}/${selYearHome}/${selTeamAway}/${selYearAway}`).then((data) => {
		let data1 = [];
		let data2 = [];

		// offensive
		data1.push(data[0]['norm_ADJ_EM']);
		data1.push(data[0]['norm_OE']);
		data1.push(data[0]['norm_DE']);
		data1.push(data[0]['norm_Tempo']);
		data1.push(data[0]['norm_Exp']);
		data1.push(data[0]['norm_Size']);

		data2.push(data[1]['norm_ADJ_EM']);
		data2.push(data[1]['norm_OE']);
		data2.push(data[1]['norm_DE']);
		data2.push(data[1]['norm_Tempo']);
		data2.push(data[1]['norm_Exp']);
		data2.push(data[1]['norm_Size']);

		doubleBarChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [ 'Adj EM','Tempo', 'OE', 'DE', 'Exp', 'Size' ],
				datasets: [
					{
						label: `${selYearHome} ${selTeamHome}`,
						data: data1,
						backgroundColor: '#7BAFD4',
						borderColor: '#000000',
						borderWidth: '2',
						hoverBackgroundColor: [ '#355AB6', '#355AB6', '#355AB6', '#355AB6', '#355AB6', '#355AB6' ]
					},
					{
						label: `${selYearAway} ${selTeamAway}`,
						data: data2,
						backgroundColor: '#BD3D8B',
						borderColor: '#000000',
						borderWidth: '2',
						hoverBackgroundColor: [ '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA' ]
					}
				]
			}
		});
	});
}

function makeBarChart(data, selTeam) {
	let rankData = [];

	// offensive
	rankData.push(data[0]['norm_ADJ_EM']);
	rankData.push(data[0]['norm_OE']);
	rankData.push(data[0]['norm_DE']);
	rankData.push(data[0]['norm_Tempo']);
	rankData.push(data[0]['norm_Exp']);
	rankData.push(data[0]['norm_Size']);

	barChart.data = {
		labels: [ 'Adj EM','Tempo', 'OE', 'DE', 'Exp', 'Size' ],
		datasets: [
			{
				label: selTeam,
				data: rankData,
				backgroundColor: '#00009c',
				borderColor: '#000000',
				borderWidth: '2',
				hoverBorderColor: '#BD3D8B',
				hoverBackgroundColor: [ '#EBDF7C', '#EBDF7C' ]
			}
		]
	};
	barChart.update();
}

function makeDoubleBarChart(data, homeTeam, homeYear, awayTeam, awayYear) {
	let data1 = [];
	let data2 = [];


	
	// offensive
	data1.push(data[0]['norm_ADJ_EM']);
	data1.push(data[0]['norm_OE']);
	data1.push(data[0]['norm_DE']);
	data1.push(data[0]['norm_Tempo']);
	data1.push(data[0]['norm_Exp']);
	data1.push(data[0]['norm_Size']);

	data2.push(data[1]['norm_ADJ_EM']);
	data2.push(data[1]['norm_OE']);
	data2.push(data[1]['norm_DE']);
	data2.push(data[1]['norm_Tempo']);
	data2.push(data[1]['norm_Exp']);
	data2.push(data[1]['norm_Size']);

	doubleBarChart.data = {
		labels: [ 'Adj EM','Tempo', 'OE', 'DE', 'Exp', 'Size' ],
		datasets: [
			{
				label: `${homeYear} ${homeTeam}`,
				data: data1,
				backgroundColor: '#7BAFD4',
				borderColor: '#000000',
				borderWidth: '2',
				hoverBackgroundColor: [ '#355AB6', '#355AB6', '#355AB6', '#355AB6', '#355AB6', '#355AB6' ]
			},
			{
				label: `${awayYear} ${awayTeam}`,
				data: data2,
				backgroundColor: '#BD3D8B',
				borderColor: '#000000',
				borderWidth: '2',
				hoverBackgroundColor: [ '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA', '#E8CBEA' ]
			}
		]
	};
	doubleBarChart.update();
}
