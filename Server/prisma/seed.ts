import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedDb = async () => {
	const user = await prisma.user.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: "Haroon",
			email: "haroon@neverita.com",
			hashedPassword:
				"$2b$05$zSoIg3wBddjeU8UT0hLm6OuHMqQDJQMwEaHm2WoRP.O7WkaCz12cS",
		},
	});

	const bread = prisma.ingredient.upsert({
		where: { name: "bread" },
		update: {},
		create: {
			name: "bread",
			userId: user.id,
		},
	});

	const avocado = prisma.ingredient.upsert({
		where: { name: "avocado" },
		update: {},
		create: {
			name: "avocado",
			userId: user.id,
		},
	});

	const salt = prisma.ingredient.upsert({
		where: { name: "salt" },
		update: {},
		create: {
			name: "salt",
			userId: user.id,
		},
	});

	const [awaitedBread, awaitedAvocado, awaitedSalt] = await Promise.all([
		bread,
		avocado,
		salt,
	]);

	await prisma.recipe.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: "Avocado Toast",
			description: "Creamy avocado spread on toast - good for breakfast/snack",
			recipeIngredient: {
				create: [
					{
						Ingredients: { connect: { id: awaitedBread.id } },
						quantity: "2",
						cookingMethod: "toasting",
						preparationType: "",
					},
					{
						Ingredients: { connect: { id: awaitedAvocado.id } },
						quantity: "1",
						cookingMethod: "mashing",
						preparationType: "",
					},
					{
						Ingredients: { connect: { id: awaitedSalt.id } },
						quantity: "1 tbsp",
						cookingMethod: "sprinkling",
						preparationType: "",
					},
				],
			},
			userId: user.id,
		},
	});
};

seedDb().then(async () => {
	await prisma.$disconnect();
});
