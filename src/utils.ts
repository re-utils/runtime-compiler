export type Expr<T> = string & {
  '~': T;
};
export type Id<T> = Expr<T> & {
  '~id': 0;
};

export const toExpr: <T>(str: string) => Expr<T> = (str) => str as any;
export const toId: <T>(str: string | Expr<T>) => Id<T> = toExpr as any;
