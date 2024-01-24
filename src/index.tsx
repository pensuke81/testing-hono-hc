import { Hono } from "hono";
import { hc } from "hono/client";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";

type Env = {};
const app = new Hono();

const factory = createFactory<Env>();

const handlers = factory.createHandlers(logger(), (c) => {
  return c.json({ name: "hono" });
});

const routes = app.get("/users", ...handlers);

const AsyncComponent = async () => {
  const client = hc<typeof routes>("http://localhost:8787");
  const res = await client.users.$get();
  const users = await res.json();

  return <div>{JSON.stringify(users)}</div>;
};

app.get("/", (c) => {
  return c.html(
    <html>
      <body>
        <div>GET /users</div>
        <pre>
          <AsyncComponent />
        </pre>
      </body>
    </html>
  );
});

app.fire();
