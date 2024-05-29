import { ReactNode } from "react";

export type TReactProps<Type = object> = React.FC<
  Type & { children?: ReactNode }
>;
