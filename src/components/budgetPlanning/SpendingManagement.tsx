import Button from "@/UI/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button as ShadcnButton } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, type TransactionFormData } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CiCalendar } from "react-icons/ci";
import { Calendar } from "../ui/calendar";

const SpendingManagement: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: "",
      description: "",
      date: new Date(),
    },
  });

  const type = watch("type");
  const date = watch("date");

  const onSubmit = (data: TransactionFormData) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex justify-center md:justify-end items-center">
            <Button
              className="text-white"
              buttonText="Add Transaction"
              btnColor="bg-blue-500"
            />
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="flex justify-center">
                Add Transaction
              </DrawerTitle>
            </DrawerHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  onValueChange={(value: "EXPENSE" | "INCOME") =>
                    setValue("type", value)
                  }
                  defaultValue={type}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                  </SelectContent>
                </Select>

                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue={getValues("category")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                    <SelectItem value="INCOME">Income</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 flex-col">
                <label className="text-sm font-medium">Date</label>

                <Popover>
                  <PopoverTrigger asChild>
                    <ShadcnButton
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal flex justify-between",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CiCalendar size={20} />
                    </ShadcnButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date: Date | undefined) => {
                        if (date) {
                          setValue("date", date);
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                    {/* <DateComponent /> */}
                  </PopoverContent>
                </Popover>

                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Enter description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </form>
            <DrawerFooter>
              <Button
                buttonText="Submit"
                onClick={handleSubmit(onSubmit)}
                btnColor="bg-blue-500"
                type="submit"
              />
              <DrawerClose asChild>
                <Button
                  buttonText="Cancel"
                  //   onClick={closeDrawer}
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

export default SpendingManagement;
