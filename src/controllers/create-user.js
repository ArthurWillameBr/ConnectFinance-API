import { CreateUserUseCase } from "../use-cases/create-user.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return {
            statusCode: 400,
            body: {
              errorMessage: `Missing param: ${field}`,
            },
          };
        }
      }
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: {
          errorMessage: "An internal server error occurred",
        },
      };
    }
  }
}
