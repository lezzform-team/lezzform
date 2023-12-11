import { z } from "zod";
import { Lezzform, Button, Input, TwoColumn } from "@lezzform/react";

const ZodFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
  onSubmit?: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

export const Form = ({ onSubmit, defaultValues }: Props) => {
  return (
    <Lezzform<FormSchema> defaultValues={defaultValues} onSubmit={onSubmit}>
      {(form) => (
        <>
          <div>
            <form.Field
              name="name"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Input
                    label="Name"
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
          <TwoColumn>
            {" "}
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
                      error={
                        field.state.meta.touchedErrors as unknown as string
                      }
                    />
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="password"
                onChange={z.string().min(5)}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <Input
                      label="Password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={
                        field.state.meta.touchedErrors as unknown as string
                      }
                    />
                  );
                }}
              />
            </div>
          </TwoColumn>
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
