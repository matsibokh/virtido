interface IUser {
  user: string;
  password: string;
  balance: number;
}

interface IUserCreateInput extends IUser {}

interface ICreateUserOutput {
  success: boolean;
  message: string;
}

interface IUpdateUserOutput extends ICreateUserOutput {}

export {
  IUser,
  IUserCreateInput,
  ICreateUserOutput,
  IUpdateUserOutput
}
