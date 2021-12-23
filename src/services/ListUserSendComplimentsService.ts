import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentssRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentssRepositories.find({
      where: {
        user_sender: user_id
      },
      relations: ["userSender", "userReciver", "tag"]
    });

    return compliments;
  }
}

export { ListUserSendComplimentsService };
