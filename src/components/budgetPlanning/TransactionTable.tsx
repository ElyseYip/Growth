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

interface Props {
  transactions?: [];
}

const TransactionTable: React.FC<Props> = ({ transactions = [] }: Props) => {
  const filteredAndSortedTransaction = transactions;
  const handleSort = (date: string) => {
    console.log("date");
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
              <div className="flex items-center">Date</div>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">Category</div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <div className="flex items-center justify-end">Amount</div>
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
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="text-right">{`$ ${transaction.amount}`}</TableCell>
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
