import express from "express";
import {
  addProducts,
  deletePorducts,
  getPorducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getPorducts);
router.post("/", addProducts);
router.delete("/:productId", deletePorducts);
router.put("/", updateProduct);
export default router;
