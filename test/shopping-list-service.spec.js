const ShoppingService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping Service object', function() {
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

	this.afterEach(() => db('shopping_list').truncate())

	describe('getAllItems()', () => {
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
		    const thirdId = 3
		    const thirdTestItem = testItems[thirdId - 1]
		    return ShoppingService.getById(db, thirdId)
		      .then(actual => {
		        expect(actual).to.eql({
		        	id: thirdId,
		        	name: thirdTestItem.title,
			        price: thirdTestItem.content,
					date_added: thirdTestItem.added,
					category: thirdTestItem.category,
					checked: thirdTestItem.checked
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


	context('Given shopping_list has no data', () => {
		it('getAllItems() resolves an empty array', () => {
			return ShoppingService.getAllItems(db)
				.then(actual => {
					expect(actual).to.eql([])
				})
		});

		it('insertItem() inserts a new item and resolves the new item with an id', () => {
			const newItem = {
				name: 'Test new name',
				content: 'Test new content',
				date_published: new Date('2020-01-01T00:00:00.000Z')
			}
			return ArticlesService.insertArticle(db, newArticle)
				.then(actual => {
					expect(actual).to.eql({
						id: 1,
						title: newArticle.title,
						content: newArticle.content,
						date_published: newArticle.date_published
					})
				})
		});
	})
	})
})