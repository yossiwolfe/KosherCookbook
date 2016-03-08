 // app/routes.js

// grab the recipe model we just created
var Recipe = require('./models/recipe');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.get('/api/recipes/:recipeId', function(req, res) {

            Recipe.findById(req.params.recipeId, function(err, recipe) {
                if (err)
                    res.send(err);
                res.json(recipe);
            });

        });

        // sample api route
        app.get('/api/recipes', function(req, res) {
            // use mongoose to get all recipes in the database
//            rec = new Recipe();
            Recipe.find(function(err, recipes) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(recipes); // return all recipes in JSON format
            });
        });

        app.post('/api/recipes/:recipeId', function(req, res) {

            Recipe.findById(req.params.recipeId, function(err, recipe) {
                if (err) throw err;

                recipe.name = req.body.name;
                recipe.author = req.body.author;
                recipe.instructions = req.body.instructions;
                recipe.ingredients = req.body.ingredients;
                recipe.prepTimeMinutes = req.body.prepTimeMinutes;
                recipe.cookTimeMinutes = req.body.cookTimeMinutes;
                recipe.authorRating = req.body.authorRating;
                recipe.notes = req.body.notes;
                recipe.categories = req.body.categories;
                recipe.kosherStatus = req.body.kosherStatus;

                // save the user
                recipe.save(function(err) {
                    if (err)
                        res.send(err);

//                    res.json({ message: 'Recipe updated!' });
                    res.json(recipe.categories);
                });

            });

        });

        app.get('/api/recipes/delete/:recipeId', function(req, res) {

            Recipe.findById(req.params.recipeId, function(err, recipe) {
                if (err) throw err;

                recipe.remove(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Recipe deleted!' });
                });

            });

        });

        app.post('/api/recipes', function(req, res) {
            var recipe = new Recipe();
            if(typeof(req.body._id) !== "undefined"){
                recipe.name = req.body.name;
            }
            recipe.name = req.body.name;
            recipe.author = req.body.author;
            recipe.instructions = req.body.instructions;
            recipe.ingredients = req.body.ingredients;
            recipe.prepTimeMinutes = req.body.prepTimeMinutes;
            recipe.cookTimeMinutes = req.body.cookTimeMinutes;
            recipe.authorRating = req.body.authorRating;
            recipe.notes = req.body.notes;
            recipe.categories = req.body.categories;
            recipe.kosherStatus = req.body.kosherStatus;
//            res.json(req.body);

            recipe.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Recipe created!' });
            });

        });


        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
           // res.json({ message: 'Recipe created!' });
        });

    };
