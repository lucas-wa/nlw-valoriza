import { getCustomRepository } from "typeorm"; // Instancia extensões da classe, não devendo usar new para isso
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    // console.log(name, email, admin);

    // Verifica se email foi colocado
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    // Verifica se email já é cadastrado
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      // Valor que eu quero colocar no atributo é diferente do nome do campo
      password: passwordHash
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };

/* 

Controller -> Service (throw new Error)

O Controller que vai tratar do erro lançado (throw), já que é a camada acima

Usar um try catch é inviável

Seria melhor voltar duas camadas e adicionar a tratativa no server como um middlewares

O que é um middleware?

São interceptadores dentro de uma requisição, que podem interroper ou adicionar algo. Faz parte do fluxo da request e response

server chama routes chama Controller chama Service

server -> routes -> Controller -> Service (throw new Error)

*/
