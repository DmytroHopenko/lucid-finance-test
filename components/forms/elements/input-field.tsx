import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Path, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface InputFieldProps<T extends z.ZodTypeAny> {
  label?: string;
  placeholder?: string;
  name: Path<z.infer<T>>;
  form: UseFormReturn<z.infer<T>>;
  className?: string;
}

export const InputField = <T extends z.ZodTypeAny>({
  form,
  label,
  name,
  placeholder,
  className,
  ...rest
}: InputFieldProps<T> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "form">) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-0">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className={className}
              {...field}
              {...rest}
              value={typeof field.value === "string" || typeof field.value === "number" ? field.value : ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
