import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

// Controller pega a requisição e envia para o service
class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    // console.log("oi");

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password
    });

    // console.log("oi");

    return response.json(user);
  }
}

export { CreateUserController };
