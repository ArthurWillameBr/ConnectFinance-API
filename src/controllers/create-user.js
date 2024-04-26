import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { badRequest, created, internalServerError } from "./helpers.js";

export class CreateUserController {
  async execute(httpRequest) {
    
    try {
      const params = httpRequest.body;

      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing required field: ${field}` });
        }
      }

      const passwordIsValid = params.password.length < 6;
      if (passwordIsValid) {
        return badRequest({
          message: "Password must be at least 6 characters",
        });
      }

      const emailIsValid = validator.isEmail(params.email);
      if (!emailIsValid) {
        return badRequest({
          message: "Invalid email. Please provide a valid email address.",
        });
      }

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return created(createdUser);

    } catch (error) {
      console.log(error);
      return internalServerError();
    }
  }
}
