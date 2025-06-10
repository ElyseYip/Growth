import { transactionData } from "@/mockData/transactionData";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

export interface SetBudget {
  amount: number;
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
}

interface BudgetPlanningData {
  transactionData: Transaction[];
  budgetSetData: SetBudget;
}

const initialState: BudgetPlanningData = {
  transactionData: transactionData,
  budgetSetData: { amount: 0, period: "monthly" },
};

export const budgetPlanningSlice = createSlice({
  name: "budgetPlanning",
  initialState,
  reducers: {
    filterDeletedTransactionData: (
      state,
      action: PayloadAction<Transaction[]>
    ) => {
      state.transactionData = [...action.payload];
    },
    appendTransation: (state, action: PayloadAction<Transaction>) => {
      state.transactionData = [...state.transactionData, action.payload];
    },
    budgetSetting: (state, action: PayloadAction<SetBudget>) => {
      state.budgetSetData = { ...action.payload };
    },
  },
});

export const { appendTransation, budgetSetting, filterDeletedTransactionData } =
  budgetPlanningSlice.actions;
export const selectTransactionData = (state: {
  budgetPlanning: BudgetPlanningData;
}) => state.budgetPlanning.transactionData;
export default budgetPlanningSlice.reducer;
