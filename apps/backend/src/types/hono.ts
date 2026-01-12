import "hono";

declare module "hono" {
  interface ContextVariableMap {
    requesterId: string;
  }
}
