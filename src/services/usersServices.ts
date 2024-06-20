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
      throw new Error("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return createUser;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async update(
    id: string,
    { name, email, oldPassword, newPassword }: UserUpdate
  ) {
    const userToUpdate = await this.usersRepository.findById(id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        userToUpdate.password
      );

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);
      await this.usersRepository.updatePassword(hashPassword, id);
    }

    if (name !== undefined && name.trim() === "") {
      throw new Error("Name cannot be empty");
    }

    if (email !== undefined && !this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    const updatedUser = await this.usersRepository.update(id, name, email);

    return updatedUser;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.usersRepository.findById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await this.usersRepository.delete(id);
  }
}

export { UsersServices };
