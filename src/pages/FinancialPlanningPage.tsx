import BudgetSetting from "@/components/financialPlanning/BudgetSetting";
import SpendingManagement from "@/components/financialPlanning/SpendingManagement";

const FinancialPlanningPage: React.FC = () => {
  return (
    <div className="flex justify-end gap-2 px-4 bg-foreground">
      <SpendingManagement />
      <BudgetSetting />
    </div>
  );
};
export default FinancialPlanningPage;
