export const processWeeklyData = (
  data: { dayOfWeek: number; total: number }[],
  transactionsType: "Income" | "Expense" = "Income"
) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const isIncome = transactionsType === "Income";

  let barData = days.map(
    (label) =>
      ({
        label,
        value: 0,
        frontColor: "#d1d5db", // default gray color for zero values
        gradientColor: "#d1d5db", // default gray color for zero values
      } as any)
  );

  data.forEach((item) => {
    // Assuming item.dayOfWeek is in the range 0-6 (matching SQLite %w output)
    const dayIndex = item.dayOfWeek;
    if (dayIndex >= 0 && dayIndex < 7) {
      barData[dayIndex].value = item.total;
      if (item.total < 100) {
        barData[dayIndex].frontColor = "#d1d5db"; // gray for zero values
        barData[dayIndex].gradientColor = "#d1d5db"; // gray for zero values
      } else {
        barData[dayIndex].frontColor = isIncome ? "#d3ff00" : "#ffab00"; // default income/expense colors
        barData[dayIndex].gradientColor = isIncome ? "#12ff00" : "#ff0000"; // default income/expense gradients
      }
    } else {
      console.error(`Invalid day of week index: ${item.dayOfWeek}`);
    }
  });

  return barData;
};
