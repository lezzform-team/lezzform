import { ReactNode } from "react";
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { ZodType } from "zod";

interface Props<T extends FieldValues = Record<string, unknown>>
  extends UseFormProps<T> {
  onSubmit: (values: T) => unknown;
  children: (form: UseFormReturn<T>) => ReactNode | undefined;
  zodSchema: ZodType;
  id?: string;
}

function LezzformComponent<T extends FieldValues = Record<string, unknown>>({
  defaultValues,
  onSubmit,
  children,
  id,
  zodSchema,
  ...rest
}: Props<T>) {
  const form = useForm<T>({
    defaultValues,
    resolver: zodResolver(zodSchema),
    ...rest,
  });

  return (
    <Form key={id} {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children(form)}</form>
    </Form>
  );
}

export const Lezzform = LezzformComponent as typeof LezzformComponent;
