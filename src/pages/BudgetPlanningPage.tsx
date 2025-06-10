import AccountChart from "@/components/budgetPlanning/AccountChart";
import BudgetingHeader from "@/components/budgetPlanning/BudgetingHeader";
import BudgetSetting from "@/components/budgetPlanning/BudgetSetting";
import SpendingManagement from "@/components/budgetPlanning/SpendingManagement";
import TransactionTable from "@/components/budgetPlanning/TransactionTable";

const FinancialPlanningPage: React.FC = () => {
  return (
    <div className="flex-col px-4 ">
      <div className="flex justify-end gap-2 px-4">
        <SpendingManagement />
        <BudgetSetting />
      </div>
      <BudgetingHeader />
      <AccountChart />
      <TransactionTable />
    </div>
  );
};
export default FinancialPlanningPage;
