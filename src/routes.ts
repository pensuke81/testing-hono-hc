import { Hono } from "hono";
import { listUserHandler } from "./handlers/users/listUsersHandler";
import { listPostsHandler } from "./handlers/posts/listPostsHandler";
import { logger } from "hono/logger";

const app = new Hono();

export const routes = app
  .get("/users", logger(), ...listUserHandler)
  .get("/posts", logger(), ...listPostsHandler);
