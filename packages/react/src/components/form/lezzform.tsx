import { FormApi, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { ReactNode } from "react";

interface Props<T> {
  id?: string;
  onSubmit?: (values: T) => unknown;
  defaultValues?: T;
  children?: (form: FormApi<T, typeof zodValidator>) => ReactNode | undefined;
}

function LezzformComponent<T = Record<string, unknown>>({
  id,
  defaultValues,
  onSubmit,
  children,
}: Props<T>) {
  const form = useForm<T, typeof zodValidator>({
    onSubmit,
    defaultValues,
    validator: zodValidator,
  });

  return (
    <form.Provider key={id}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        {children && children(form)}
      </form>
    </form.Provider>
  );
}

export const Lezzform = LezzformComponent as typeof LezzformComponent;
