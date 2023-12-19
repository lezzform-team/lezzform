import { z } from "zod";
import { Lezzform, Button } from "@lezzform/react";

const ZodFormSchema = z.object({});

type FormSchema = z.infer<typeof ZodFormSchema>;

interface Props {
  onSubmit?: (values: FormSchema) => unknown;
  defaultValues?: FormSchema;
}

const id = "QQ6kAEW0zgEMFPRv1ryV";

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
