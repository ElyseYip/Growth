import { useAppSelector } from "@/hooks/useReducer";
import type { Transaction } from "@/reducer/budgetPlanningSlice";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  income: number;
  expense: number;
}
const DATE_RANGES = {
  weekly: { label: "Last 7 Days", days: 7 },
  monthly: { label: "Last Month", days: 30 },
  quarterly: { label: "Last 3 Months", days: 90 },
  yearly: { label: "Last Year", days: 365 },
} as const;

type ValidBudgetSetPeriod = keyof typeof DATE_RANGES;

const AccountChart = () => {
  const budgetSetPeriod = useAppSelector(
    (state) => state.budgetPlanning?.budgetSetData?.period
  );

  const transactionData = useAppSelector(
    (state) => state.budgetPlanning.transactionData
  );

  const isValidBudgetSetPeriod = (
    value: any
  ): value is ValidBudgetSetPeriod => {
    return value in DATE_RANGES;
  };

  const filteredData: ChartData[] = useMemo(() => {
    const safePeriod: ValidBudgetSetPeriod = isValidBudgetSetPeriod(
      budgetSetPeriod
    )
      ? budgetSetPeriod
      : "weekly";

    const range = DATE_RANGES[safePeriod];

    const now = new Date();
    const startDate = range?.days
      ? startOfDay(subDays(now, range?.days))
      : startOfDay(new Date(0));

    const filtered = transactionData.filter(
      (transaction: Transaction) =>
        new Date(transaction.date) >= startDate &&
        new Date(transaction.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce(
      (acc: Record<string, ChartData>, transaction: Transaction) => {
        const date = format(new Date(transaction.date), "MMM dd");
        if (!acc[date]) {
          acc[date] = { date, income: 0, expense: 0 };
        }
        if (transaction.type === "income") {
          acc[date].income += transaction.amount;
        } else {
          acc[date].expense += transaction.amount;
        }
        return acc;
      },
      {} as Record<string, ChartData>
    );

    return (Object.values(grouped) as ChartData[]).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [transactionData, budgetSetPeriod]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (
        acc: { income: number; expense: number },
        dailyTransaction: ChartData
      ) => {
        return {
          income: acc.income + dailyTransaction.income,
          expense: acc.expense + dailyTransaction.expense,
        };
      },
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <>
      <div className="mb-10">
        <h1>Transaction Overview</h1>
        <div className="flex justify-around mb-6 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-green-500">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-bold text-red-500">
              ${totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Net</p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ${(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip formatter={(value) => [`$${value}`, undefined]} />
              <Legend />
              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* <Progress value={33} /> */}
      </div>
    </>
  );
};

export default AccountChart;
