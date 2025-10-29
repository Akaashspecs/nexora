import express from "express";
import { addProducts, getPorducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getPorducts);
router.post("/", addProducts);

export default router;
