import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUsersService {
  async execute() {
    const userRepositories = getCustomRepository(UsersRepositories);

    const users = await userRepositories.find();

    // Exclui a senha da vizualização quando os usuários são listados para alguém
    return classToPlain(users);
  }
}

export { ListUsersService };
