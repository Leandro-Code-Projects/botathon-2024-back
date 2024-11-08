import { v4 as uuidV4 } from "uuid";
import {User, UserReq} from "../../src/dtos/user";
import {NotFoundException} from "../../src/exceptions/notFoundException";
import UserService from "../../src/services/user";

// Mock the uuid module
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe("getUserById", () => {
    it("givenValidUserId_whenGetUserById_thenReturnUser", async () => {
      const userId = "77720b21-ce68-4cc6-879b-a0ab79771ad6";
      const expectedUser: User = { id: userId, name: "duke" };

      const response = await userService.getUserById({ id: userId });

      expect(response.data).toEqual(expectedUser);
    });

    it("givenInvalidUserId_whenGetUserById_thenThrowNotFoundException", async () => {
      const invalidUserId = "non_existent_id";

      await expect(userService.getUserById({ id: invalidUserId })).rejects.toThrow(NotFoundException);
    });
  });

  describe("saveUser", () => {
    it("givenValidUserReq_whenSaveUser_thenReturnUserWithMockedUUID", async () => {
      const newUserReq: UserReq = { name: "newUser" };

      const response = await userService.saveUser(newUserReq);

      expect(response.data.id).toBe("mocked-uuid");
      expect(response.data.name).toBe(newUserReq.name);
    });

    it("givenUUIDGenerationFails_whenSaveUser_thenThrowError", async () => {
      // Directly mock uuidV4 to throw an error
      (uuidV4 as jest.Mock).mockImplementationOnce(() => {
        throw new Error("UUID Error");
      });

      const newUserReq: UserReq = { name: "errorUser" };

      await expect(userService.saveUser(newUserReq)).rejects.toThrow("UUID Error");
    });
  });
});
