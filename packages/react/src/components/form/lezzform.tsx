import { ReactNode, useCallback, useEffect, useRef } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { ZodType } from "zod";
import { LezzformContainer } from "./container";
import { LezzformReturn } from "@/types";

export interface LezzformProps<T extends FieldValues = Record<string, unknown>>
  extends UseFormProps<T> {
  onSubmit: (form: LezzformReturn<T>, values: T) => unknown;
  onSuccess?: (form: LezzformReturn<T>, values: unknown) => unknown;
  onError?: (form: LezzformReturn<T>, error: unknown) => unknown;
  children: (form: LezzformReturn<T>) => ReactNode | undefined;
  zodSchema: ZodType;
  id?: string;
}

function LezzformComponent<T extends FieldValues = Record<string, unknown>>({
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  children,
  id,
  zodSchema,
  ...rest
}: LezzformProps<T>) {
  const form = useForm<T>({
    defaultValues,
    resolver: zodResolver(zodSchema),
    mode: "onChange",
    ...rest,
  });

  const onSubmitRef = useRef<LezzformProps<T>["onSubmit"]>();
  const onSuccessRef = useRef<LezzformProps<T>["onSuccess"]>();
  const onErrorRef = useRef<LezzformProps<T>["onError"]>();

  useEffect(() => {
    if (!onSubmit) return;
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    if (!onSuccess) return;
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!onError) return;
    onErrorRef.current = onError;
  }, [onError]);

  const handleSubmit = useCallback<SubmitHandler<T>>(
    async (values) => {
      try {
        if (!onSubmitRef.current) return;
        const data = await onSubmitRef.current(form, values);

        if (onSuccessRef.current) return onSuccessRef.current(form, data);
      } catch (error) {
        if (onErrorRef.current) return onErrorRef.current(form, error);
      }
    },
    [form],
  );

  const isOnChange = !rest.mode || rest.mode === "onChange";

  return (
    <Form key={id} {...form}>
      <form
        onSubmit={(e) => {
          if (!isOnChange) return;
          form.handleSubmit(handleSubmit)(e);
        }}
        onBlur={(e) => {
          if (rest.mode !== "onBlur") return;
          form.handleSubmit(handleSubmit)(e);
        }}
      >
        {children(form)}
      </form>
    </Form>
  );
}

LezzformComponent.Container = LezzformContainer;

export const Lezzform = LezzformComponent as typeof LezzformComponent;
