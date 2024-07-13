export type User = {
  id: string;
  createdAT: Date;
  username: string;
  password: string;
};

export type UserRequest = {
  username: string;
  password: string;
  name: string;
};

interface ServingSize {
  units: string;
  desc: string;
  qty: number;
  grams?: number;
  scale: number;
}

interface Ingredient {
  name: string;
  servingSize: ServingSize;
}

interface Serving {
  scale: number;
  qty: number;
  grams: number;
  units: string;
  originalWeight: number;
  originalWeightUnits: string;
}

interface Nutrients {
  caloriesKCal: number;
  caloriesKJ: number;
  totalCarbs: number;
  diabetesCarbsADA: number;
  netCarbs: number;
  diabetesCarbs: number;
  fiber: number;
  starch: number;
  sugar: number;
  addedSugar: number;
  sugarAlcohols: number;
  protein: number;
  fat: number;
  transFat: number;
  monousatFat: number;
  polyunsatFat: number;
  omega3Fat: number;
  omega6Fat: number;
  saturatedFat: number;
  cholesterol: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB1: number;
  vitaminB2: number;
  vitaminB3: number;
  vitaminB5: number;
  vitaminB6: number;
  vitaminB12: number;
  potassium: number;
  magnesium: number;
  calcium: number;
  iron: number;
  zinc: number;
  copper: number;
  phosphorus: number;
  sodium: number;
  selenium: number;
  folate: number;
  choline: number;
  alcohol: number;
  caffeine: number;
  gluten: number;
  manganese: number;
  conjugatedLinoleicAcid: number;
  phyticAcid: number;
  xylitol: number;
  isomalt: number;
  sorbitol: number;
  maltitol: number;
  lactitol: number;
  erythritol: number;
  pinitol: number;
  inositol: number;
  mannitol: number;
}

export interface Recipe {
  id: string;
  name: string;
  tags: string[];
  description: string;
  prepareTime: number;
  cookTime: number;
  ingredients: Ingredient[];
  steps: string[];
  servings: number;
  servingSizes: Serving[];
  nutrients: Nutrients;
  image: string;
}
