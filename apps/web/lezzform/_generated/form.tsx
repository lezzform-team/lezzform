"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { SingleLineText, TextArea } from "@lezzform/react";

const ZodFormSchema = z.object({
  "SingleLineText 1": z.string().min(5),
  "SingleLineText 2": z.string(),
  "TextArea 1": z.string(),
  SGL1: z.string(),
});

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
  onSubmit?: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

export const Form = ({ onSubmit, defaultValues }: Props) => {
  const form = useForm<FormSchema, typeof zodValidator>({
    onSubmit,
    defaultValues,
    validator: zodValidator,
  });

  return (
    <div>
      <h1>Simple Form Example</h1>
      {/* A pre-bound form component */}
      <form.Provider>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="SingleLineText 1"
              onChange={z.string().min(5)}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <SingleLineText
                    label="Firstname"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.touchedErrors as unknown as string}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="SingleLineText 2"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <SingleLineText
                    label="Lastname"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.touchedErrors as unknown as string}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="TextArea 1"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <TextArea
                    label="Address"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.touchedErrors as unknown as string}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="SGL1"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <SingleLineText
                    label="Nice one"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={field.state.meta.touchedErrors as unknown as string}
                  />
                );
              }}
            />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          />
        </form>
      </form.Provider>
    </div>
  );
};
