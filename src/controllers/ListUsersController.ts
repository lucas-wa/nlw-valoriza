import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(request: Request, reponse: Response) {
    const listUsersService = new ListUsersService();

    const users = await listUsersService.execute();

    return reponse.json(users);
  }
}

export { ListUsersController };
