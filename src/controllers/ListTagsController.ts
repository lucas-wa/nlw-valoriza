import { Request, Response } from "express";
import { ListtagsService } from "../services/ListTagsService";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListtagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}

export { ListTagsController };
