import React, { useRef } from "react";
import { useEffect } from "react";
import * as echarts from "echarts";
import PropTypes from "prop-types";

const Charts = (props) => {
  const chartRef = useRef(null);

  //Echart construction
  useEffect(() => {
    let myChart;

    if (chartRef.current !== null) {
      myChart = echarts.init(chartRef.current, null, {
        width: 1000,
        height: 600,
      });
    }

    function resizeChart() {
      myChart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    myChart.showLoading();

    myChart.config = {
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "insideBottom",
      distance: 15,
      onChange: function () {
        const labelOption = {
          rotate: myChart.config.rotate,
          align: myChart.config.align,
          verticalAlign: myChart.config.verticalAlign,
          position: myChart.config.position,
          distance: myChart.config.distance,
        };
        myChart.setOption({
          series: [
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
            {
              label: labelOption,
            },
          ],
        });
      },
    };

    return () => {
      myChart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  // Echart update
  useEffect(() => {
    let myChart;
    if (chartRef.current !== null) {
      myChart = echarts.getInstanceByDom(chartRef.current);

      const labelOption = {
        show: true,
        position: myChart.config.position,
        distance: myChart.config.distance,
        align: myChart.config.align,
        verticalAlign: myChart.config.verticalAlign,
        rotate: myChart.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {},
        },
      };

      // Draw the chart
      myChart.hideLoading();
      myChart.setOption({
        title: {
          text: "Daily Visitors of 2021 and 2022",
        },
        legend: {
          data: ["2021", "2022"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "30%"],
        },
        series: [
          {
            type: "line",
            label: labelOption,
            smooth: 0.6,
            symbol: "none",
            lineStyle: {
              color: "#5470C6",
              width: 5,
            },
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
            },
            areaStyle: {},
            data: props.data.slice(0, 365),
          },
          {
            type: "line",
            label: labelOption,
            smooth: 0.6,
            symbol: "none",
            lineStyle: {
              color: "#5470C6",
              width: 5,
            },
            markLine: {
              symbol: ["none", "none"],
              label: { show: false },
              data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
            },
            areaStyle: {},
            data: props.data.slice(365),
          },
        ],
      });
    }
  }, [props.data]);

  // Data fetching
  useEffect(() => {
    //Query Report for Google Api
    const queryReport = () => {
      //(1)
      window.gapi.client
        .request({
          path: "/v4/reports:batchGet",
          root: "https://analyticsreporting.googleapis.com/",
          method: "POST",
          body: {
            reportRequests: [
              {
                // eslint-disable-next-line no-undef
                viewId: process.env.REACT_APP_VIEW_ID, //enter your view ID here
                dateRanges: [
                  {
                    startDate: "2021-01-30",
                    endDate: "2022-08-20",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:1dayUsers",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:date",
                  },
                ],
              },
            ],
          },
        })
        .then((response) => {
          //(2)
          const queryResult = response.result.reports[0].data.rows;
          const values = queryResult.map(
            (value) => value["metrics"][0]["values"][0]
          );

          props.setData(values);
        }, console.error.bind(console));
    };

    queryReport();
  }, [props.setData]);

  return <div className="ChartsDaily" ref={chartRef}></div>;
};

Charts.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default Charts;
