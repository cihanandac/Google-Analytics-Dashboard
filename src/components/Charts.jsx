import React, { useRef } from "react";
import { useEffect } from "react";
import * as echarts from "echarts";

const Charts = (data, setData) => {
  const chartRef = useRef(null);

  useEffect(() => {
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
                viewId: process.env.REACT_APP_VIEW_ID, //enter your view ID here
                dateRanges: [
                  {
                    startDate: "2021-01-30",
                    endDate: "2022-08-20",
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
        .then(setResults, console.error.bind(console));
    };

    const setResults = (response) => {
      //(2)
      const queryResult = response.result.reports[0].data.rows;
      const result = queryResult.map((row) => {
        const dateSting = row.dimensions[0];
        const formattedDate = `${dateSting.substring(0, 4)}
        -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
        return {
          date: formattedDate,
          visits: row.metrics[0].values[0],
        };
      });
      setData(result);
    };

    queryReport();

    const myChart = echarts.init(chartRef.current, null, {
      width: 1000,
      height: 600,
    });

    const posList = [
      "left",
      "right",
      "top",
      "bottom",
      "inside",
      "insideTop",
      "insideLeft",
      "insideRight",
      "insideBottom",
      "insideTopLeft",
      "insideTopRight",
      "insideBottomLeft",
      "insideBottomRight",
    ];

    myChart.configParameters = {
      rotate: {
        min: -90,
        max: 90,
      },
      align: {
        options: {
          left: "left",
          center: "center",
          right: "right",
        },
      },
      verticalAlign: {
        options: {
          top: "top",
          middle: "middle",
          bottom: "bottom",
        },
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {}),
      },
      distance: {
        min: 0,
        max: 100,
      },
    };

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
    myChart.setOption({
      title: {
        text: "ECharts Getting Started Example",
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
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          barGap: 0,
          label: labelOption,
        },
        {
          name: "2022",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          barGap: 0,
          label: labelOption,
        },
      ],
    });
  }, [setData]);

  return (
      <div ref={chartRef}></div>
  );
};

export default Charts;
