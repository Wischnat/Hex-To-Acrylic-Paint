import { Options } from "@mikro-orm/core";
import { Paint } from "./entities";

const options: Options = {
  type: "postgresql",
  entities: [Paint],
  dbName: process.env.postgres_db_name,
  password: process.env.postgres_password,
  user: process.env.postgres_user,
  debug: true,
  clientUrl: process.env.postgres_url,
};

export default options;
