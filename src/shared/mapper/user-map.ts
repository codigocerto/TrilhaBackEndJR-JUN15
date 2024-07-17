import { instanceToPlain } from "class-transformer";
import { User } from "../../entities/user.entity";
import { IUserResponseDTO } from "../../models/interfaces/user.interface";

export class UserMap {
  static toDTO(users: User[]): IUserResponseDTO[] {
    return users.map((user) => {
      const { id, name, email, createdAt, updatedAt, tasks } = user;
      const userDTO = instanceToPlain({
        id,
        name,
        email,
        createdAt,
        updatedAt,
        tasks,
      });
      return userDTO as IUserResponseDTO;
    });
  }
}
