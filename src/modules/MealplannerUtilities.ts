export interface UserData {
  gender: "male" | "female";
  weight: number;
  height: number;
  age: number;
  activityLevel:
    | "sedentary"
    | "lightly_active"
    | "moderately_active"
    | "very_active"
    | "super_active";
  goal: "lose" | "gain" | "maintain";
}
export type Gender = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "super_active";
export type Goal = "lose" | "gain" | "maintain";

export interface Macronutrients {
  calories: number;
  protein: {
    grams: number;
    calories: number;
  };
  fat: {
    grams: number;
    calories: number;
  };
  carbs: {
    grams: number;
    calories: number;
  };
}

// src/middleware/calculations.ts
import { Request, Response, NextFunction } from "express";
// import { Gender, ActivityLevel, Goal, Macronutrients } from '../types';

// Function to calculate TDEE
function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const activityFactors: { [key in ActivityLevel]: number } = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    super_active: 1.9,
  };

  console.log("bmr", bmr);
  console.log(activityFactors[activityLevel], "aul");
  console.log(activityFactors, "activity");
  return bmr * (activityFactors[activityLevel] || 1);
}

// Function to calculate BMR
function calculateBMR(
  gender: Gender,
  weight: number,
  height: number,
  age: number
): number {
  if (gender === "female") {
    return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  } else if (gender === "male") {
    return 66 + 13.7 * weight + 5 * height - 6.8 * age;
  }
  return 0;
}

// Function to calculate macronutrients
function calculateMacronutrients(
  calories: number,
  weight: number,
  goal: Goal
): Macronutrients {
  let proteinGrams: number,
    proteinCalories: number,
    fatCalories: number,
    fatGrams: number,
    carbCalories: number,
    carbGrams: number;

  // Calculate protein needs
  if (goal === "lose") {
    proteinGrams = 1 * weight;
  } else if (goal === "gain") {
    proteinGrams = 2 * weight;
  } else {
    proteinGrams = 1.5 * weight;
  }
  proteinCalories = proteinGrams * 4;

  // Calculate fat needs (25% of total calories)
  fatCalories = calories * 0.25;
  fatGrams = fatCalories / 9;

  // Calculate carbohydrate needs (remaining calories)
  carbCalories = calories - (proteinCalories + fatCalories);
  carbGrams = carbCalories / 4;

  return {
    calories,
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
    },
    carbs: {
      grams: carbGrams,
      calories: carbCalories,
    },
  };
}

// Middleware to calculate nutritional needs
export function calculateNutritionalNeeds(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { gender, weight, height, age, activityLevel, goal } =
    req.body.userProfile;
  console.log("middleware", gender, weight, height, age);

  const bmr = calculateBMR(gender, weight, height, age);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Adjust TDEE for weight goals
  let finalCalories;
  if (goal === "lose") {
    finalCalories = tdee - 500;
  } else if (goal === "gain") {
    finalCalories = tdee + 500;
  } else {
    finalCalories = tdee;
  }

  const macros = calculateMacronutrients(finalCalories, weight, goal);

  console.log("bmr", bmr);
  console.log("tdee", tdee);
  console.log("macros", macros);
  // Attach calculated data to request object
  req.body.calculations = {
    bmr,
    tdee,
    macros,
  };

  next();
}
