// TODO: este archivo debería llamarse userValidations

import { z } from "zod";
import { User, UserReq } from "../dtos/user";
import { Request } from "express";

export const getUserByIdSchemaValidator = z.object({
  userId: z.string().uuid()
});

export const createUserSchemaValidator = z.object({
  name: z.string().min(3),
});

export const validateGetUserById = (req: Request): Pick<User, "id"> => {
  const validated = getUserByIdSchemaValidator.safeParse(req.params);
  if (!validated.success) {
    throw validated.error;
  }

  return {
    id: validated.data.userId,
  };
};

export const validateCreateUser = (req: Request): UserReq => {
  const validated = createUserSchemaValidator.safeParse(req.body);
  if (!validated.success) {
    throw validated.error;
  }

  return {
    name: validated.data.name,
  };
};
