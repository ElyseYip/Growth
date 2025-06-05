import BudgetingHeader from "@/components/budgetPlanning/BudgetingHeader";
import BudgetSetting from "@/components/budgetPlanning/BudgetSetting";
import SpendingManagement from "@/components/budgetPlanning/SpendingManagement";
import TransactionTable from "@/components/budgetPlanning/TransactionTable";
import { transactionData } from "@/mockData/transactionData";

const FinancialPlanningPage: React.FC = () => {
  const transactions = transactionData;
  return (
    <div className="flex-col px-4 ">
      <div className="flex justify-end gap-2 px-4">
        <SpendingManagement />
        <BudgetSetting />
      </div>
      <BudgetingHeader />
      <TransactionTable transactions={transactions} />
    </div>
  );
};
export default FinancialPlanningPage;
