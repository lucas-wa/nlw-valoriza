import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
/* Uma entidade é uma referência para uma tabela 
  Entidade <-> ORM <-> Banco de Dados (users)

  Preciso de uma camada intermediária, os Repositórios, para fazer a conexão entre banco de daods e entidade. Nesse caso, criamos repositories/UsersRepositories.ts
  
  OBS: no tsconfig, tire "experimentalDecorators": true e "emitDecoratorMetadata": true  da forma comentada
  E descomente e mude  "strictPropertyInitialization": true (mude para false)*/

//Versões do uuid (v1 - v5), cada uma com uma forma de gerar um id. O v4 usa aleatoriedade
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn() // nâo precisa por nada pois o nome do campo "id" é o mesmo do criado na tabela ("id")
  readonly id: string; // readonly faz com que ele só possa ser inserida por essa classe (essa entidade insere esse id)

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    // Se não existir id, crie
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
