import { z } from "zod";
import { Lezzform, Button, Dropdown } from "@lezzform/react";

const ZodFormSchema = z.object({
  dropdown6: z.string(),
  dropdown7: z.string(),
  dropdown9: z.string(),
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
              name="dropdown6"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Dropdown
                    label="Dropdown Static"
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select one item"
                    error={field.state.meta.touchedErrors as unknown as string}
                    items={[
                      { label: "Label1", value: "label1" },
                      { label: "Label2", value: "label2" },
                      { label: "Label3", value: "label3" },
                    ]}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="dropdown7"
              onChange={z.string()}
              onChangeAsyncDebounceMs={500}
              children={(field) => {
                return (
                  <Dropdown
                    label="Dropdown Static"
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    placeholder="Select one item"
                    error={field.state.meta.touchedErrors as unknown as string}
                    items={[
                      { label: "Label1", value: "label1" },
                      { label: "Label2", value: "label2" },
                      { label: "Label3", value: "label3" },
                    ]}
                  />
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="dropdown9"
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
                    path={{ label: "email", value: "email" }}
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
