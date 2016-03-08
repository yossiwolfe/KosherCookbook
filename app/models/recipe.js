// app/models/recipe.js
// // grab the mongoose module
var mongoose = require('mongoose');
var db = require('../../config/db');
mongoose.connect(db.url);
//
// // define our recipe model
// // module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Recipe', {
	name: {type : String, default: ''},
	author: {type : String, default: ''},
	comments: [{ body: String, date: Date }],
	ingredients: [
		{quantity: Number, quantityType: String, name: String, prepMethod: String, note: String, optional: Boolean}
	],
	instructions: [
		{text: String}
	],
	prepTimeMinutes: Number,
	cookTimeMinutes: Number,
	authorRating: Number,
	notes: String,
	categories: [{name: String}],
	tags: [{tag: String}],
	meals: [{mealName: String}],
	kosherStatus: String,
	pictureUrl: String,
	userRating: [
		{name: String, rating: Number, comments: String}
	]
});
