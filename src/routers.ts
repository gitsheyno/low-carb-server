import { Router } from "express";
import fs from "fs";
import path from "path";
import { UserRequest } from "./modules/types";
import { calculateNutritionalNeeds } from "./modules/MealplannerUtilities";
import prisma from "./db";
import { Recipe } from "./modules/types";
const router = Router();

router.patch(
  "/dashboard/profile",
  calculateNutritionalNeeds,
  async (req, res) => {
    const userId = req.user.id;
    const macrosData = req.body.calculations;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        // ...req.body,
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
  }
);

router.post("/dashboard/planing", async (req, res) => {
  const fetched = [
    {
      id: "a276502d-6022-47c3-ad03-ac78bd7b8c25",
      name: "Keto Burger Plate",
      tags: [
        "chicken-free",
        "egg-free",
        "fish-free",
        "gluten-free",
        "keto",
        "kid-friendly",
        "lchf",
        "meal-plan-ok",
        "peanut-free",
        "pork-free",
        "quick-easy",
        "shellfish-free",
        "soy-free",
        "tree-nut-free",
        "wheat-free",
      ],
      description:
        "Who needs a bun when you could have a burger plate?  This meal is super easy to put together for several people.  The plate includes an addition of baby kale greens, tomatoes (which are optional), a couple slices of cheese, pickles and mayo!",
      prepareTime: 15,
      cookTime: 10,
      ingredients: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      steps: [
        "Divide ground beef into four pieces and make them into a flat patty.  Sprinkle each side with seasoning.  You can always use any keto friendly seasoning you’d like or simply salt and pepper instead.",
        "Heat a grill on HIGH until hot.  Grill each burger for about 3 minutes on the first side and 3-5 minutes on the other side until the juices run clear.  In the meantime, prepare the burger plate by placing the baby kale and seasoning it with olive oil and a pinch of salt as well as the cucumber, pickles and tomatoes.  The cucumber and tomatoes could use a pinch of salt as well.  Then place the slices of cheese.",
        "Once the burgers are cooked, add them to the plate along with the mayo.",
      ],
      servings: 4,
      servingSizes: [[Object]],
      nutrients: {
        caloriesKCal: 483.146,
        caloriesKJ: 2021.483,
        totalCarbs: 4.985,
        diabetesCarbsADA: 4.985,
        netCarbs: 3.615,
        diabetesCarbs: 3.68,
        fiber: 1.24,
        starch: 0.317,
        sugar: 2.325,
        addedSugar: 0.045,
        sugarAlcohols: 0.13,
        protein: 36.904,
        fat: 34.282,
        transFat: 0.456,
        monousatFat: 10.915,
        polyunsatFat: 7.156,
        omega3Fat: 0.799,
        omega6Fat: 6.356,
        saturatedFat: 11.891,
        cholesterol: 125.565,
        vitaminA: 98.783,
        vitaminC: 23.878,
        vitaminD: 0.081,
        vitaminE: 1.641,
        vitaminK: 146.027,
        vitaminB1: 0.078,
        vitaminB2: 0.232,
        vitaminB3: 6.284,
        vitaminB5: 0.846,
        vitaminB6: 0.472,
        vitaminB12: 2.841,
        potassium: 553.077,
        magnesium: 38.275,
        calcium: 194.591,
        iron: 3.723,
        zinc: 7.757,
        copper: 0.361,
        phosphorus: 250.074,
        sodium: 747.974,
        selenium: 25.038,
        folate: 36.289,
        choline: 105.401,
        alcohol: 0,
        caffeine: 0,
        gluten: 0,
        manganese: 0.173,
        conjugatedLinoleicAcid: 0.045,
        phyticAcid: 4.83,
        xylitol: 0,
        isomalt: 0,
        sorbitol: 0.001,
        maltitol: 0,
        lactitol: 0,
        erythritol: 0,
        pinitol: 0,
        inositol: 0.071,
        mannitol: 0.058,
      },
      image:
        "https://tinyurl.com/2p82zzca/a276502d-6022-47c3-ad03-ac78bd7b8c25.png",
    },
    {
      id: "97cef09c-c048-48ef-afcd-341b9183e724",
      name: "Keto Salmon Burger Patties",
      tags: [
        "beef-free",
        "chicken-free",
        "dairy-free",
        "gluten-free",
        "keto",
        "lchf",
        "peanut-free",
        "pescatarian",
        "pork-free",
        "relevant-meal--lunch",
        "shellfish-free",
        "soy-free",
        "tree-nut-free",
        "wheat-free",
      ],
      description:
        "These quick and easy Keto salmon patties make a great lunch or light dinner option. Our simple low carb burger patties are prepared with canned skinless and boneless salmon, fresh dill, chopped green olives, a hint of lemon zest and are bound together with egg. Once shaped, the burger patties are simply pan-fried in olive oil until golden brown all over. These tasty Keto patties are also suitable if you are following a Paleo diet.\n" +
        "\n" +
        "### How to Season Your Keto Fish Patties\n" +
        "\n" +
        "We have added chopped green olives and fresh dill to our Keto burger patties. This recipe is, however, very versatile and easy to adapt. You could swap the olives for chopped capers or even use black olives and sub the dill for some fresh parsley or basil. The basic recipe makes a great base for you to experiment with your favorite low carb seasonings and flavors. Please be sure to adjust your macros to account for any changes made to the original recipe.\n" +
        "\n" +
        "### Serving Suggestions\n" +
        "\n" +
        "This Keto fish recipe makes a great protein-packed option for lunch or dinner. Perfect served with a Mediterranean salad or some buttered broccoli. Alternatively, you can serve the patties in your favorite low carb bun or wrap, turning them into a Keto burger. These would work well in a lettuce wrap or a Keto bread bun with a lemon mayonnaise dressing.",
      prepareTime: 10,
      cookTime: 10,
      ingredients: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      steps: [
        "Drain the salmon and flake the flesh into a bowl. Finely chop the dill and olives and add to the bowl along with the lemon zest, salt and pepper. Mix well to combine. You may add more or less seasonings to taste as desired. ",
        "Crack the egg into the bowl with the other ingredients. Mix well so that everything is well coated in the egg. The mixture should be bound together and easy to mold with your hands.",
        "Heat the olive oil in a non-stick skillet over a medium heat. Divide the salmon mixture into two even-sized portions and shape into patties with your hands. Place the patties in the skillet and cook for 3-4 minutes or until golden. Carefully flip the patties with a silicone spatula and cook on the second side for 3-4 minutes or until golden brown all over, cooked through and piping. Serve with your preferred Keto sides.",
      ],
      servings: 2,
      servingSizes: [[Object]],
      nutrients: {
        caloriesKCal: 266,
        caloriesKJ: 1112.945,
        totalCarbs: 0.91,
        diabetesCarbsADA: 0.91,
        netCarbs: 0.42,
        diabetesCarbs: 0.422,
        fiber: 0.485,
        starch: 0.06,
        sugar: 0.304,
        addedSugar: 0,
        sugarAlcohols: 0.005,
        protein: 29.106,
        fat: 16.35,
        transFat: 0.041,
        monousatFat: 8.353,
        polyunsatFat: 2.865,
        omega3Fat: 1.609,
        omega6Fat: 1.256,
        saturatedFat: 2.874,
        cholesterol: 176.18,
        vitaminA: 58.767,
        vitaminC: 1.526,
        vitaminD: 16.92,
        vitaminE: 3.045,
        vitaminK: 5.4,
        vitaminB1: 0.048,
        vitaminB2: 0.346,
        vitaminB3: 8.45,
        vitaminB5: 0.951,
        vitaminB6: 0.153,
        vitaminB12: 5.858,
        potassium: 415.251,
        magnesium: 40.226,
        calcium: 340.51,
        iron: 1.264,
        zinc: 1.33,
        copper: 0.11,
        phosphorus: 468.557,
        sodium: 563.708,
        selenium: 51.679,
        folate: 15.094,
        choline: 165.711,
        alcohol: 0,
        caffeine: 0,
        gluten: 0,
        manganese: 0.065,
        conjugatedLinoleicAcid: 0.006,
        phyticAcid: 0.717,
        xylitol: 0,
        isomalt: 0,
        sorbitol: 0,
        maltitol: 0,
        lactitol: 0,
        erythritol: 0,
        pinitol: 0,
        inositol: 0.004,
        mannitol: 0.001,
      },
      image:
        "https://tinyurl.com/2p82zzca/97cef09c-c048-48ef-afcd-341b9183e724.png",
    },
    {
      id: "5ff5bdc8-1c83-4a43-9014-be20f2bed7aa",
      name: "Keto Vegan Burger Patties",
      tags: [
        "beef-free",
        "chicken-free",
        "dairy-free",
        "egg-free",
        "fish-free",
        "gluten-free",
        "kid-friendly",
        "lunch",
        "peanut-free",
        "pork-free",
        "shellfish-free",
        "tree-nut-free",
        "vegan",
        "vegetarian",
        "wheat-free",
      ],
      description:
        "You can easily make this recipe for Keto vegan burgers for your meal prep or when you only have an hour to work on dinner. There are tons of things you can do with the recipe. Of course, you can use the burgers in the traditional way. Sandwich your vegan burger patty in a Keto burger bun and add your favorite low-carb toppings. Common burger toppings like lettuce, tomato, ketchup, mustard, onion, and avocado are all acceptable on the Keto diet. You may also leave the burger pattie as they are, and instead pair them with a healthier Keto side dish, such as sauteed green vegetables. Instead of forming individual patties, you may also use the recipe as a meatloaf mixture. Just slice and serve for your meal prep containers or at the dinner table! If you’re storing leftovers, you can keep these vegan burgers in an air-tight container in your refrigerator for up to 5 days.\n" +
        "\n" +
        "### Helpful Tips For Converting Vegan Recipes To Keto\n" +
        "\n" +
        "If you’re new to Keto, you may need to use a little creativity when converting your usual vegan recipes to Keto-friendly ones. In many cases, the vegan diet includes a lot of carbs, especially if you’re trying to make a vegan version of non-vegan food. To help cut out carbs, look at the ingredients that are already listed in your favorite vegan recipes, and see which ingredients can be swapped for a spice or herb that is lower in carbs. For example, instead of using fresh onion and garlic in this recipe, it will save you carbohydrates by swapping those for dried spices like onion and garlic powders. Your spice rack will be your best friend on the Keto diet!\n" +
        "\n" +
        "### Vegan Burger Buns And Wraps\n" +
        "\n" +
        "If you’d like to eat your Keto vegan burger the old-fashioned way, Carb Manager has a variety of options. The healthiest and most Keto-friendly way to eat your burger is in a lettuce wrap. If you want a bun, head to the Carb Manager Low Carb Vegan Burger w Sesame Seed Bun recipe. It utilizes this vegan Keto burger patty recipe and adds a Keto bun recipe for you!\n" +
        "\n" +
        "Jessica L.",
      prepareTime: 20,
      cookTime: 40,
      ingredients: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      steps: [
        "Combine minced mushrooms, celery, and cauliflower rice in a large mixing bowl. For the mushrooms and celery, mince the vegetables as finely as you can. The finer and more equal you can mince all the pieces, the easier it will be to form your patties later. For the cauliflower rice, it will be best to use riced cauliflower. You can choose either thawed riced cauliflower from your freezer or rice your own fresh cauliflower. Use the photo as a reference for what your minced veggies should look like.",
        "Heat the olive oil in a wide pan over medium-high heat. When the oil is hot, add the minced veggies to the pan. Season the pan with salt, pepper, onion powder, paprika, cumin, garlic powder, and parsley. Stir the vegetables and seasonings together as it all cooks down. Let the veggies at the bottom of the pan brown before stirring again. Continue this method until all the vegetables are cooked down into a softened, still moist texture - as much as 10 minutes.",
        "At the end of cooking, stir the soy sauce into the pan and let it cook off. Take the pan off the stove heat and allow it to cool for just 1-2 minutes. Stir milled flaxseed and raw chia seeds into the still-hot pan (don’t worry, the chia seeds will cook more later). Set the pan aside to continue cooling until you can touch the burger mixture comfortably. Meanwhile, turn on the oven to preheat to 400 degrees. ",
        "Line a sheet tray with parchment paper. Form patties using the cooled burger mixture by rolling about 4 tablespoons at a time into a ball. Then, press the ball onto the parchment paper with your palm until it forms a pattie about ½”-thick. Repeat the process until all your burgers are made. If you have any leftover burger mixture, just divide it evenly amongst the prepared patties.",
        "Bake the patties in your oven for 20 minutes. Then, flip them over and bake for an additional 10 minutes. When the patties are cooked through, they will naturally release from the parchment paper when you give your sheet tray a little shake. The patties will have crispy outsides and delicate insides. Use a spatula to transfer the patties for serving. Suggestions for using the burger patties are described in the introduction at the top of the recipe.",
      ],
      servings: 4,
      servingSizes: [[Object]],
      nutrients: {
        caloriesKCal: 75.539,
        caloriesKJ: 316.056,
        totalCarbs: 5.346,
        diabetesCarbsADA: 5.346,
        netCarbs: 2.3,
        diabetesCarbs: 2.457,
        fiber: 2.733,
        starch: 0.525,
        sugar: 1.51,
        addedSugar: 0,
        sugarAlcohols: 0.314,
        protein: 2.75,
        fat: 5.52,
        transFat: 0.002,
        monousatFat: 2.797,
        polyunsatFat: 1.786,
        omega3Fat: 0.273,
        omega6Fat: 0.141,
        saturatedFat: 0.687,
        cholesterol: 0,
        vitaminA: 11.321,
        vitaminC: 13.281,
        vitaminD: 10.174,
        vitaminE: 0.666,
        vitaminK: 21.359,
        vitaminB1: 0.11,
        vitaminB2: 0.2,
        vitaminB3: 1.701,
        vitaminB5: 0.684,
        vitaminB6: 0.148,
        vitaminB12: 0.032,
        potassium: 295.478,
        magnesium: 30.599,
        calcium: 39.224,
        iron: 0.919,
        zinc: 0.701,
        copper: 0.233,
        phosphorus: 94.673,
        sodium: 389.684,
        selenium: 10.239,
        folate: 31.514,
        choline: 20.475,
        alcohol: 0,
        caffeine: 0,
        gluten: 0,
        manganese: 0.164,
        conjugatedLinoleicAcid: 0,
        phyticAcid: 46.434,
        xylitol: 0.006,
        isomalt: 0,
        sorbitol: 0,
        maltitol: 0,
        lactitol: 0,
        erythritol: 0,
        pinitol: 0,
        inositol: 0.008,
        mannitol: 0.3,
      },
      image:
        "https://tinyurl.com/2p82zzca/5ff5bdc8-1c83-4a43-9014-be20f2bed7aa.png",
    },
    {
      id: "d754c8de-acd6-41d9-8280-5984dbab34d8",
      name: "Keto Zucchini Burger Boats ",
      tags: [
        "chicken-free",
        "egg-free",
        "fish-free",
        "gluten-free",
        "keto",
        "lchf",
        "peanut-free",
        "pork-free",
        "relevant-meal--lunch",
        "shellfish-free",
        "soy-free",
        "tree-nut-free",
        "wheat-free",
      ],
      description:
        "These simple zucchini boats are loaded with classic burger flavors of beef, onion, tomato and cheese.\n" +
        "\n" +
        "These are a great lunch served with salad or keto fries!",
      prepareTime: 7,
      cookTime: 15,
      ingredients: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      steps: [
        "Slice the zucchini in half lengthwise and scoop out some of the center to provide extra room for the filling. Heat a griddle pan over a high heat and add the zucchini slices cut side down. Cook for 3-4 minutes each side until tender and char lines appear. ",
        "Whilst the zucchini is cooking, heat the olive oil in a skillet over a medium heat. Add the beef and cook until just browned. Crush the garlic and add to the beef and continue to cook until the garlic is tender and the beef is well browned.",
        "Divide the beef between the two zucchini boats.",
        "Finely dice the onion and tomato and scatter over the beef.",
        "Top with the grated cheese to serve.",
      ],
      servings: 2,
      servingSizes: [[Object]],
      nutrients: {
        caloriesKCal: 237.597,
        caloriesKJ: 994.108,
        totalCarbs: 4.072,
        diabetesCarbsADA: 4.072,
        netCarbs: 2.771,
        diabetesCarbs: 2.819,
        fiber: 1.205,
        starch: 0.435,
        sugar: 2.153,
        addedSugar: 0,
        sugarAlcohols: 0.095,
        protein: 19.476,
        fat: 15.955,
        transFat: 0.297,
        monousatFat: 8.375,
        polyunsatFat: 1.19,
        omega3Fat: 0.139,
        omega6Fat: 1.051,
        saturatedFat: 4.793,
        cholesterol: 61.376,
        vitaminA: 75.906,
        vitaminC: 14.506,
        vitaminD: 0.064,
        vitaminE: 1.309,
        vitaminK: 10.466,
        vitaminB1: 0.067,
        vitaminB2: 0.158,
        vitaminB3: 3.913,
        vitaminB5: 0.695,
        vitaminB6: 0.331,
        vitaminB12: 1.647,
        potassium: 480.689,
        magnesium: 34.083,
        calcium: 67.757,
        iron: 2.303,
        zinc: 4.772,
        copper: 0.116,
        phosphorus: 186.673,
        sodium: 369.916,
        selenium: 15.684,
        folate: 32.504,
        choline: 65.293,
        alcohol: 0,
        caffeine: 0,
        gluten: 0,
        manganese: 0.225,
        conjugatedLinoleicAcid: 0.03,
        phyticAcid: 6.218,
        xylitol: 0,
        isomalt: 0,
        sorbitol: 0.001,
        maltitol: 0,
        lactitol: 0,
        erythritol: 0,
        pinitol: 0,
        inositol: 0.068,
        mannitol: 0.026,
      },
      image:
        "https://tinyurl.com/2p82zzca/d754c8de-acd6-41d9-8280-5984dbab34d8.png",
    },
    {
      id: "17e12c70-eb59-4849-bfb3-f6eaef332ceb",
      name: "Ultimate Keto OMAD Burger",
      tags: [
        "chicken-free",
        "fish-free",
        "gluten-free",
        "keto",
        "lchf",
        "peanut-free",
        "relevant-meal--main-dishes",
        "shellfish-free",
        "soy-free",
        "tree-nut-free",
        "wheat-free",
      ],
      description:
        "This deliciously juicy Keto OMAD burger is stacked high with a juicy ground beef patty, crispy bacon, sweet tomato, tangy gherkins, and a fried egg. We have served our ultimate Keto burger with a creamy cabbage slaw to add a helping of veggies to your Keto OMAD meal. Simply wrapped in lettuce, this Keto OMAD burger recipe is loaded with fats and flavor and guaranteed to keep you satiated throughout the day.\n" +
        "\n" +
        "### How to Make a Keto OMAD Recipe\n" +
        "\n" +
        "OMAD eating is designed to allow your body a 23 hour fast between meals. The idea is that you consume one large meal within a one-hour window - at whichever time of day you choose. Making Keto OMAD recipes is simple to do. The key is to ensure that you are consuming a generous volume of Keto compliant fats, protein, and some low carb veggies. If this is a new way of eating for you, we recommend working with an experienced practitioner or health care professional to ensure you are meeting your body's nutritional requirements.\n" +
        "\n" +
        "### Can I Use a Different Protein?\n" +
        "\n" +
        "We have used beef to create our ultimate Keto burger patty. If you would prefer a different meat, we recommend using fattier cuts such as pork or ground turkey thigh. Not only will this add to the fat count of your Keto OMAD meal, but it will help the burger stay juicy when baking. Please be sure to adjust your macros to account for any changes made to the original recipe.",
      prepareTime: 15,
      cookTime: 23,
      ingredients: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
      ],
      steps: [
        "Preheat the oven to 400 degrees Fahrenheit. Add the ground beef to a mixing bowl along with the garlic powder and a pinch of salt and pepper. Use your hands to mix together well, distributing the seasonings throughout the beef. Please feel free to adjust or add seasoning to personal preference.",
        "Use your hands to form the beef into a patty, roughly 1/2 an inch thick. Place the burger patty onto a shallow oven tray. Transfer to the oven for 18 minutes, or until completely cooked through and piping hot.",
        "While the burger is cooking you can prepare the slaw. Thinly slice the cabbage and onion. Add to a mixing bowl along with a pinch of salt and pepper, 1 tablespoon of olive, the mayonnaise and the mustard. Mix everything together well to combine, coating the cabbage evenly in the dressing. Set to one side.",
        "Once the burger is cooked, layer with the sliced cheese. Return the burger to the oven. Cook for just a few minutes more to allow the cheese to melt, coating the top of the burger.",
        "Heat the olive oil in a skillet over a medium/high heat. Add the bacon and crack the egg into the skillet. Cook the egg through, keeping the yolk runny. Cook the bacon through until golden brown on both sides.",
        "Place one lettuce leaf on a serving plate and sit the cheese-covered patty on top. Thinly slice the pickle, avocado and tomato. Layer the sliced avocado, tomato and pickle over the burger patty.",
        "Place the cooked bacon slice on top of the tomato, avocado and pickle layer. Sit the fried egg on top of the bacon. Finish the burger with the second lettuce leaf. The lettuce will act as a wrap to make it easier (and slightly less messy!) to hold your burger.",
        "Serve the burger alongside the prepared slaw. To eat, hold the burger in the lettuce wrap. Alternatively, use a knife and fork for less mess!",
      ],
      servings: 1,
      servingSizes: [[Object]],
      nutrients: {
        caloriesKCal: 1245.547,
        caloriesKJ: 5211.368,
        totalCarbs: 17.855,
        diabetesCarbsADA: 13.795,
        netCarbs: 9.516,
        diabetesCarbs: 9.625,
        fiber: 8.121,
        starch: 0.68,
        sugar: 6.46,
        addedSugar: 0.117,
        sugarAlcohols: 0.219,
        protein: 86.08,
        fat: 92.72,
        transFat: 1.032,
        monousatFat: 43.458,
        polyunsatFat: 12.396,
        omega3Fat: 1.12,
        omega6Fat: 11.276,
        saturatedFat: 25.595,
        cholesterol: 406.963,
        vitaminA: 244.545,
        vitaminC: 66.876,
        vitaminD: 1.013,
        vitaminE: 6.792,
        vitaminK: 164.114,
        vitaminB1: 0.329,
        vitaminB2: 0.834,
        vitaminB3: 16.197,
        vitaminB5: 3.537,
        vitaminB6: 1.418,
        vitaminB12: 6.88,
        potassium: 1624.025,
        magnesium: 107.566,
        calcium: 344.134,
        iron: 9.301,
        zinc: 18.5,
        copper: 0.4,
        phosphorus: 689.381,
        sodium: 1383.626,
        selenium: 72.857,
        folate: 136.624,
        choline: 379.817,
        alcohol: 0,
        caffeine: 0,
        gluten: 0,
        manganese: 0.537,
        conjugatedLinoleicAcid: 0.097,
        phyticAcid: 107.155,
        xylitol: 0.001,
        isomalt: 0,
        sorbitol: 0.004,
        maltitol: 0,
        lactitol: 0,
        erythritol: 0,
        pinitol: 0,
        inositol: 0.146,
        mannitol: 0.067,
      },
      image:
        "https://tinyurl.com/2p82zzca/17e12c70-eb59-4849-bfb3-f6eaef332ceb.png",
    },
  ];

  const createdMeals = fetched.map(
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

  const id = req.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const allowedCalories = user.calories;

  const query = req.body.data;
  // const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${query}&limit=5`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "05800b0e55msh61a4e11ced57cfbp1cf8f0jsn2c26d2886151",
  //     "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
  //   },
  // };

  // try {
  // 	const response = await fetch(url, options);
  // 	const result  = await response.json();

  //   const createdMeals = (result as Recipe[]).map(({id,name})=>(
  //     {id,name}
  //   ))

  // 	console.log(createdMeals , "result on server");

  //   res.status(200).json(
  //     {data : {createdMeals}}
  //   )
  // } catch (error) {
  // 	console.error(error);
  // }

  // console.log(`calories allowed for ${user.name} : ${user.calories}`);

  res.status(200).json({ data: { createdMeals } });
});

router.post("/dashboard/meals", async (req, res, next) => {
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
});
router.get("/dashboard/meals", async (req, res) => {
  const id = req.params.id;

  // Use createMany to save multiple records at once
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
});

router.post("/dashboard/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  res.status(200).json({ message: true, username: user.name });
});

router.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  const url = `https://low-carb-recipes.p.rapidapi.com/recipes/${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "05800b0e55msh61a4e11ced57cfbp1cf8f0jsn2c26d2886151",
      "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
    },
  };

  const obj = fs.readFile(
    path.join(__dirname, "single.json"),
    "utf-8",
    (error, json) => {
      const result = JSON.parse(json);
      // const filteredRecipe = recipe.slice(0,4)
      // console.log("boro",filteredRecipe.length);
      res.status(200).json({
        user: req.user.username,
        data: { result },
      });
    }
  );

  // try {
  // 	const response = await fetch(url, options);
  // 	const result = await response.json()
  // 	console.log(result , "result");

  //   res.json(
  //     {data : {result}}
  //   )
  // } catch (error) {
  // 	console.error(error);
  // }
});

router.get("/recipes/:id", async (req, res) => {
  // console.log("req", req.url);

  const id = req.params.id || "pizza";
  // console.log(id, "iddd");
  // res.json({data:"shayan"})
  // const url = 'https://low-carb-recipes.p.rapidapi.com/search?name=cake&tags=keto%3Bdairy-free&includeIngredients=egg%3Bbutter&excludeIngredients=cinnamon&maxPrepareTime=10&maxCookTime=20&maxCalories=500&maxNetCarbs=5&maxSugar=3&maxAddedSugar=0&limit=10';
  const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${id}&limit=8`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "05800b0e55msh61a4e11ced57cfbp1cf8f0jsn2c26d2886151",
      "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
    },
  };

  const obj = fs.readFile(
    path.join(__dirname, "sample3.json"),
    "utf-8",
    (error, json) => {
      const response = JSON.parse(json);
      // const filteredRecipe = recipe.slice(0,4)
      // console.log("boro",filteredRecipe.length);
      res.status(200).json({
        user: req.user.username,
        data: { response },
      });
    }
  );

  // const  data = await fetch(url,options)
  // const response = await data.json()

  // res.status(200).json({
  //   user: req.user.username,
  //   data: { response },
  // });
});

router.post("/", (req, res) => {
  res
    .status(200)
    .json({ message: "hello from next log in page", user: req.body.username });
});

export default router;
