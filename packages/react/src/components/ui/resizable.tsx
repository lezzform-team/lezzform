import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "lf-flex lf-h-full lf-w-full data-[panel-group-direction=vertical]:lf-flex-col",
      className,
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "lf-relative lf-flex lf-w-px lf-items-center lf-justify-center lf-bg-border after:lf-absolute after:lf-inset-y-0 after:lf-left-1/2 after:lf-w-1 after:lf--translate-x-1/2 focus-visible:lf-outline-none focus-visible:lf-ring-1 focus-visible:lf-ring-ring focus-visible:lf-ring-offset-1 data-[panel-group-direction=vertical]:lf-h-px data-[panel-group-direction=vertical]:lf-w-full data-[panel-group-direction=vertical]:after:lf-left-0 data-[panel-group-direction=vertical]:after:lf-h-1 data-[panel-group-direction=vertical]:after:lf-w-full data-[panel-group-direction=vertical]:after:lf--translate-y-1/2 data-[panel-group-direction=vertical]:after:lf-translate-x-0 [&[data-panel-group-direction=vertical]>div]:lf-rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="lf-z-10 lf-flex lf-h-4 lf-w-3 lf-items-center lf-justify-center lf-rounded-sm lf-border lf-bg-border">
        <GripVertical className="lf-h-2.5 lf-w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
