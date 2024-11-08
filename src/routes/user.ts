import express from "express";
import UserService from "../services/user";
import { validateCreateUser, validateGetUserById } from "../utils/validations";

const router = express.Router();
const userSrv = new UserService();

router.get("/:userId", async (req, res, next) => {
  try {
    const payload = validateGetUserById(req);
    const data = await userSrv.getUserById(payload);
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = validateCreateUser(req);
    const data = await userSrv.saveUser(payload);
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
});

export default router;
