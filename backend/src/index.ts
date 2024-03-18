import express from "express";
import { logger } from "./utils/";
import http from "http";
import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import { Paint } from "./entities";

const PORT = 4000;
const app = express();

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  paintRepository: EntityRepository<Paint>;
};

export const initializeServer = async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.paintRepository = DI.orm.em.getRepository(Paint);

  app.listen(PORT, () => {
    logger
      .child({ context: { event: "startServer" } })
      .info(`Server started on port ${PORT}`);
  });
};

initializeServer();
