import { Router } from "express";
import { calculateNutritionalNeeds } from "./modules/MealplannerUtilities";
import {
  getSingleRecipe,
  updateProfile,
  getRecipe,
  getMeals,
  postMeals,
  postPlaning,
} from "./handlers/userController";

const router = Router();

router.patch("/dashboard/profile", calculateNutritionalNeeds, updateProfile);

router.post("/dashboard/planing", postPlaning);

router.post("/dashboard/meals", postMeals);
router.get("/dashboard/meals", getMeals);

router.post("/dashboard/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  res.status(200).json({ message: true, username: user.name });
});

router.get("/recipe/:id", getRecipe);

router.get("/recipes/:id", getSingleRecipe);

export default router;
