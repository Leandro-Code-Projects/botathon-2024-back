import dotenv from "dotenv";
dotenv.config();

import { Nullable } from "../interfaces";
import { IPrivateEnvs, privateEnvsSchema } from "./schema";
import { EnvParsingError } from "../errors/envParsingError";

let privateEnvs: Nullable<IPrivateEnvs> = null;

export const getPrivateEnvs = () => {
  if (privateEnvs) {
    return privateEnvs;
  }

  const values = {
    PORT: process.env.PORT,
  };

  const parsedEnv = privateEnvsSchema.safeParse(values);

  if (!parsedEnv.success) {
    const errorMessage =
      "Error loading private environment variables: " + parsedEnv.error.message;
    throw new EnvParsingError(errorMessage);
  }

  privateEnvs = {
    port: parsedEnv.data.PORT,
  };

  return privateEnvs;
};

export const resetPrivateEnvs = () => {
  privateEnvs = null;
};
