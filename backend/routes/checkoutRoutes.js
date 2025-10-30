import express from "express";

import {
  createCheckout,
  getCheckoutDetails,
} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/", createCheckout);
router.get("/", getCheckoutDetails);

export default router;
