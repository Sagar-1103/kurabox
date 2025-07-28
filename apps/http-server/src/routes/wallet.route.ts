import { Router,type Router as ExpressRouter } from "express";
import { getBalances } from "../controllers/balances.controller";

const router:ExpressRouter = Router();

// Getting balances of users wallets
router.route("/balances").post(getBalances);

export default router;