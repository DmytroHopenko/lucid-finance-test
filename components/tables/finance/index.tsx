"use client";

import { FormulaInput } from "@/components/forms/elements/formula-input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVariableStore } from "@/lib/store/variable-store";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

export const FinanceTable = () => {
  const { activeVariables, openOverlay, removeActiveVariable } = useVariableStore();

  return (
    <>
      <Table className="w-[700px] lg:w-full mx-auto lg:mx-0">
        <TableCaption>{activeVariables.length > 0 ? "A list of your variables." : "No variables yet"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Variable</TableHead>
            <TableHead className="w-[100px]">Value</TableHead>
            <TableHead>Formula</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeVariables.map(({ id, name, value }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{value}</TableCell>
              <TableCell><FormulaInput /></TableCell>
              <TableCell className="text-right"><Button onClick={() => removeActiveVariable(id)} variant="destructive"><FaTrash />
              </Button></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-medium">
              <Button
                variant="link"
                className="!px-0 hover:text-lucid-main cursor-pointer"
                onClick={openOverlay}
              >
                Add new variable{" "}
                <IoIosAddCircleOutline className="size-6 text-lucid-main" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
