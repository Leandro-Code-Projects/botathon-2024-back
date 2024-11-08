import { getPrivateEnvs, resetPrivateEnvs } from ".";
import { EnvParsingError } from "../errors/envParsingError";
import { privateEnvsSchema } from "./schema";

jest.mock("./schema", () => ({
  privateEnvsSchema: {
    safeParse: jest.fn(),
  },
}));

describe("getPrivateEnvs", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetPrivateEnvs();
  });

  it("should parse environment variables and return privateEnvs", () => {
    const mockData = {
      PORT: 4000,
    };

    (privateEnvsSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    });

    const result = getPrivateEnvs();

    expect(result).toEqual({
      port: mockData.PORT,
    });
  });

  it("should return cached privateEnvs on subsequent calls", () => {
    const mockData = {
      PORT: "4000",
    };
    
    (privateEnvsSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    });

    const firstCall = getPrivateEnvs();
    const secondCall = getPrivateEnvs();

    expect(firstCall).toBe(secondCall);
    expect(privateEnvsSchema.safeParse).toHaveBeenCalledTimes(1);
  });

  it("should throw EnvParsingError when parsing fails", () => {
    (privateEnvsSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: { message: "Parsing error" },
    });

    expect(() => getPrivateEnvs()).toThrow(EnvParsingError);
  });

  it("should reset privateEnvs when resetPrivateEnvs is called", () => {
    const mockData = {
      PORT: 4000,
    };
    
    (privateEnvsSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    });

    getPrivateEnvs();
    resetPrivateEnvs();
    getPrivateEnvs();

    expect(privateEnvsSchema.safeParse).toHaveBeenCalledTimes(2);
  });
});