import * as path from "node:path";
import { config } from "dotenv"
import { DataSource } from "typeorm";
import { BillEntity, UserEntity } from "./entities";

const env = config().parsed
export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT ? Number(env.POSRGRES_PORT) : 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  migrations: [path.resolve(__dirname,"./migrations/*.ts")],
  logging: true,
  ssl: env.POSTGRES_SSL == "true",
  synchronize: false,
  entities: [UserEntity, BillEntity],
})
