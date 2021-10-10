import mongoose from 'mongoose'

const dbUri = process.env.MONGODB_URI

if (!dbUri)
{
    throw new Error('define MONGODB_URI environment variable (.env.local)')
}

let cached = global.mongoose

if (!cached)
{
    cached = global.mongoose = { connection: null, promise: null }
}

async function dbConnect ()
{
    if (cached.connection)
    {
        return cached.connection
    }

    if (!cached.promise)
    {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false
        }

        cached.promise = mongoose.connect(dbUri, opts)
                                 .then((mongoose) =>
                                 {
                                     return mongoose
                                 })
    }

    cached.conn = await cached.promise
    return cached.connection
}

export default dbConnect
