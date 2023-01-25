import React, { useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useLoaderData } from "react-router-dom";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

function generateNumberBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateFundPrice(old_price: number, volatility: number): number {
  const rnd = Math.random(); // generate number, 0 <= x < 1.0
  let change_percent = 2 * volatility * rnd;
  if (change_percent > volatility) change_percent -= 2 * volatility;
  const change_amount = old_price * change_percent;
  return parseFloat((old_price + change_amount).toFixed(2));
}

function generateFundData(
  days: number,
  starting_price: number
): { day: string; p1: number }[] {
  const fund_volatility = generateNumberBetween(2, 10) / 100;
  var list = [
    {
      day: dayjs("01-01").format("MM.DD"),
      p1: generateFundPrice(starting_price, fund_volatility),
    },
  ];
  for (let index = 1; index < days; index++) {
    list.push({
      day: dayjs(list[index - 1].day)
        .add(1, "day")
        .format("MM.DD"),
      p1: generateFundPrice(list[index - 1].p1, fund_volatility),
    });
  }
  return list;
}

function calculatePercentageShift(
  data: { day: string; p1: number }[],
  period: number,
  key: string
): number {
  const starting_price = data[data.length - (period + 1)].p1;
  const current_price = data[data.length - 1].p1;
  const percentage_shift = parseFloat(
    ((Math.abs(starting_price - current_price) / starting_price) * 100).toFixed(
      1
    )
  );
  if (starting_price > current_price) return percentage_shift * -1;
  else return percentage_shift;
}

const lineChartData = generateFundData(400, generateNumberBetween(0.1, 50));
const topLeftChartItems = ["ICM10", "S&P500"];
const topRightChartItems = [
  { label: "1d", percentage: calculatePercentageShift(lineChartData, 1, "") },
  { label: "1w", percentage: calculatePercentageShift(lineChartData, 7, "") },
  { label: "1m", percentage: calculatePercentageShift(lineChartData, 31, "") },
  { label: "1y", percentage: calculatePercentageShift(lineChartData, 365, "") },
  {
    label: "life",
    percentage: calculatePercentageShift(
      lineChartData,
      lineChartData.length - 1,
      ""
    ),
  },
];
const dateRanges = [1, 7, 31, 365];
const funds = [
  {
    title: "FintechX MiX 10 Gold",
  },
  {
    title: "FintechX MiX 10 Platinum",
  },
];

export async function loader({ request }: any) {
  console.log(request);
  const url = new URL(request.url);
  const fundId = parseInt(url.searchParams.get("fundId") || "0");
  return funds[fundId];
}

const Fund = () => {
  const fund = (useLoaderData() as { title: string }) || {
    title: "FintechX MiX 10 Gold",
  };
  const [chartData, setChartData] = useState({
    dateRangeType: 4,
    data: lineChartData,
  });

  return (
    <Container maxWidth="md" sx={{ pt: 12 }}>
      <Grid container columns={2}>
        <Grid xs={2} pb={6}>
          <Typography variant="h3" textAlign="center" fontWeight={300}>
            {fund.title}
          </Typography>
        </Grid>
        <Grid xs={1} alignItems="center" display="flex">
          <Stack direction="row" spacing={4}>
            <Typography>{dayjs().format("DD.MM.YYYY")}</Typography>
            {topLeftChartItems.map((item, index) => (
              <Typography key={index} color="primary">
                {item}
              </Typography>
            ))}
          </Stack>
        </Grid>
        <Grid xs={1} justifyContent="end" display="flex">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            width="fit-content"
            alignItems="end"
            spacing={1}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              width="fit-content"
              height="fit-content"
              spacing={1}
            >
              {topRightChartItems.map((item, index) => (
                <Stack direction="column" key={index}>
                  <Typography
                    variant="caption"
                    color="GrayText"
                    lineHeight={1}
                    fontSize="0.6rem"
                  >
                    {item.label}
                  </Typography>
                  {item.percentage < 0 ? (
                    <Typography variant="body2" color="error">
                      {item.percentage}%
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="primary">
                      +{item.percentage}%
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack>
            <Stack direction="column" px={2}>
              <Typography
                variant="caption"
                color="GrayText"
                lineHeight={1}
                fontSize="0.65rem"
              >
                Price
              </Typography>
              <Typography variant="h5" color="primary">
                ${lineChartData[lineChartData.length - 1].p1}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid xs={2} pt={4}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData.data.slice(
                -(chartData.dateRangeType !== dateRanges.length
                  ? dateRanges[chartData.dateRangeType] + 1
                  : 0)
              )}
            >
              <CartesianGrid strokeDasharray="2" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis
                orientation="right"
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                mirror={true}
              />
              <Tooltip
                isAnimationActive={false}
                formatter={(value, name, props) => [value, "price"]}
              />
              <Line type="linear" dataKey="p1" stroke="#1c73e8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
        <Grid xs={2} pt={3} display="flex" justifyContent="center">
          <ButtonGroup variant="outlined" color="primary" aria-label="">
            {topRightChartItems.map((item, index) => (
              <Button
                key={index}
                variant={
                  chartData.dateRangeType === index ? "contained" : "outlined"
                }
                onClick={() =>
                  setChartData({ ...chartData, dateRangeType: index })
                }
              >
                {(item.label !== "life" ? item.label : "all").toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Fund;
