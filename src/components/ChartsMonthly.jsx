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
      myChart = echarts.init(chartRef.current, null, {});
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
          text: "Monthly Visitors of 2021 and 2022",
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
          axisTick: { show: false },
          data: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "2021",
            type: "bar",
            data: props.data.slice(0, 12),
            barGap: 0,
            label: labelOption,
          },
          {
            name: "2022",
            type: "bar",
            data: props.data.slice(12),
            barGap: 0,
            label: labelOption,
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
                    endDate: "2022-08-23",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:30dayUsers",
                  },
                ],
                dimensions: [
                  {
                    name: "ga:yearMonth",
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

  return <div className="ChartsMonthly" ref={chartRef}></div>;
};

Charts.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default Charts;
