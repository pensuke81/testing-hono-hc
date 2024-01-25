import { createFactory } from "hono/factory";

type Env = {};
const factory = createFactory<Env>();

export const listPostsHandler = factory.createHandlers((c) => {
  return c.json([{ title: "hono PRC" }]);
});
