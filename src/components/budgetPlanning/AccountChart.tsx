import { useAppSelector } from "@/hooks/useReducer";
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

const DATE_RANGES = {
  weekly: { label: "Last 7 Days", days: 7 },
  monthly: { label: "Last Month", days: 30 },
  quarterly: { label: "Last 3 Months", days: 90 },
  yearly: { label: "Last Year", days: 365 },
};

const AccountChart = () => {
  const budgetSetPeriod = useAppSelector(
    (state) => state.budgetPlanning?.budgetSetData?.period
  );

  const transactionData = useAppSelector(
    (state) => state.budgetPlanning.transactionData
  );

  type DayData = { date: string; income: number; expense: number };
  const filteredData: DayData[] = useMemo(() => {
    const range = DATE_RANGES[budgetSetPeriod];

    console.log("range", range);
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactionData.filter(
      (transaction: any) =>
        new Date(transaction.date) >= startDate &&
        new Date(transaction.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc: any, transaction: any) => {
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
    }, {});

    console.log("filteredData", filtered, grouped);

    return Object.values(grouped).sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [transactionData, budgetSetPeriod]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc: { income: number; expense: number }, day: DayData) => {
        return {
          income: acc.income + day.income,
          expense: acc.expense + day.expense,
        };
      },
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  console.log("period", budgetSetPeriod, totals);

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
