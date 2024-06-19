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
    userId: string,
    { name, email, oldPassword, newPassword }: UserUpdate
  ) {
    const findUserById = await this.usersRepository.findById(userId);

    if (!findUserById) {
      throw new Error("User not found");
    }

    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        findUserById.password
      );

      if (!passwordMatch) {
        throw new Error("Password invalid.");
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await this.usersRepository.updatePassword(
        hashPassword,
        userId
      );

      if (name || email) {
        const updatedUserWithData = await this.usersRepository.update(
          userId,
          name,
          email
        );
        return updatedUserWithData;
      }

      return updatedUser;
    }

    if (name || email) {
      const updatedUser = await this.usersRepository.update(
        userId,
        name,
        email
      );
      return updatedUser;
    }

    throw new Error("No fields to update provided");
  }

  async delete(userId: string): Promise<void> {
    const userToDelete = await this.usersRepository.findById(userId);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await this.usersRepository.delete(userId);
  }
}

export { UsersServices };
