"use client";

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
import { NameField } from "./components/name-field";
import { ValueField } from "./components/value-field";
import { FormulaField } from "./components/formula-field";

export const FinanceTable = () => {
  const { activeVariables, openOverlay, removeActiveVariable } =
    useVariableStore();

  return (
    <>
      <Table className="w-[700px] lg:w-full mx-auto lg:mx-0">
        <TableCaption>
          {activeVariables.length > 0
            ? "A list of your variables."
            : "No variables yet"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Variable</TableHead>
            <TableHead className="w-[100px]">Value</TableHead>
            <TableHead>Formula</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeVariables.map((variable) => (
            <TableRow key={variable.id}>
              <TableCell>
                <NameField
                  id={variable.id}
                  tag={variable.name}
                  variable={variable}
                />
              </TableCell>
              <TableCell>
                <ValueField
                  id={variable.id}
                  tagValue={variable.value}
                  variable={variable}
                />
              </TableCell>
              <TableCell>
                <FormulaField
                  id={variable.id}
                  formula={variable.formula}
                  variable={variable}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => removeActiveVariable(variable.id)}
                  variant="destructive"
                >
                  <FaTrash />
                </Button>
              </TableCell>
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
