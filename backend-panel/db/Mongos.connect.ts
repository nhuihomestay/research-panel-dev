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
            console.log("DB disconnected successfully to server");
        }
    }
}


export { MongosConnect }