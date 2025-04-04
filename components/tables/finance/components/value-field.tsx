"use client";

import { useVariableStore } from "@/lib/store/variable-store";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/forms/elements/input-field";
import { valueFieldSchema } from "@/lib/validations";
import { EditableVariable } from "@/types";
import { useEffect } from "react";

interface ValueFieldProps {
  id: string;
  tagValue: string;
  variable: Omit<EditableVariable, "value">;
}

export const ValueField = ({ id, tagValue, variable }: ValueFieldProps) => {
  const form = useForm<z.infer<typeof valueFieldSchema>>({
    resolver: zodResolver(valueFieldSchema),
    defaultValues: {
      value: tagValue,
    },
  });
  const { updateActiveVariable } = useVariableStore();

  const onUpdate = (values: z.infer<typeof valueFieldSchema>) => {
    const updatedVariable = {
      ...variable,
      value: values.value,
    };

    updateActiveVariable(id, updatedVariable);
  };

  useEffect(() => {
    form.setValue("value", tagValue);
  }, [variable]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdate)}>
        <InputField
          form={form}
          value={tagValue}
          name="value"
          className="!border-0 !shadow-none"
          onBlur={() => form.handleSubmit(onUpdate)()}
        />
      </form>
    </Form>
  );
};
