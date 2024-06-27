import SegmentedControl from "@react-native-segmented-control/segmented-control";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import { useSQLiteContext } from "expo-sqlite/next";
import { processWeeklyData } from "../queries/ChartQuery";
import { SymbolView } from "expo-symbols";

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

export default function SummaryChart() {
  const db = useSQLiteContext();
  const [chartPeriod, setChartPeriod] = React.useState<Period>(Period.week);
  const [barData, setBarData] = React.useState<barDataItem[]>([]);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = React.useState<Date>(new Date());
  const [chartKey, setChartKey] = React.useState(0);
  const [transactionType, setTransactionType] = React.useState<
    "Income" | "Expense"
  >("Income");

  React.useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(currentDate);
        setCurrentEndDate(() => new Date(startDate));
        const data = await fetchWeeklyData(startDate, endDate, transactionType);
        console.log("Data before process", data);
        setBarData(processWeeklyData(data, transactionType));
        setChartKey((prev) => prev + 1);
      }
    };
    fetchData();
  }, [chartPeriod, currentDate, transactionType]);

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));
    return {
      startDate: Math.floor(startOfWeek.getTime()),
      endDate: Math.floor(endOfWeek.getTime()),
    };
  };

  const handlePreviousWeek = () => {
    setCurrentDate(
      () => new Date(currentDate.setDate(currentDate.getDate() - 7))
    );
  };

  const handleNextWeek = () => {
    setCurrentDate(
      () => new Date(currentDate.setDate(currentDate.getDate() + 7))
    );
  };

  // Fetch transactions for a specific week
  const fetchWeeklyData = async (
    startDate: number,
    endDate: number,
    type: "Income" | "Expense"
  ) => {
    try {
      const query = `
      SELECT 
        strftime('%w', date / 1000, 'unixepoch') AS day_of_week,
        SUM(amount) as total 
      FROM Transactions 
      WHERE date >= ? AND date <= ? AND type = ? 
      GROUP BY day_of_week
      ORDER BY day_of_week ASC
    `;

      const result = await db.getAllAsync<{
        day_of_week: number;
        total: number;
      }>(query, [startDate, endDate, type]);

      // Convert day_of_week (0-6) to match days array index (1-7)
      const formattedResult = result.map((item) => ({
        dayOfWeek: (item.day_of_week + 1) % 7, // Adjust index to match days array
        total: item.total,
      }));

      console.log(formattedResult);
      return formattedResult;
    } catch (e) {
      console.error("Error fetching weekly data:", e);
      return [];
    }
  };

  return (
    <View>
      {/* <SegmentedControl
        values={["Week", "Month", "Year"]}
        style={{ marginBottom: 16 }}
        selectedIndex={currentTab}
        onChange={(event) => {
          const index = event.nativeEvent.selectedSegmentIndex;
          if (index === 0) {
            setChartPeriod(Period.week);
          } else if (index === 1) {
            setChartPeriod(Period.month);
          } else {
            setChartPeriod(Period.year);
          }
        }}
      /> */}
      <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8 }}>
        {currentEndDate.toLocaleDateString("en-US", { month: "short" })}{" "}
        {currentEndDate.getDate()} -{" "}
        {currentDate.toLocaleDateString("en-US", { month: "short" })}{" "}
        {currentDate.getDate()}
      </Text>
      <Text style={{ color: "gray" }}>
        Total {transactionType === "Expense" ? "Spending" : "Income"}{" "}
      </Text>

      <Text style={{ fontWeight: "700", fontSize: 32, marginBottom: 16 }}>
        ${barData.reduce((total, item) => total + item.value, 0).toFixed(2)}
      </Text>
      <BarChart
        key={chartKey}
        data={barData}
        barWidth={18}
        height={200}
        width={290}
        minHeight={3}
        barBorderRadius={3}
        showGradient
        // frontColor={transactionType === "Expense" ? "#dc2626" : "#4f46e5"}
        // gradientColor={transactionType === "Expense" ? "#ea580c" : "#7c3aed"}
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
        // rulesColor={"#00000020"}
        // backgroundColor={"white"}
        // showGradient
        // gradientColor={"blue"}
        // barInnerComponent={() => (
        //   <View style={{ backgroundColor: "pink", height: "100%" }} />
        // )}
        // showLine
        // dashGap={0}
        // dashWidth={0}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={{ alignItems: "center" }}
        >
          <SymbolView
            name="chevron.left.circle.fill"
            size={40}
            type="hierarchical"
            tintColor={"gray"}
          />
          <Text style={{ fontSize: 11, color: "gray" }}>Prev week</Text>
        </TouchableOpacity>
        <SegmentedControl
          values={["Income", "Expense"]}
          style={{ width: 200 }}
          selectedIndex={transactionType === "Income" ? 0 : 1}
          onChange={(event) => {
            const index = event.nativeEvent.selectedSegmentIndex;
            if (index === 0) {
              setTransactionType("Income");
            } else {
              setTransactionType("Expense");
            }
          }}
        />
        <TouchableOpacity
          onPress={handleNextWeek}
          style={{ alignItems: "center" }}
        >
          <SymbolView
            name="chevron.right.circle.fill"
            size={40}
            type="hierarchical"
            tintColor={"gray"}
          />
          <Text style={{ fontSize: 11, color: "gray" }}>Next week</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
