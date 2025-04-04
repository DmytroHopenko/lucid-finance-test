"use client";

import { useVariableStore } from "@/lib/store/variable-store";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/forms/elements/input-field";
import { nameFieldSchema } from "@/lib/validations";
import { EditableVariable } from "@/types";

interface NameFieldProps {
  id: string;
  tag: string;
  variable: Omit<EditableVariable, "name">;
}

export const NameField = ({ id, tag, variable }: NameFieldProps) => {
  const form = useForm<z.infer<typeof nameFieldSchema>>({
    resolver: zodResolver(nameFieldSchema),
    defaultValues: {
      name: tag,
    },
  });
  const { updateActiveVariable } = useVariableStore();

  const onUpdate = (values: z.infer<typeof nameFieldSchema>) => {
    const updatedVariable = {
      ...variable,
      name: values.name,
    };

    updateActiveVariable(id, updatedVariable);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdate)}>
        <InputField form={form} name="name" className="!border-0 !shadow-none" onBlur={() => form.handleSubmit(onUpdate)()}/>
      </form>
    </Form>
  );
};
