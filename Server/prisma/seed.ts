import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedDb = async () => {
	const bread = await prisma.ingredient.upsert({
		where: { name: "bread" },
		update: {},
		create: {
			name: "bread",
			userId: 1,
		},
	});

	const avocado = await prisma.ingredient.upsert({
		where: { name: "avocado" },
		update: {},
		create: {
			name: "avocado",
			userId: 1,
		},
	});

	const salt = await prisma.ingredient.upsert({
		where: { name: "salt" },
		update: {},
		create: {
			name: "salt",
			userId: 1,
		},
	});

	const user = await prisma.user.upsert({
		where: { id: 1 },
		update: {},
		create: {
			name: "Haroon",
			email: "haroon@neverita.com",
			recipies: {
				create: {
					name: "Avocado Toast",
					description:
						"Creamy avocado spread on toast - good for breakfast/snack",
					recipeIngredient: {
						create: [
							{
								Ingredients: { connect: { id: bread.id } },
								quantity: "2",
								cookingMethod: "toasting",
								preparationType: "",
							},
							{
								Ingredients: { connect: { id: avocado.id } },
								quantity: "1",
								cookingMethod: "mashing",
								preparationType: "",
							},
							{
								Ingredients: { connect: { id: salt.id } },
								quantity: "1 tbsp",
								cookingMethod: "sprinkling",
								preparationType: "",
							},
						],
					},
				},
			},
		},
	});
};

seedDb().then(async () => {
	await prisma.$disconnect();
});
