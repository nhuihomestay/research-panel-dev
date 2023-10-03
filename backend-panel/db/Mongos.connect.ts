import { MongoClient } from 'mongodb';

class MongosConnect {
    public async queryData(db: string, collection: string, option: any): Promise<any> {
        const client = new MongoClient(process.env.DATABASE_ENV || '');
        try {
            await client.connect()
            const selectDB = client.db(db)
            const data = await selectDB.collection(collection).find(option).limit(10).toArray()
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
            const data = await selectDB.collection(collection).updateOne({ "_id": id }, option)
            return data
        } catch (err: any) {
            console.log(err);
            return null
        } finally {
            client.close()
        }
    }
}


export { MongosConnect }