export const formTemplate = `import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { 
    {{#each types}}{{this}},{{/each}}
 } from "@lezzform/react"

const ZodFormSchema = z.object({
  {{#each elements}}"{{this.name}}" : {{this.validator}},\n{{/each}}
})

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
    onSubmit?: (values: FormSchema) => unknown;
    defaultValues?: FormSchema
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
        {{#each elements}}
        <div>
          <form.Field
            name="{{this.name}}"
            onChange={{append '{'}}{{this.validator}}{{append '}'}}
            onChangeAsyncDebounceMs={500}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                    <{{this.type}}
                    label="{{this.label}}"
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
        {{/each}}
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
};`;
