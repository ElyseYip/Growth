import { useAppSelector } from "@/hooks/useReducer";

const BudgetingHeader: React.FC = () => {
  const budgetSetData = useAppSelector(
    (state) => state.budgetPlanning.budgetSetData
  );

  return (
    <div className=" px-4 ">
      <h1 className="text-4xl font-bold gradient-title mb-5 ">
        {`You have set a ${budgetSetData?.period} budget of $${budgetSetData?.amount}.`}
      </h1>
    </div>
  );
};
export default BudgetingHeader;
