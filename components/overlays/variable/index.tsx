"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVariableStore } from "@/lib/store/variable-store";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { variableSchema } from "@/lib/validations";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/forms/elements/input-field";

export const VariableOverlay = () => {
  const form = useForm<z.infer<typeof variableSchema>>({
    resolver: zodResolver(variableSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });
  const { open, closeOverlay, variables, addActiveVariable } =
    useVariableStore();
  const memoizedVariables = useMemo(() => variables, [variables]);

  const handleSelectVariable = useCallback(
    (id: string) => {
      const selected = variables.find((v) => v.id === id);
      if (selected) {
        addActiveVariable(selected);
        closeOverlay();
      }
    },
    [variables, addActiveVariable, closeOverlay]
  );

  const onSubmit = (values: z.infer<typeof variableSchema>) => {
    const newVariable = {
      id: uuidv4(),
      name: values.name || "New variable",
      category: "",
      value: values.value || "",
      formula: "",
    };

    addActiveVariable(newVariable);

    form.reset();
    closeOverlay();
  };

  return (
    <Dialog open={open} onOpenChange={closeOverlay}>
      <DialogContent className="w-full !max-w-[340px] h-[300px]">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Manage your variables
          </DialogTitle>
          <DialogDescription>
            Here you can add active variables
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <h2 className="text-lg font-bold mb-5">Select existing variable</h2>
          <Select onValueChange={handleSelectVariable}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Variable" />
            </SelectTrigger>
            <SelectContent className="h-[200px]">
              {memoizedVariables.map((variable) => (
                <SelectItem key={variable.id} value={variable.id}>
                  {variable.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <h2 className="text-lg font-bold">Add new variable</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-center">
            <InputField
              form={form}
              placeholder="Tag Name"
              name="name"
            />
            <InputField
              form={form}
              placeholder="Tag Value"
              name="value"
            />
            <Button variant="link" type="submit">
              <IoIosAddCircleOutline className="size-6 text-lucid-main" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
