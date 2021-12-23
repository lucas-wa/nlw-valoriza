import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(request: Request, reponse: Response) {
    const { name } = request.body;
    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return reponse.json(tag);
  }
}

export { CreateTagController };
