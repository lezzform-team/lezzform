import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("lf-p-3", className)}
      classNames={{
        months:
          "lf-flex lf-flex-col sm:lf-flex-row lf-space-y-4 sm:lf-space-x-4 sm:lf-space-y-0",
        month: "lf-space-y-4",
        caption:
          "lf-flex lf-justify-center lf-pt-1 lf-relative lf-items-center",
        caption_label: "lf-text-sm lf-font-medium",
        nav: "lf-space-x-1 lf-flex lf-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "lf-h-7 lf-w-7 lf-bg-transparent lf-p-0 lf-opacity-50 hover:lf-opacity-100",
        ),
        nav_button_previous: "lf-absolute lf-left-1",
        nav_button_next: "lf-absolute lf-right-1",
        table: "lf-w-full lf-border-collapse lf-space-y-1",
        head_row: "lf-flex",
        head_cell:
          "lf-text-muted-foreground lf-rounded-md lf-w-9 lf-font-normal lf-text-[0.8rem]",
        row: "lf-flex lf-w-full lf-mt-2",
        cell: "lf-h-9 lf-w-9 lf-text-center lf-text-sm lf-p-0 lf-relative [&:has([aria-selected].day-range-end)]:lf-rounded-r-md [&:has([aria-selected].day-outside)]:lf-bg-accent/50 [&:has([aria-selected])]:lf-bg-accent first:[&:has([aria-selected])]:lf-rounded-l-md last:[&:has([aria-selected])]:lf-rounded-r-md focus-within:lf-relative focus-within:lf-z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "lf-h-9 lf-w-9 lf-p-0 lf-font-normal aria-selected:lf-opacity-100",
        ),
        day_range_end: "lf-day-range-end",
        day_selected:
          "lf-bg-primary lf-text-primary-foreground hover:lf-bg-primary hover:lf-text-primary-foreground focus:lf-bg-primary focus:lf-text-primary-foreground",
        day_today: "lf-bg-accent lf-text-accent-foreground",
        day_outside:
          "lf-day-outside lf-text-muted-foreground lf-opacity-50 aria-selected:lf-bg-accent/50 aria-selected:lf-text-muted-foreground aria-selected:lf-opacity-30",
        day_disabled: "lf-text-muted-foreground lf-opacity-50",
        day_range_middle:
          "aria-selected:lf-bg-accent aria-selected:lf-text-accent-foreground",
        day_hidden: "lf-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="lf-h-4 lf-w-4" />,
        IconRight: () => <ChevronRight className="lf-h-4 lf-w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
