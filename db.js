//const 

import { MongoClient, ServerApiVersion } from "mongodb"
const uri = "mongodb+srv://leocabel:Leocabel3%25%25%25@curso-full-stack.uwneruk.mongodb.net/?retryWrites=true&w=majority&appName=curso-full-stack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export default client