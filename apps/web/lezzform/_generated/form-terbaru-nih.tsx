import { z } from "zod";
import { Lezzform, Button, Input } from "@lezzform/react";

const ZodFormSchema = z.object({
  "input-1702902083139": z.string(),
});

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
  onSubmit?: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

const id = "9h27V8YY3H2EJeSq3HzF";

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
              name="input-1702902083139"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Input
                    label="Input"
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
