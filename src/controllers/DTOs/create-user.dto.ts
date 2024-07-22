export class CreateUserDTO {
  id?: string;
  name!: string;
  email!: string;
  password!: string;
  createdAt?: Date;
  updatedAt?: Date;
}
