import { Recipe } from "../modules/types";
import { turso } from "../db/tursoClient";
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const macrosData = req.body.calculations;

  try {
    await turso.execute({
      sql: `
        UPDATE user SET 
          gender = :gender,
          weight = :weight,
          height = :height,
          age = :age,
          activity = :activity,
          goal = :goal,
          bmr = :bmr,
          tdee = :tdee,
          proteinGram = :proteinGram,
          proteinCal = :proteinCal,
          fatGram = :fatGram,
          fatCal = :fatCal,
          carbsGram = :carbsGram,
          carbsCal = :carbsCal,
          calories = :calories
        WHERE id = :id
      `,
      args: {
        id: userId,
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
    res.status(200).json({ data: { message: "profile updated" } });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

export const getSingleRecipe = async (req, res) => {
  const id = req.params.id || "pizza";
  const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${id}&limit=16`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };

  try {
    const data = await fetch(url, options);
    const response = await data.json();
    res.status(200).json({
      user: req.user.username,
      data: { response },
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
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
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

export const getMeals = async (req, res) => {
  const id = req.params.id;

  try {
    const mealLimit = await turso.execute({
      sql: `SELECT * FROM user WHERE id = ?`,
      args: [req.user.id],
    });

    if (mealLimit.rows[0].age === 0) {
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
        meals: [],
      };
      res.status(200).json({ data: newMealObject });
      return;
    }

    const mealAdded = await turso.execute({
      sql: `SELECT * FROM userMeal WHERE belongsToId = ?`,
      args: [req.user.id],
    });

    const newMealObject = {
      id: req.user.id,
      name: "shayan",
      calories: mealLimit.rows[0].calories,
      proteinCal: mealLimit.rows[0].proteinCal,
      proteinGram: mealLimit.rows[0].proteinGram,
      carbsGram: mealLimit.rows[0].carbsGram,
      carbsCal: mealLimit.rows[0].carbsCal,
      fatGram: mealLimit.rows[0].fatGram,
      fatCal: mealLimit.rows[0].fatCal,
      belongsToId: req.user.id,
      status: true,
      meals: mealAdded.rows,
    };

    res.status(200).json({ data: newMealObject });
  } catch (error) {
    res.status(500).json({ error: "Error fetching meals" });
  }
};

export const postMeals = async (req, res, next) => {
  const mealsData = req.body.data.map((meal) => ({
    name: meal.name,
    calories: meal.caloriesKCal,
    protein: meal.protein,
    carbs: meal.carbs,
    fat: meal.fat,
    image: meal.image,
    belongsToId: req.user.id,
  }));
  try {
    const placeholders = mealsData
      .map(
        (_, index) =>
          `(:name${index}, :calories${index}, :protein${index}, :carbs${index}, :fat${index}, :image${index}, :belongsToId${index})`
      )
      .join(", ");

    const args = mealsData.reduce(
      (acc, meal, index) => ({
        ...acc,
        [`name${index}`]: meal.name,
        [`calories${index}`]: meal.calories,
        [`protein${index}`]: meal.protein,
        [`carbs${index}`]: meal.carbs,
        [`fat${index}`]: meal.fat,
        [`image${index}`]: meal.image,
        [`belongsToId${index}`]: meal.belongsToId,
      }),
      {}
    );

    await turso.execute({
      sql: `INSERT INTO userMeal (name, calories, protein, carbs, fat, image, belongsToId) VALUES ${placeholders}`,
      args: args,
    });

    res.status(200).json({ data: { message: "received" } });
  } catch (err) {
    next(err);
  }
};

export const postPlaning = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await turso.execute({
      sql: `SELECT * FROM user WHERE id = ?`,
      args: [id],
    });

    const allowedCalories = user.rows[0].calories;

    const query = req.body.data;
    const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${query}&limit=16`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();

    const createdMeals =
      Array.isArray(result) && result.length > 0
        ? result.map(
            ({
              id,
              name,
              image,
              nutrients,
              description,
              servings,
              cookTime,
            }) => ({
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
          )
        : [];

    res.status(200).json({ data: { createdMeals } });
  } catch (error) {
    res.status(500).json({ error: "Error fetching meal plan" });
  }
};
