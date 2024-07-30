const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://onCloud:Pinbol0315@cluster0.63loqzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();

        console.log('MongoDb connected');        

        const colllection = client.db('test').collection('person');
    
        await colllection.insertOne({ name: 'John', age: 30 });
        console.log('Document inserted');

        const doc = await colllection.find({ name: 'John' }).toArray();
        console.log('Document found', doc);

        await colllection.updateOne({ name: 'John' }, { $set: { age: 31 }});
        console.log('Document updated');

        const updatedDoc = await colllection.find({ name: 'John' }).toArray();
        console.log('Document found', updatedDoc);

        // await colllection.deleteOne({ name: 'John' });
        // console.log('Document deleted');
        
        await client.close();
    } catch (error) {
        console.error(error);
    }
}

main();