const Mutations = {
	async createItem(parent, args, ctx, info) {
		//TODO Check if they are logged in 
		const item = await ctx.db.mutation.createItem({
			data: {
				...args
			}
		}, info);

		return item;
	},
	updateItem(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		// then remove the ID from the updates
		delete updates.id;
		// run the updated method
		return ctx.db.mutation.updateItem({
			data: updates,
			where: {
				id: args.id,
			}
		},
			info
		);
	},

	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// find the item
		const item = await ctx.db.query.item({ where }, `{ id, title }`);
		//check if they have permissions
		// TODO
		//delete item
		return ctx.db.mutation.deleteItem({ where }, info);
	}
};

module.exports = Mutations;
