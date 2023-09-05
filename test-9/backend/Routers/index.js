import express from "express"

import AllUserRouter from "./AllUserRouter.js"
import BuyersRouter from "./BuyersRouter.js"
import SellerRouter from "./SellerRouter.js"

const router = express.Router();

router.use("/all", AllUserRouter);
router.use("/buyer", BuyersRouter);
router.use("/seller", SellerRouter)

export default router