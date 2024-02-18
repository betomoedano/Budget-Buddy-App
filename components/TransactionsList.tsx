import { Text, TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";

export default function TransactionList({
  transactions,
  categories,
  deleteTransaction,
}: {
  categories: Category[];
  transactions: Transaction[];
  deleteTransaction: (id: number) => Promise<void>;
}) {
  return (
    <View style={{ gap: 15 }}>
      {transactions.map((transaction) => {
        const categoryForCurrentItem = categories.find(
          (category) => category.id === transaction.category_id
        );
        return (
          <TouchableOpacity
            key={transaction.id}
            activeOpacity={0.7}
            onLongPress={() => deleteTransaction(transaction.id)}
          >
            <TransactionListItem
              transaction={transaction}
              categoryInfo={categoryForCurrentItem}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
