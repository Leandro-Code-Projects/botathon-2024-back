import { z } from "zod";

export const privateEnvsSchema = z.object({
  PORT: z.coerce.number().min(0).max(65535),
});

export interface IPrivateEnvs {
    port: number;
}