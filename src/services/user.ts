import { ApiResponse } from "../dtos";
import { User, UserReq } from "../dtos/user";
import { v4 as uuidV4 } from "uuid";
import { NotFoundException } from "../exceptions/notFoundException";

class UserService {
  private usersDb: User[] = [
    { id: "77720b21-ce68-4cc6-879b-a0ab79771ad6", name: "duke" },
    { id: "9dd6dc79-09b0-41c4-bec8-5f5f3cc8c149", name: "canela" },
  ];

  async getUserById(payload: Pick<User, "id">): Promise<ApiResponse<User>> {
    return new Promise((resolve, reject) => {
      try {
        const foundUser = this.usersDb.find((user) => user.id === payload.id);

        if (!foundUser) {
          throw new NotFoundException();
        }

        resolve({
          data: foundUser,
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async saveUser(payload: UserReq): Promise<ApiResponse<User>> {
    try {
      const newUser: User = {
        id: uuidV4(),
        name: payload.name,
      };
      return {
        data: newUser,
      };
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
