import { Hono } from "hono";
import { hc } from "hono/client";
import { routes } from "./routes";

const app = new Hono();

app.route("/", routes);

type AppType = typeof routes;

const AsyncComponent = async () => {
  const client = hc<AppType>("http://localhost:8787");

  const users = await (await client.users.$get()).json();
  const posts = await (await client.posts.$get()).json();

  return <div>{JSON.stringify({ users, posts })}</div>;
};

app.get("/", (c) => {
  return c.html(
    <html>
      <body>
        <div>GET /users, GET /posts</div>
        <pre>
          <AsyncComponent />
        </pre>
      </body>
    </html>
  );
});

app.fire();
