import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListtagsService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    // Retorna todas as tags
    let tags = await tagsRepositories.find();

    // Sobreescreve tags e coloca um asteristico na frente. Adiciona um atributo nameCustom com esse valor #tag.name

    return classToPlain(tags);
  }
}

export { ListtagsService };
