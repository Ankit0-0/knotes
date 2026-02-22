import bcrypt from "bcrypt";

import { ERROR, SUCCESS } from "../../../constants/messages";
import { UserRepository } from "../repositories/user.repository";
import { generateToken } from "../../../utils/generate-token.util";
import { LoginInputTypes, RegisterInputTypes } from "../types/user.types";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async heartbeat() {
    return {
      status: "success",
      message: "User service is alive",
    };
  }

  async login(loginInputObject: LoginInputTypes) {
    const { email, password } = loginInputObject;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      return {
        status: "error",
        message: ERROR.USER_NOT_FOUND,
        data: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!isPasswordValid) {
      return {
        status: "error",
        message: "Invalid credentials",
      };
    }

    const token = generateToken(user.id, user.role?.name || "USER");

    return {
      status: "success",
      message: SUCCESS.LOGIN_SUCCESSFUL,
      token,
      data: null,
    };
  }

  async register(registerInputObject: RegisterInputTypes) {
    const { email, firstName, password } = registerInputObject;

    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      return {
        status: "error",
        message: ERROR.USER_EXISTS_WITH_EMAIL,
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      firstName,
    });

    const token = generateToken(newUser.id, newUser.role?.name || "USER");
    return {
      status: "success",
      message: SUCCESS.REGISTRATION_SUCCESSFUL,
      token,
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      return {
        status: "error",
        message: ERROR.USER_NOT_FOUND,
        data: null,
      };
    }

    return {
      status: "success",
      message: SUCCESS.USER_FOUND,
      data: user,
    };
  }
}
