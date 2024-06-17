import * as bcrypt from "bcrypt";
import { User, UserUpdate } from "../models/userModel";
import { UsersRepository } from "../repositories/usersRepository";

class UsersServices {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async create({ name, email, password }: User) {
    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      throw new Error("User exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const create = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });
    return create;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();

    return users;
  }

  async findById(id: string) {
    const users = await this.usersRepository.findById(id);

    return users;
  }

  async update(
    id: string,
    { name, email, oldPassword, newPassword }: UserUpdate
  ) {
    let password;
    if (oldPassword && newPassword) {
      const findUserById = await this.usersRepository.findById(id);
      if (!findUserById) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        findUserById.password
      );

      if (!passwordMatch) {
        throw new Error("Password invalid.");
      }
      password = await bcrypt.hash(newPassword, 10);

      const update = await this.usersRepository.updatePassword(password, id);

      return update;
    }

    if (name || email) {
      const findUserById = await this.usersRepository.findById(id);
      if (!findUserById) {
        throw new Error("User not found");
      }
      const update = await this.usersRepository.update(id, name, email);
      return update;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new Error(`User ${id} not found: ${error}`);
    }
  }
}

export { UsersServices };
