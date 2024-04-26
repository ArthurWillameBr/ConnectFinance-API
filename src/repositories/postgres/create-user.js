import { PostgresHelper } from "../../db/postgres/helper.js";

export class PostgresCreateUserRepository {
  async execute(createUserParams) {
    const results = await PostgresHelper.query(
      `INSERT INTO users (ID, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)`,
      [
        createUserParams.ID,
        createUserParams.firstName,
        createUserParams.lastName, 
        createUserParams.email, 
        createUserParams.password
      ]
    );
    return results[0]; 
  }
}