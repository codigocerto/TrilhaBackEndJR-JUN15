import * as bcrypt from "bcrypt";
import { User, UserUpdate } from "../models/userModel";
import { UsersRepository } from "../repositories/usersRepository";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors";

class UsersServices {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async create({ name, email, password }: User) {
    if (!name || !email || !password) {
      throw new BadRequestError("Name, email, and password are required");
    }

    if (!this.isValidEmail(email)) {
      throw new BadRequestError("Invalid email");
    }

    if (await this.usersRepository.findByEmail(email)) {
      throw new BadRequestError("User with this email already exists");
    }

    if (!this.isValidPassword(password)) {
      throw new BadRequestError(
        "Invalid password. Minimum 8 characters with 1 uppercase letter, 1 lowercase letter and 1 special character"
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return createUser;
  }

  async login(email: string, password: string) {
    if (!this.isValidEmail(email) || !this.isValidPassword(password)) {
      throw new BadRequestError("Invalid email or password");
    }
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const userId = user.id;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_KEY_TOKEN!, {
      expiresIn: "1h",
    });

    return { token, userId };
  }

  async update(
    authenticatedUserId: string,
    id: string,
    { name, email, oldPassword, newPassword }: UserUpdate
  ) {
    if (authenticatedUserId !== id) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userToUpdate = await this.usersRepository.findById(id);

    if (!userToUpdate) {
      throw new NotFoundError("User not found");
    }

    if (email && !this.isValidEmail(email)) {
      throw new BadRequestError("Invalid email");
    }

    if (name === undefined || name === "") {
      throw new BadRequestError("Name cannot be empty");
    }

    const isUpdatingPassword =
      oldPassword !== undefined || newPassword !== undefined;

    if (isUpdatingPassword) {
      if (oldPassword === undefined || oldPassword === "") {
        throw new BadRequestError(
          "Old password is required to update password"
        );
      }

      if (newPassword === undefined || newPassword === "") {
        throw new BadRequestError(
          "New password is required to update password"
        );
      }

      if (!(await bcrypt.compare(oldPassword, userToUpdate.password))) {
        throw new UnauthorizedError("Invalid password");
      }

      if (!this.isValidPassword(newPassword)) {
        throw new BadRequestError(
          "Invalid new password. Minimum 8 characters with 1 uppercase letter, 1 lowercase letter and 1 special character"
        );
      }

      const hashPassword = await bcrypt.hash(newPassword, 10);
      await this.usersRepository.updatePassword(hashPassword, id);
    }

    const updatedUser = await this.usersRepository.update(id, name, email);
    return updatedUser;
  }

  async delete(authenticatedUserId: string, id: string): Promise<void> {
    if (authenticatedUserId !== id) {
      throw new BadRequestError("Unauthorized");
    }

    const userToDelete = await this.usersRepository.findById(id);

    if (!userToDelete) {
      throw new NotFoundError("User not found");
    }

    await this.usersRepository.delete(id);
  }

  private isValidEmail(email: string): boolean {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailTest.test(email);
  }

  private isValidPassword(password: string): boolean {
    const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordTest.test(password);
  }
}

export { UsersServices };
