import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Customer, Invoice, Revenue } from "./entity/User"

import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "d-use1-rds-app-poc.cluster-caiads6bwjay.us-east-1.rds.amazonaws.com	",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "kj",
    synchronize: true,
    logging: false,
    entities: [User, Customer, Invoice, Revenue],
    migrations: [],
    subscribers: [],
})
