import { useEffect, useState } from "react";
import { WfhBalanceInfo } from "../Types";
import { ID_KEY, WfhType } from "../Constants";
import { getWfhBalance } from "../service/WfhDetailService";
import { Doughnut } from "react-chartjs-2";
import { ChartData, Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import { generateNewColor } from "../utility/ColorGenerationUtility";
import { ChartOptions } from "chart.js";
import { useAuth0 } from "@auth0/auth0-react";
Chart.register(ArcElement, Tooltip, Legend);

function WfhBalanceChart() {
  const defaultWfhBalanceInfo = {
    remainingWfhQuantityMap: new Map<WfhType, number>(),
    availedWfhQuantityMap: new Map<WfhType, number>(),
    pendingWfhQuantityMap: new Map<WfhType, number>(),
  };

  const defaultChartData = {
    labels: [],
    datasets: [
      {
        label: "WFH Balance Chart",
        data: [],
        backgroundColor: [],
        hoverOffset: 5,
      },
    ],
  };

  const [wfhBalanceInfo, setWfhBalanceInfo] = useState<WfhBalanceInfo>(
    defaultWfhBalanceInfo
  );
  const [chartData, setChartData] =
    useState<ChartData<"doughnut">>(defaultChartData);

  const {getAccessTokenSilently} = useAuth0();

  const fetchWfhBalance = async () => {
    const loggedInId: string = sessionStorage.getItem(ID_KEY) || "";
    const token = await getAccessTokenSilently();
    const wfhBalanceData: WfhBalanceInfo = await getWfhBalance(loggedInId, token);
    setWfhBalanceInfo(wfhBalanceData);
  };

  useEffect(() => {
    fetchWfhBalance();
  }, []);

  useEffect(() => {
    createChartData();
  }, [wfhBalanceInfo]);

  const createChartData = () => {
    let labels: unknown[] | undefined = [];
    let backgroundColor: string[] = [];
    let data: number[] = [];

    Object.values(WfhType).forEach((wfhType) => {
      labels.push(`Availed ${wfhType}`);
      data.push(wfhBalanceInfo?.availedWfhQuantityMap.get(wfhType) ?? 0);
      backgroundColor.push(generateNewColor());

      labels.push(`Pending ${wfhType}`);
      data.push(wfhBalanceInfo.pendingWfhQuantityMap.get(wfhType) ?? 0);
      backgroundColor.push(generateNewColor());

      labels.push(`Remaining ${wfhType}`);
      data.push(wfhBalanceInfo.remainingWfhQuantityMap.get(wfhType) ?? 0);
      backgroundColor.push(generateNewColor());
    });

    const wfhChartData: ChartData<"doughnut"> = {
      labels: labels,
      datasets: [
        {
          label: "WFH Balance Chart",
          data: data,
          backgroundColor: backgroundColor,
          hoverOffset: 5,
        },
      ],
    };

    setChartData(wfhChartData);
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: true, position: 'left', labels: { color: "black" } },
    },
  };

  return (
    <>
      <Box
        sx={{
          minWidth: { lg: "30vw", md: "50%", sm: "60%" },
          maxWidth: { lg: "40vw", md: "70%", sm: "80%" },
          marginTop: "5vh",
        }}
      >
        <Typography component={"span"} variant="h5">
          WFH Balance
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <>
            <Doughnut data={chartData} options={options} />
          </>
        </Box>
      </Box>
    </>
  );
}

export default WfhBalanceChart;
