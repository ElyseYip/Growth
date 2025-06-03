import Button from "@/UI/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const FinancialPlanningPage: React.FC = () => {
  const [goal, setGoal] = useState(350);
  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }
  return (
    // <div className="px-4">
    //   <div className="flex justify-end">
    //     <Button
    //       onClick={() => {}}
    //       buttonText="Create New"
    //       btnColor="bg-blue-500" // Applied first
    //     />
    //   </div>
    // </div>
    <Drawer>
      <DrawerTrigger asChild>
        <Button buttonText="Open Drawer" onClick={() => {}} />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button buttonText="Decrease" onClick={() => onClick(-10)} />
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <Button buttonText="Increase" onClick={() => onClick(10)} />
            </div>
          </div>
          <DrawerFooter>
            <Button buttonText="Submit" onClick={() => {}} />
            <DrawerClose asChild>
              <Button buttonText="Submit" onClick={() => {}} />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default FinancialPlanningPage;
