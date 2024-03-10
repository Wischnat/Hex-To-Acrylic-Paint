import express from "express";
import { logger } from "./utils/";
import http from "http";
import { MikroORM } from "@mikro-orm/postgresql";
import { EntityManager } from "@mikro-orm/core";

const PORT = 4000;
const app = express();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
};

export const initializeServer = async () => {
  app.listen(PORT, () => {
    logger
      .child({ context: { event: "startServer" } })
      .info(`Server started on port ${PORT}`);
  });
};

initializeServer();
