import { executeQuery } from "../database/database.js";

const getUserByEmail = async(email) => {
    const res = await await executeQuery("SELECT * FROM users WHERE email = $1", email);
  return res;
}

const addUser = async(email, hash) => {
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);
}

export {getUserByEmail, addUser }