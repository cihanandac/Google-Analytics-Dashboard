import React from "react";

import { useEffect } from "react";

const Charts = (data, setData) => {
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
                    startDate: "2021-01-01",
                    endDate: "2022-09-10",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:30dayUsers",
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
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response) => {
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
  }, [setData]);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <div>
      {/* {data.map((row) => (
        <div key={row.date}>
          <div>{`${row.date}: ${row.visits} visits`}</div>
        </div>
      ))} */}
    </div>
  );
};

export default Charts;
