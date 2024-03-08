import "reflect-metadata"
import { DataSource } from "typeorm"
import { People, User, Customer, Invoice } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "d-use1-rds-app-poc.cluster-caiads6bwjay.us-east-1.rds.amazonaws.com	",
    port: 5432,
    username: "postgres",
    password: "a%-[K7W~zEYoFm?WJD2t7LT7wsY7",
    database: "kj",
    synchronize: true,
    logging: false,
    entities: [User, People, Customer, Invoice],
    migrations: [],
    subscribers: [],
})
