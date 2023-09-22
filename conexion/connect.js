import { MongoClient } from "mongodb";
import { MY_ATLAS_PASS, MY_DB, USUARIO } from "../config/variables.js";


export const db = async () => {
    try {

        let url = `mongodb+srv://${USUARIO}:${MY_ATLAS_PASS}@cluster0.hoapju2.mongodb.net/${MY_DB}`

        const connect = await MongoClient.connect(url)
        return connect.db

    } catch (error) {

        return { status: 500, message: error }
    }
}