import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// Força a função verify a retornar uma string
interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authtoken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authtoken) {
    // end() pega mensagem pafrão do 401
    return response.status(401).end();
  }
  // Validar se token é valido
  // Retira a palavra Bearer dentro do array com o authtoken
  const [, token] = authtoken.split(" ");

  try {
    // Recupera sub = user.id
    const { sub } = verify(
      token,
      "717d72f85abe55e375a5cc0c7bef166b"
    ) as IPayload;

    // Será possível recuperar no request. Por isso se sobrescreve com uma pasta types no projeto.
    // É necessário modificar "typeRoots" dentro de tsconfig para isso funcionar. Pass o caminho "./src/@types" como parte do array
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // Recuperar informações do usuário
}
