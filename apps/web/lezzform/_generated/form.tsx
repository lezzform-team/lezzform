import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  SingleLineText,
  TextArea,
  TwoColumn,
  ThreeColumn,
} from "@lezzform/react";

const ZodFormSchema = z.object({
  "SingleLineText 1": z.string().min(5),
  "SingleLineText 2": z.string(),
  "TextArea 1": z.string(),
  SGL1: z.string(),
  Ssdwewe: z.string().min(5),
  zxcswe: z.string(),
  el2: z.string().email(),
  el2x: z.string().email(),
  texta: z.string(),
  texta: z.string(),
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

          <TwoColumn>
            {" "}
            <div>
              <form.Field
                name="Ssdwewe"
                onChange={z.string().min(5)}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <SingleLineText
                      label="Firstname"
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
                name="zxcswe"
                onChange={z.string()}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <SingleLineText
                      label="Lastname"
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

          <ThreeColumn>
            {" "}
            <div>
              <form.Field
                name="el2"
                onChange={z.string().email()}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <SingleLineText
                      label="Email 2"
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
                name="el2x"
                onChange={z.string().email()}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <SingleLineText
                      label="Email 2x"
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
                name="texta"
                onChange={z.string()}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <TextArea
                      label="Tdxata 2x"
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
                name="texta"
                onChange={z.string()}
                onChangeAsyncDebounceMs={500}
                children={(field) => {
                  return (
                    <TextArea
                      label="Tdxata 2x"
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
          </ThreeColumn>
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
