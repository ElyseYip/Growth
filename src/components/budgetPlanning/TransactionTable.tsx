import type { Transaction } from "@/reducer/budgetPlanningSlice";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAppSelector } from "@/hooks/useReducer";
import { categoryColors } from "@/data/categories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MdMoreHoriz } from "react-icons/md";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface Props {
  transactions?: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ transactions = [] }: Props) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const filteredAndSortedTransaction = useAppSelector(
    (state) => state.budgetPlanning.transactionData
  );

  console.log("filteredAndSortedTransaction", filteredAndSortedTransaction);

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const deleteTransaction = (id: string) => {
    console.log(id);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px">
              <Checkbox />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date{" "}
                {sortConfig.field === "date" &&
                  (sortConfig.direction === "asc" ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                Category{" "}
                {sortConfig.field === "category" &&
                  (sortConfig.direction === "asc" ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <div className="flex items-center justify-end">
                Amount{" "}
                {sortConfig.field === "amount" &&
                  (sortConfig.direction === "asc" ? (
                    <FaChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <FaChevronDown className="ml-1 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="w-[50px" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTransaction.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No Transactions Found
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedTransaction.map((transaction) => {
              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.date}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-2 py-1 rounded text-white text-sm"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">{`$ ${transaction.amount}`}</TableCell>
                  <TableCell className="text-right font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MdMoreHoriz />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel onClick={() => {}}>
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
