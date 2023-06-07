import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

class Db extends PrismaClient {
    static instance;
    constructor() {
        if (!Db.instance) {
            Db.instance = new PrismaClient()
        }
        return Db.instance;
    }
}

export default Db;