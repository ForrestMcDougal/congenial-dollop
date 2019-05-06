let mlScatter;

function makeMLScatterInit(ctx) {
    let team1 = homeTeamDropdown.value;
    let year1 = homeYearDropdown.value;
    let team2 = awayTeamDropdown.value;
    let year2 = awayYearDropdown.value;
	d3.json(`/api/predictions/${team1}/${year1}/${team2}/${year2}`).then((predictData) => {
		let homePoints = predictData['home_points'].map((d) => +d);
        let awayPoints = predictData['away_points'].map((d) => +d);
        let minHome = Math.min(...homePoints);
        let maxHome = Math.max(...homePoints);
        let minAway = Math.min(...awayPoints);
        let maxAway = Math.max(...awayPoints);
        let overallMin = Math.min(minHome, minAway) - 5;
        let overallMax = Math.max(maxHome, maxAway) + 5;
        console.log(overallMin);
        console.log(overallMax);
        let dataPoints = []
        for (let i = 0; i < homePoints.length; i++) {
            dataPoints.push({x: homePoints[i], y: awayPoints[i]});
        }
        let options = {
				tooltips: {
					label: function(tooltipItem) {
						return `${team1}: ${Number(tooltipItem.xLabel)}, ${team2}: ${Number(tooltipItem.yLabel)}`
					}
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            displayString: true,
                            labelString: `${team1} Points`
                        },
                        ticks: {
                            suggestedMin: overallMin,
                            suggestedMax: overallMax
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            displayString: true,
                            labelString: `${team2} Points`
                        },
                        ticks: {
                            suggestedMin: overallMin,
                            suggestedMax: overallMax
                        }
                    }]

                }
        };

		mlScatter = new Chart(ctx, {
			type: 'scatter',
			data: {
				datasets: [{
                    data: dataPoints
				}]
            },
            options: options
		});


    });
}

function makeMLScatter(data) {
    let homePoints = predictData['home_points'].map((d) => +d);
    let awayPoints = predictData['away_points'].map((d) => +d);
    let minHome = Math.min(...homePoints);
    let maxHome = Math.max(...homePoints);
    let minAway = Math.min(...awayPoints);
    let maxAway = Math.max(...awayPoints);
    let overallMin = Math.min([minHome, minAway]) - 5;
    let overallMax = Math.max([maxHome, maxAway]) + 5;
    let dataPoints = []
    for (let i = 0; i < homePoints.length; i++) {
        dataPoints.push({x: homePoints[i], y: awayPoints[i]});
    }
    let options = {
        tooltips: {
            label: function(tooltipItem) {
                return `${team1}: ${Number(tooltipItem.xLabel)}, ${team2}: ${Number(tooltipItem.yLabel)}`
            }
        },
        scales: {
            xAxes: {
                scaleLabel: {
                    displayString: true,
                    labelString: `${team1} Points`
                },
                ticks: {
                    min: overallMin,
                    max: overallMax
                }
            },
            yAxes: {
                scaleLabel: {
                    displayString: true,
                    labelString: `${teams2} Points`
                },
                ticks: {
                    min: overallMin,
                    max: overallMax
                }
            }
    }
    }   
    mlScatter.data = {
            datasets: [{
                data: [{
                    x: homePoints,
                    y: awayPoints,
                }]
            }]
        };
    mlScatter.options = options;
    mlScatter.update()
}