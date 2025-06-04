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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, type FormEvent } from "react";

interface Props {}
const BudgetSetting: React.FC<Props> = (Props) => {
  const [targetBudget, setTargetBudget] = useState(0);
  const [targetPeriod, setTargetPeriod] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});

  const handleTargetBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setTargetBudget(value);
  };

  const handleTagetPeriodChange = (value: string) => {
    setTargetPeriod(value);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setError({});
  };

  const handleSubmit = () => {
    if (!targetBudget || !targetPeriod) {
      setError((prev) => ({
        ...prev,
        targetBudget: !targetBudget ? "required" : "",
        targetPeriod: !targetPeriod ? "required" : "",
      }));
      return;
    }

    setError({});
    setTargetBudget(0);
    setTargetPeriod("");
    closeDrawer();
  };
  return (
    <>
      <Drawer
        dismissible={false}
        open={openDrawer}
        onOpenChange={setOpenDrawer}
      >
        <DrawerTrigger asChild>
          <div className="flex justify-center md:justify-end items-center">
            <Button
              className="text-white"
              buttonText="Set Budget"
              btnColor="bg-blue-500"
            />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="flex justify-center">
                Your Target Budgeting Goal
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex mx:flex-col justify-center items-center gap-2">
              <div>
                <Input
                  type="number"
                  placeholder="100,000"
                  className="min-w-[200px]"
                  onChange={handleTargetBudgetChange}
                  value={targetBudget ? targetBudget.toString() : ""}
                />
                <p
                  className={`h-6 ${
                    error.targetBudget ? "visibile" : "invisible"
                  }`}
                >
                  {error.targetBudget}
                </p>
              </div>
              <div>
                <Select
                  onValueChange={handleTagetPeriodChange}
                  value={targetPeriod}
                >
                  <SelectTrigger className="min-w-[200px]">
                    <SelectValue placeholder="Select a target period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Period</SelectLabel>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p
                  className={`h-6 ${
                    error.targetPeriod ? "visibile" : "invisible"
                  }`}
                >
                  {error.targetPeriod}
                </p>
              </div>
            </div>

            <DrawerFooter>
              <Button
                buttonText="Submit"
                onClick={handleSubmit}
                btnColor="bg-blue-500"
                type="submit"
              />

              <DrawerClose asChild>
                <Button
                  buttonText="Cancel"
                  onClick={closeDrawer}
                  btnColor="bg-blue-500"
                />
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BudgetSetting;
