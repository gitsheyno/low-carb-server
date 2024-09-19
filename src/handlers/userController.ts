import prisma from "../db";
import { Recipe } from "../modules/types";

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const macrosData = req.body.calculations;

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      id: req.user.id,
      gender: req.body.userProfile.gender,
      weight: req.body.userProfile.weight,
      height: req.body.userProfile.height,
      age: req.body.userProfile.age,
      activity: req.body.userProfile.activityLevel,
      goal: req.body.userProfile.goal,
      bmr: macrosData.bmr,
      tdee: macrosData.tdee,
      proteinGram: macrosData.macros.protein.grams,
      proteinCal: macrosData.macros.protein.calories,
      fatGram: macrosData.macros.fat.grams,
      fatCal: macrosData.macros.fat.calories,
      carbsGram: macrosData.macros.carbs.grams,
      carbsCal: macrosData.macros.carbs.calories,
      calories: macrosData.macros.calories,
    },
  });

  console.log(user, "pro user ");

  res.status(200).json({ data: { message: "profile updated" } });
};

export const getSingleRecipe = async (req, res) => {
  const id = req.params.id || "pizza";

  // const url = 'https://low-carb-recipes.p.rapidapi.com/search?name=cake&tags=keto%3Bdairy-free&includeIngredients=egg%3Bbutter&excludeIngredients=cinnamon&maxPrepareTime=10&maxCookTime=20&maxCalories=500&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10';
  const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${id}&limit=8`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  const data = await fetch(url, options);
  const response = await data.json();

  res.status(200).json({
    user: req.user.username,
    data: { response },
  });
};

export const getRecipe = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  const url = `https://low-carb-recipes.p.rapidapi.com/recipes/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    res.json({ data: { result } });
  } catch (error) {
    console.error(error);
  }
};

export const getMeals = async (req, res) => {
  const id = req.params.id;

  const mealLimit = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (mealLimit.age === 0) {
    const newMealObject = {
      id: req.user.id,
      name: req.user.name,
      calories: 0,
      proteinCal: 0,
      proteinGram: 0,
      carbsGram: 0,
      carbsCal: 0,
      fatGram: 0,
      fatCal: 0,
      belongsToId: req.user.id,
      status: false,
      meals: [], // Adding the array property
    };
    res.status(200).json({ data: newMealObject });
    return;
  }

  const mealAdded = await prisma.userMeal.findMany({
    where: {
      belongsToId: req.user.id,
    },
  });

  const newMealObject = {
    id: req.user.id,
    name: "shayan",
    calories: mealLimit.calories,
    proteinCal: mealLimit.proteinCal,
    proteinGram: mealLimit.proteinGram,
    carbsGram: mealLimit.carbsGram,
    carbsCal: mealLimit.carbsCal,
    fatGram: mealLimit.fatGram,
    fatCal: mealLimit.fatCal,
    belongsToId: req.user.id,
    status: true,
    meals: mealAdded, // Adding the array property
  };

  res.status(200).json({ data: newMealObject });
};

export const postMeals = async (req, res, next) => {
  const id = req.params.id;

  // Prepare the data to match the Prisma model
  const mealsData = req.body.data.map((meal) => ({
    // id: meal.id,
    name: meal.name,
    calories: meal.caloriesKCal,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    image: meal.image,
    belongsToId: req.user.id,
  }));

  try {
    // Use createMany to save multiple records at once
    const createdMeals = await prisma.userMeal.createMany({
      data: mealsData,
    });
    res.status(200).json({ data: { message: "received" } });
  } catch (err) {
    next(err);
  }
};

export const postPlaning = async (req, res) => {
  // const createdMeals = fetched.map(
  //   ({ id, name, image, nutrients, description, servings, cookTime }) => ({
  //     id,
  //     name,
  //     image,
  //     caloriesKCal: nutrients["caloriesKCal"],
  //     protein: nutrients["protein"],
  //     carbs: nutrients["totalCarbs"],
  //     fat: nutrients["fat"],
  //     description,
  //     servings,
  //     cookTime,
  //   })
  // );

  const id = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const allowedCalories = user.calories;

  const query = req.body.data;
  const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${query}&limit=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const createdMeals = (result as Recipe[]).map(
      ({ id, name, image, nutrients, description, servings, cookTime }) => ({
        id,
        name,
        image,
        caloriesKCal: nutrients["caloriesKCal"],
        protein: nutrients["protein"],
        carbs: nutrients["totalCarbs"],
        fat: nutrients["fat"],
        description,
        servings,
        cookTime,
      })
    );

    res.status(200).json({ data: { createdMeals } });
  } catch (error) {
    console.error(error);
  }
};
