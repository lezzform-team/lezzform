import { cn } from "@/lib/utils";

export interface ImagePropsStyles {
  root: React.CSSProperties;
}

export interface ImagePropsClassNames {
  root: string;
}

interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  url: string;
  styles?: Partial<ImagePropsStyles>;
  classNames?: Partial<ImagePropsClassNames>;
}

export function Image({
  url,
  styles,
  classNames,
  className,
  ...props
}: ImageProps): React.JSX.Element {
  return (
    <img
      className={cn(className, classNames?.root)}
      src={url}
      alt={url}
      style={styles?.root}
      {...props}
    />
  );
}
