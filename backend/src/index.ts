import express, { NextFunction, Request, Response } from "express";
import { logger } from "./utils/";
import http from "http";
import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";
import { Paint } from "./entities";
import { PaintController } from "./controller";

const PORT: number = 4000;
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

  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) =>
    RequestContext.create(DI.orm.em, next)
  );

  app.use("/paint", PaintController);

  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    logger
      .child({ context: { event: "startServer" } })
      .info(`Server started on port ${PORT}`);
  });
};

initializeServer();

// https://reflectoring.io/express-error-handling/
// https://stackoverflow.com/questions/68463549/express-try-and-catch-in-form-of-middleware
