import { z } from "zod";
import { Lezzform, Button, Dropdown } from "@lezzform/react";

const ZodFormSchema = z.object({
  dropdown12: z.string(),
  dropdown13: z.string(),
  dropdown14: z.string(),
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
              name="dropdown12"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Dropdown
                    label="Dropdown API"
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select one item from API"
                    error={field.state.meta.touchedErrors as unknown as string}
                    url="https://jsonplaceholder.typicode.com/comments"
                    path={{ label: "name", value: "name" }}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="dropdown13"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Dropdown
                    label="Dropdown API"
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select one item from API"
                    error={field.state.meta.touchedErrors as unknown as string}
                    url="https://jsonplaceholder.typicode.com/comments"
                    path={{ label: "name", value: "name" }}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="dropdown14"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Dropdown
                    label="Dropdown API"
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select one item from API"
                    error={field.state.meta.touchedErrors as unknown as string}
                    url="https://jsonplaceholder.typicode.com/comments"
                    path={{ label: "name", value: "name" }}
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
