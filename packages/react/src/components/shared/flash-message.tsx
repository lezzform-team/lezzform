import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldErrors } from "react-hook-form";
import { Separator } from "../ui/separator";

interface FlashMessageProps {
  title?: string;
  description?: string;
  errors?: FieldErrors;
}

export function FlashMessage({
  description = "Uh-oh! Check your details again. Make sure everything's right before hitting submit.",
  title = "Error",
  errors,
}: FlashMessageProps) {
  const isError = errors && Boolean(Object.keys(errors).length);

  if (!isError) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="lf-h-4 lf-w-4" />
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
      <Separator className="lf-my-2" />
      <AlertDescription className="lf-text-xs lf-font-medium">
        Error Details:
      </AlertDescription>
      <AlertDescription className="lf-text-xs lf-font-medium">
        <ul>
          {Object.entries(errors).map(([key, value]) => (
            <li key={key}>
              - {key}: {String(value?.message as string)}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
FlashMessage.displayName = "FlashMessage";
