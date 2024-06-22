import * as bcrypt from "bcrypt";
import { User, UserUpdate } from "../models/userModel";
import { UsersRepository } from "../repositories/usersRepository";
import jwt from "jsonwebtoken";
import { UpdateValidation } from "../enums/updateValidationEnum";

class UsersServices {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async create({ name, email, password }: User) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    if (await this.usersRepository.findByEmail(email)) {
      throw new Error("User with this email already exists");
    }

    if (!this.isValidPassword(password)) {
      throw new Error(
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
      throw new Error("Invalid email or password");
    }
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_KEY_TOKEN!, {
      expiresIn: "1h",
    });

    return { token, userId };
  }

  async update(
    id: string,
    { name, email, oldPassword, newPassword }: UserUpdate
  ) {
    const userToUpdate = await this.usersRepository.findById(id);

    const validationType = await this.getUpdateValidationType(userToUpdate, {
      name,
      email,
      oldPassword,
      newPassword,
    });

    switch (validationType) {
      case UpdateValidation.USER_NOT_FOUND:
        throw new Error("User not found");

      case UpdateValidation.MISSING_NEW_PASSWORD:
      case UpdateValidation.MISSING_OLD_PASSWORD:
        throw new Error("Problem updating password");

      case UpdateValidation.INVALID_PASSWORD:
        throw new Error("Invalid password");

      case UpdateValidation.EMPTY_NAME:
        throw new Error("Name cannot be empty");

      case UpdateValidation.INVALID_EMAIL:
        throw new Error("Invalid email");

      case UpdateValidation.VALID:
        if (oldPassword && newPassword) {
          const hashPassword = await bcrypt.hash(newPassword, 10);
          await this.usersRepository.updatePassword(hashPassword, id);
        }

        const updatedUser = await this.usersRepository.update(id, name, email);
        return updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.usersRepository.findById(id);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await this.usersRepository.delete(id);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  }

  private async getUpdateValidationType(
    userToUpdate: User | null,
    { name, email, oldPassword, newPassword }: UserUpdate
  ): Promise<UpdateValidation> {
    if (!userToUpdate) {
      return UpdateValidation.USER_NOT_FOUND;
    }

    const isUpdatingPassword =
      oldPassword !== undefined || newPassword !== undefined;
    const isOldPasswordMissing =
      oldPassword === undefined || oldPassword === "";
    const isNewPasswordMissing =
      newPassword === undefined || newPassword === "";

    if (isUpdatingPassword && (isOldPasswordMissing || isNewPasswordMissing)) {
      return UpdateValidation.MISSING_NEW_PASSWORD;
    }

    if (isUpdatingPassword && !isOldPasswordMissing && !isNewPasswordMissing) {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        userToUpdate.password
      );
      if (!passwordMatch) {
        return UpdateValidation.INVALID_PASSWORD;
      }
    }

    if (name !== undefined && name.trim() === "") {
      return UpdateValidation.EMPTY_NAME;
    }

    if (email !== undefined && !this.isValidEmail(email)) {
      return UpdateValidation.INVALID_EMAIL;
    }

    return UpdateValidation.VALID;
  }
}

export { UsersServices };
