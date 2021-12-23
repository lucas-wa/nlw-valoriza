import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentssRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentssRepositories.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReciver", "tag"]
    });

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };
