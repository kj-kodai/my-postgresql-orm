import "reflect-metadata"
import { DataSource } from "typeorm"
import { People, User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "d-use1-rds-app-poc.cluster-caiads6bwjay.us-east-1.rds.amazonaws.com	",
    port: 5432,
    username: "postgres",
    password: "***",
    database: "kj",
    synchronize: true,
    logging: false,
    entities: [User, People],
    migrations: [],
    subscribers: [],
})
