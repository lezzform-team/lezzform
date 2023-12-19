import { z } from "zod";
import { Lezzform, Button, TextArea, Input } from "@lezzform/react";

const ZodFormSchema = z.object({
  notes: z.string(),
  email: z.string().email(),
});

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
  onSubmit?: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

const id = "z8phWtZJqblW9y0QiXrT";

export const Form = ({ onSubmit, defaultValues }: Props) => {
  return (
    <Lezzform<FormSchema>
      id={id}
      key={id}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      {(form) => (
        <>
          <div>
            <form.Field
              name="notes"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <TextArea
                    label="Note"
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
              name="email"
              onChange={z.string().email()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Input
                    label="Email"
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
              <Button
                type="submit"
                className="w-full"
                disabled={!canSubmit || isSubmitting}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            )}
          />{" "}
        </>
      )}
    </Lezzform>
  );
};
