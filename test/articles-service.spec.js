// const ArticlesService = require('../src/articles-service')
// const knex = require('knex')

// describe('Articles service object', function() {
// 	let db;
// 	let testArticles = [
// 		{
// 			id: 1,
// 			date_published: new Date('2029-01-22T16:28:32.615Z'),
// 			title: 'First test post!',
// 			content: 'Lorem ipsum dolor'
// 		},
// 		{
// 			id: 2,
// 			date_published: new Date('2100-05-22T16:28:32.615Z'),
// 			title: 'Second test post!',
// 			content: 'Dolor sit amet'
// 		},
// 		{
// 			id: 3,
// 			date_published: new Date('1919-12-22T16:28:32.615Z'),
// 			title: 'Third test post!',
// 			content: 'Lorem consectetur'
// 		}
// 	];

// 	before(() => {
// 		db = knex({
// 			client: 'pg',
// 			connection: process.env.TEST_DB_URL
// 		})
// 	})

// 	after(() => db.destroy())

// 	before(() => db('blogful_articles').truncate())

// 	this.afterEach(() => db('blogful_articles').truncate())

// 	describe('getAllArticles()', () => {
// 	context('Given blogful_articles has data', () => {
// 		beforeEach(() => {
// 			return db
// 				.into('blogful_articles')
// 				.insert(testArticles)
// 		});
	
// 		it('getAllArticles() resolves all articles from blogful_articles table', () => {
// 			return ArticlesService.getAllArticles(db)
// 				.then(actual => {
// 					expect(actual).to.eql(testArticles)
// 				})
// 		});

// 		it(`getById() resolves an article by id from 'blogful_articles' table`, () => {
// 		    const thirdId = 3
// 		    const thirdTestArticle = testArticles[thirdId - 1]
// 		    return ArticlesService.getById(db, thirdId)
// 		      .then(actual => {
// 		        expect(actual).to.eql({
// 		          id: thirdId,
// 		          title: thirdTestArticle.title,
// 			         content: thirdTestArticle.content,
// 			         date_published: thirdTestArticle.date_published,
// 		        })
// 		    })
// 		})
// 	})

// 	it(`deleteArticle() removes an article by id from 'blogful_articles' table`, () => {
// 		const articleId = 3
// 		return ArticlesService.deleteArticle(db, articleId)
// 			.then(() => ArticlesService.getAllArticles(db))
// 			.then(allArticles => {
// 		        const expected = testArticles.filter(article => article.id !== articleId)
// 		        expect(allArticles).to.eql(expected)
// 		    })
// 	})


// 	context('Given blogful_articles has no data', () => {
// 		it('getAllArticles() resolves an empty array', () => {
// 			return ArticlesService.getAllArticles(db)
// 				.then(actual => {
// 					expect(actual).to.eql([])
// 				})
// 		});

// 		it('insertArticle() inserts a new article and resolves the new article with an id', () => {
// 			const newArticle = {
// 				title: 'Test new title',
// 				content: 'Test new content',
// 				date_published: new Date('2020-01-01T00:00:00.000Z')
// 			}
// 			return ArticlesService.insertArticle(db, newArticle)
// 				.then(actual => {
// 					expect(actual).to.eql({
// 						id: 1,
// 						title: newArticle.title,
// 						content: newArticle.content,
// 						date_published: newArticle.date_published
// 					})
// 				})
// 		});
// 	})
// 	})
// })