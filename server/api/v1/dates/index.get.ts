import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	try {
		const supabase = await serverSupabaseClient(event);
		const user = await serverSupabaseUser(event);
		const { id } = getQuery(event);

		if (!user)
			throw createError({
				statusCode: 400,
				statusMessage: "Usuário não logado",
			});

		if (!id) {
			throw createError({
				statusCode: 400,
				statusMessage: "Bad Request",
				message: "Faltando o paramêtro id",
			});
		}

		const { data, error } = await supabase
			.from("date_available")
			.select("*")
			.eq("admin_id", id);

		if (error) throw error;

		return data;
	} catch (error: any) {
		throw createError({
			statusCode: error.statusCode || 500,
			message: error.message || "Internal Server Error",
			data: error,
		});
	}
});
