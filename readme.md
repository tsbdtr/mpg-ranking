# MPG League Ranking

Request MPG data and make league ranking across all divisions.

## Configuration

### Step 1. Get the connection string of your MongoDB server

For more details, follow this [MongoDB Guide](https://docs.mongodb.com/guides/server/drivers/) on how to connect to MongoDB.

### Step 2. Set up environment variables

Create the file `.env.local` (which will be ignored by Git):

```bash
touch .env.local
```

Then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string you got from step 1.

### Step 3. Run App in development mode

```bash
npm install
npm run dev
```

The app should be up and running on [http://localhost:3000](http://localhost:3000).
