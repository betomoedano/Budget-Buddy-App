import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Category, Transaction } from "../types";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryColors, categoryEmojies } from "../constants";
import Card from "./ui/Card";

interface TransactionListItemProps {
  transaction: Transaction;
  categoryInfo: Category | undefined;
}

export default function TransactionListItem({
  transaction,
  categoryInfo,
}: TransactionListItemProps) {
  const iconName =
    transaction.type === "Expense" ? "minuscircle" : "pluscircle";
  const color = transaction.type === "Expense" ? "red" : "green";
  const categoryColor = categoryColors[categoryInfo?.name ?? "Default"];
  const emoji = categoryEmojies[categoryInfo?.name ?? "Default"];
  return (
    <Card>
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 3 }}>
          <Amount
            amount={transaction.amount}
            color={color}
            iconName={iconName}
          />
          <CategoryItem
            categoryColor={categoryColor}
            categoryInfo={categoryInfo}
            emoji={emoji}
          />
        </View>
        <TransactionInfo
          date={transaction.date}
          description={transaction.description}
          id={transaction.id}
        />
      </View>
    </Card>
  );
}

function TransactionInfo({
  id,
  date,
  description,
}: {
  id: number;
  date: number;
  description: string;
}) {
  return (
    <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{description}</Text>
      <Text>Transaction number {id}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {new Date(date * 1000).toDateString()}
      </Text>
    </View>
  );
}

function CategoryItem({
  categoryColor,
  categoryInfo,
  emoji,
}: {
  categoryColor: string;
  categoryInfo: Category | undefined;
  emoji: string;
}) {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryInfo?.name}
      </Text>
    </View>
  );
}

function Amount({
  iconName,
  color,
  amount,
}: {
  iconName: "minuscircle" | "pluscircle";
  color: string;
  amount: number;
}) {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={18} color={color} />
      <AutoSizeText
        fontSize={32}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={[styles.amount, { maxWidth: "80%" }]}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
