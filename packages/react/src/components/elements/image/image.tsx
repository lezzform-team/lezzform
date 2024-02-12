import { cn } from "@/lib/utils";

export interface ImagePropsStyles {
  root: React.CSSProperties;
}

export interface ImagePropsClassNames {
  root: string;
}

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  url: string;
  width?: number;
  height?: number;
  styles?: Partial<ImagePropsStyles>;
  classNames?: Partial<ImagePropsClassNames>;
}

export function Image({
  url,
  height = 100,
  width = 100,
  styles,
  classNames,
  className,
  ...props
}: ImageProps): React.JSX.Element {
  return (
    <img
      className={cn("aspect-square object-cover", className, classNames?.root)}
      src={url}
      alt={url}
      style={{ height, width, ...(styles?.root ?? {}) }}
      {...props}
    />
  );
}
