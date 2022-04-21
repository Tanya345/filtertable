import React, { useRef, useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const widthArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
function Chart() {
	const chartRef = useRef(null);
	const [myWidth, setMyWidth] = useState('')
	useLayoutEffect(() => {

		let root = am5.Root.new("chartdiv");

		root.setThemes([
			am5themes_Animated.new(root)
		]);

		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panY: false,
				layout: root.verticalLayout
			})
		);

		let data = [{
			category: "Research",
			value1: 1000,
			value2: 588
		}, {
			category: "Marketing",
			value1: 1200,
			value2: 1800
		}, {
			category: "Sales",
			value1: 850,
			value2: 1230
		}];

		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {})
			})
		);

		let xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				renderer: am5xy.AxisRendererX.new(root, {}),
				categoryField: "category"
			})
		);
		xAxis.data.setAll(data);

		let series1 = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: "Series",
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: "value1",
				categoryXField: "category",
				fill: am5.color(0x095256),
				stroke: am5.color(0x095256)
			})
		);
		series1.data.setAll(data);

		let series2 = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: "Series",
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: "value2",
				categoryXField: "category"
			})
		);
		series2.data.setAll(data);


		console.log(series1.width)

		// Add legend
		let legend = chart.children.push(am5.Legend.new(root, {}));
		legend.data.setAll(chart.series.values);

		// Add cursor
		chart.set("cursor", am5xy.XYCursor.new(root, {}));
		// chartRef.current = chart;

		// series1.columns.template.setAll({
		// 	width: am5.percent(myWidth?myWidth:70)
		// });
		series1.columns.template.adapters.add("fill", function(fill, target) {
			if (target.dataItem.get("valueY") < 1500) {
			  return am5.color(0xff621f);
			}
			else {
			  return fill;
			}
		  });

		return () => {
			root.dispose();
		};
	}, []);

	// useLayoutEffect(() => {
	// 	chartRef.current.series.columns.template.setAll({
	// 		width: am5.percent(myWidth ? myWidth : 70)
	// 	});
	// }, [myWidth])

	return (
		<div className='d-flex flex-column justify-content-between'>
			<div>
				<div className="dropdown d-flex flex-column align-items-end">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						Stroke Width: {myWidth ? myWidth : ''}
					</button>
					<ul className="dropdown-menu overflow-auto" aria-labelledby="dropdownMenuButton1" style={{ height: 'auto' }}>
						{widthArr.map((w, i) => <li key={i}><button className="dropdown-item" onClick={() => setMyWidth(w)}>{w}</button></li>)}
					</ul>
				</div>
			</div>
			{/* <button class="btn btn-primary btn-sm" id="color-picker-2">Open Picker</button> */}
			<div id="chartdiv" style={{ width: "100%", height: "500px", alignSelf: "end" }}></div>
		</div>
	);
}
export default Chart;