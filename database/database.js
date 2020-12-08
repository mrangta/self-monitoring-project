
import { Pool } from "../deps.js";
import { dbconfig } from "../config/config.js";


const database = Deno.env.toObject().database || dbconfig.database;

const connectionPool = new Pool(database, 5);

const executeQuery = async(query, ...args) => {
  const client = await connectionPool.connect();
  try {
      return await client.query(query, ...args);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
}

export { executeQuery };