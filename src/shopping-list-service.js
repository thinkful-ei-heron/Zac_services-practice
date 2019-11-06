const ShoppingService = {
	getAllItems(knex) {
		return knex.select('*').from('shopping_list')
	},
	insertItem(knex, newArticle) {
		return knex
			.insert(newArticle)
			.into('shopping_list')
			.returning('*')
			.then(rows => rows[0]);
	},
	getById(knex, id) {
		return knex.from('shopping_list').select('*').where('id', id).first()
	},
	deleteItem(knex, id) {
		return knex('shopping_list')
			.where({ id })
			.delete()
	}
};

module.exports = ShoppingService;