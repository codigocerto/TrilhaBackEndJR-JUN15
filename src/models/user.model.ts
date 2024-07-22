import { injectable } from "tsyringe";
import { AppDataSource } from "../database/database";
import { AppError } from "../shared/error/app-error";
import { User } from "../entities/user.entity";
import { CreateUserDTO } from "../controllers/DTOs/create-user.dto";
import { UpdateUserDTO } from "../controllers/DTOs/update-user.dto";
import { IUserResponseDTO } from "./interfaces/user.interface";

@injectable()
export class UserModel {
  private userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        order: { createdAt: "DESC" },
        relations: {
          tasks: true,
        },
      });
    } catch (error) {
      throw new AppError(
        `Falha ao buscar usuário no banco de dados - ${error}`
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async create(createUser: CreateUserDTO): Promise<void> {
    try {
      const user = this.userRepository.create(createUser);
      await this.userRepository.save(user);
    } catch (error) {
      throw new AppError(`Falha ao criar usuário no banco de dados - ${error}`);
    }
  }

  async update(id: string, user: UpdateUserDTO): Promise<void> {
    try {
      const userAllReadyExists = await this.userRepository.findOne({
        where: { id },
      });

      if (userAllReadyExists) {
        await this.userRepository.update(id, user);
      } else {
        throw new AppError(`Usuário não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao atualizar usuário no banco de dados - ${error.message}`
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (user) {
        return user;
      } else {
        throw new AppError(`Usuário não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao buscar usuário no banco de dados - ${error.message}`
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (user) {
        await this.userRepository.delete(id);
      } else {
        throw new AppError(`Usuário não encontrada`);
      }
    } catch (error: any) {
      throw new AppError(
        `Falha ao excluir usuário no banco de dados - ${error.message}`
      );
    }
  }
}
