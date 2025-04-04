import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/schema";
import { camelToSnake } from "~/utils/formatData";

export default defineEventHandler(async (event) => {
	const supabase = await serverSupabaseClient<Database>(event);
	const body = await readBody(event);
	const { id, ...rest } = body;

	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: "Bad Request",
			message: "Faltando o paramêtro id",
		});
	}

	const updateData = Object.keys(rest).reduce((acc, key) => {
		const snakeKey = camelToSnake(key);
		acc[snakeKey] = rest[key];
		return acc;
	}, {} as Record<string, any>);

	if (Object.keys(updateData).length === 0) {
		throw createError({
			statusCode: 400,
			message: "Nenhum campo fornecido para atualizar.",
		});
	}

	const { data, error } = await supabase
		.from("profiles")
		.update(updateData)
		.eq("id", id)
		.select();

	if (error) {
		throw createError({
			statusCode: 400,
			message: "Falha na atualização do usuário",
			data: error,
		});
	}

	return data;
});
