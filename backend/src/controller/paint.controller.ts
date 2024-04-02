import { NextFunction, Request, Response, Router } from "express";
import { DI } from "../index";
import cd from "color-difference";
import { Loaded } from "@mikro-orm/core";
import { Paint } from "../entities";

const router: Router = Router({ mergeParams: true });

const isHexColor = (hexColor: string): boolean => {
  const regex: RegExp = new RegExp("^(#(?:[a-f0-9]{6}))$");

  return regex.test(hexColor);
};

const isBetween = (accuracy: number): boolean => {
  const min: number = 0.0;
  const max: number = 100.0;

  return min <= accuracy && max >= accuracy;
};

const compareAllPaints = (
  hexColor: string,
  paints: Loaded<Paint, never>[],
  accuracy: number
): Loaded<Paint, never>[] => {
  const results: Loaded<Paint, never>[] = [];

  for (let i = 0; i < paints.length; i++) {
    const result: number = cd.compare(hexColor, paints.at(i)!.color_hex);
    if (result <= accuracy) {
      results.push(paints.at(i)!);
    }
  }

  return results;
};

router.get(
  "/findEquivalent",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hexColor: string = req.query.hexColor as string;
      const range: number = req.query.range as unknown as number;

      if (!isHexColor(hexColor)) {
        return res.status(404).send({ message: "Not a valid hex color" });
      }

      if (!isBetween(range)) {
        return res.status(404).send({ message: "Not a valid number." });
      }

      const paintsDb: Loaded<Paint, never>[] =
        await DI.paintRepository.findAll();
      const paints: Loaded<Paint, never>[] = compareAllPaints(
        hexColor,
        paintsDb,
        range
      );

      res.status(200).send(paints);
    } catch (error: any) {
      return next(error);
    }
  }
);

export const PaintController: Router = router;
