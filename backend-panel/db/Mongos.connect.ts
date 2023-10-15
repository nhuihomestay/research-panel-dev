import { MongoClient } from 'mongodb';

class MongosConnect {
    public async queryData(db: string, collection: string, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = await selectDB.collection(collection).find(option).toArray()
            return data
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }

    public async insertOneData(db: string, collection: string, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = await selectDB.collection(collection).insertOne(option)
            return data
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }

    public async insertManyData(db: string, collection: string, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = await selectDB.collection(collection).insertMany(option)
            return data
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }

    public async updateById(db: string, collection: string, id: any, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = await selectDB.collection(collection).updateMany(id, option)
            return data
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }

    public async countAgg(db: string, collection: string, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = selectDB.collection(collection).aggregate(option)
            const response: any[] = []
            await data.forEach((result: any) => {
                response.push(result)
            })
            return response
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }
}


export { MongosConnect }