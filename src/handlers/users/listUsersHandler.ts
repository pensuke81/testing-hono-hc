import { createFactory } from "hono/factory";

type Env = {};
const factory = createFactory<Env>();

export const listUserHandler = factory.createHandlers((c) => {
  return c.json([{ name: "hono" }]);
});
