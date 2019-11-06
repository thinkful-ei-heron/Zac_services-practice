const ShoppingService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping Service', function() {
	let db;
	let testItems = [
		{
			id: 1,
			date_added: new Date('2019-01-22T16:28:32.615Z'),
			name: 'Apple Test',
			price: 0.99,
			category: 'Lunch'
		},
		{
			id: 2,
			date_added: new Date('2019-05-22T16:28:32.615Z'),
			name: 'Banana Test',
			price: 0.59,
			category: 'Breakfast',
			checked: true
		},
		{
			id: 3,
			date_added: new Date('2019-12-22T16:28:32.615Z'),
			name: 'Cherry Test',
			price: 2.99,
			category: 'Snack'
		}
	];

	before(() => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		})
	})

	before(() => db('shopping_list').truncate())

	after(() => db.destroy())

	afterEach(() => db('shopping_list').truncate())

	context('Given shopping_list has data', () => {
		beforeEach(() => {
			return db
				.into('shopping_list')
				.insert(testItems)
		});
	
		it('getAllItems() resolves all items from shopping_list table', () => {
			return ShoppingService.getAllItems(db)
				.then(actual => {
					expect(actual).to.eql(testItems)
				})
		});

		it(`getById() resolves an item by id from 'shopping_list' table`, () => {
		    const itemId = 3
		    const thirdTestItem = testItems[itemId - 1]
		    return ShoppingService.getById(db, itemId)
		      .then(actual => {
		        expect(actual).to.eql({
		        	id: itemId,
		        	name: thirdTestItem.name,
			        price: thirdTestItem.price,
					date_added: thirdTestItem.dat_added,
					category: thirdTestItem.category,
					checked: false
		        })
		    })
		})
	})

	it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
		const itemId = 3
		return ShoppingService.deleteItem(db, itemId)
			.then(() => ShoppingService.getAllItems(db))
			.then(allItems => {
		        const expected = testItems.filter(item => item.id !== itemId)
		        expect(allItems).to.eql(expected)
		    })
	})

	it('updateItem() updates an item from the shopping_list table', () => {
		const updateId = 3;
		const newItemData = {
			name: 'Updated Item',
			price: 23.00,
			date_added: new Date()
		};
		const original = testItems[updateId - 1];
		return ShoppingService.updateItem(db, updateId, newItemData)
			.then(() => ShoppingListService.getById(db, idOfItemToUpdate))
			.then(item => {
				expect(item).to.eql({
					id: updateId,
					...original,
					...newItemData
				})
			});
	})

	context('Given shopping_list has no data', () => {
		it('getAllItems() resolves an empty array', () => {
			return ShoppingService.getAllItems(db)
				.then(actual => {
					expect(actual).to.eql([])
				})
		});

		it('insertItem() inserts an item and resolves the new item with an id', () => {
			const newItem = {
				name: 'Test New Name',
				prie: 12.50,
				date_added: new Date('2020-01-01T00:00:00.000Z'),
				category: 'Main'
			}
			return ArticlesService.insertItem(db, newArticle)
				.then(actual => {
					expect(actual).to.eql({
						id: 1,
						name: newItem.name,
						price: newItem.price,
						date_added: newItem.date_added,
						checked: newItem.checked,
						category: newItem.category
					})
				})
		});
	})
})
