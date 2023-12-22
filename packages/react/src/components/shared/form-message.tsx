import { HTMLProps } from "react";

export function FormMessage({ children }: HTMLProps<HTMLElement>) {
  return (
    <small className="text-xs font-medium leading-none text-red-500">
      {children}
    </small>
  );
}
