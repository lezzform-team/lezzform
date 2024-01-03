import { z } from "zod";
import {
  Lezzform,
  Button,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  TextArea,
} from "@lezzform/react";

const zodFormSchema = z.object({
  "input-1704266905644": z.string().optional(),
  "textarea-1704266907400": z.string().optional(),
});

type FormSchema = z.infer<typeof zodFormSchema>;

interface Props {
  onSubmit: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

const id = "dBVblCiiiaKmU8FMzbUq";

export const Form = ({ onSubmit, defaultValues }: Props) => {
  return (
    <Lezzform<FormSchema>
      id={id}
      key={id}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      zodSchema={zodFormSchema}
    >
      {(form) => (
        <Lezzform.Container>
          <FormField
            control={form.control}
            name="input-1704266905644"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input
                    label="Input"
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="textarea-1704266907400"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TextArea</FormLabel>
                <FormControl>
                  <TextArea
                    label="TextArea"
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            isLoading={form.formState.isSubmitting}
          >
            Submit
          </Button>{" "}
        </Lezzform.Container>
      )}
    </Lezzform>
  );
};
