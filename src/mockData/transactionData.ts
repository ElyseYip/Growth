import type { Transaction } from "@/reducer/budgetPlanningSlice";

export const transactionData: Transaction[] = [
  {
    id: "1",
    date: "2023-10-01",
    description: "Grocery Shopping",
    category: "transportation",
    amount: 150.0,
    type: "expense",
  },
  {
    id: "2",
    date: "2023-10-02",
    description: "Salary Payment",
    category: "groceries",
    amount: 3000.0,
    type: "income",
  },
  {
    id: "3",
    date: "2023-10-03",
    description: "Electricity Bill",
    category: "utilities",
    amount: 75.0,
    type: "expense",
  },
  {
    id: "4",
    date: "2023-10-04",
    description: "Internet Bill",
    category: "utilities",
    amount: 50.0,
    type: "expense",
  },
  {
    id: "5",
    date: "2023-10-05",
    description: "Dining Out",
    category: "food",
    amount: 60.0,
    type: "expense",
  },
];
