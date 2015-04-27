
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var _ = require('lodash');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pmapp');

var projectSchema = mongoose.Schema({
	name: String,
    description: String,
	creationDate: Date,
	startDate: Date,
	endDate: Date,
	positions: Array
});

var userSchema = mongoose.Schema({
    name: String,
    img: String,
    specialization: String,
    level: String,
    role: String,
    skills: Array,
	creationDate: Date,
	positions: Array
});

var Project = mongoose.model('Project', projectSchema);
var User = mongoose.model('User', userSchema);

var app = express();

// all environments
app.set('host', '127.0.0.1');
app.set('port', process.env.PORT || 3333);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/projects/:id?', function(req, res){

	var criteria = req.route.params.id ? {_id: req.route.params.id} : null;

	if(criteria){
		Project.find(criteria, function(err, p){
			if(!err){
				res.status(200).json(p);
			} else {
				res.status(404).send('There are some errors, projects aren\'t retrieved!');
			}
		});
	} else {
		Project.find(function(err, p){
			if(!err){
				res.status(200).json(p);
			} else {
				res.status(404).send('There are some errors, projects aren\'t retrieved!');
			}
		});
	}


});

app.post('/projects', function(req, res){

    Project.create(req.body.project, function(err, proj){
        if(!err){
            res.status(201).json(proj);
        } else {
            res.status(404).send('There are some errors, project wasn\'t saved!');
        }
    });

});

app.put('/projects', function(req, res){

	if(req.body.project){

		var id = req.body.project._id;
		delete req.body.project._id;

		Project.update({_id: id}, req.body.project, function(err, proj){
			if(!err){
				res.status(201).json(proj);
			} else {
				res.status(404).send('There are some errors, project wasn\'t saved!');
			}
		});
	} else if(req.body.position) {

		var position = req.body.position;

		Project.update({_id: position.projID, positions: {$elemMatch: { id: position.posID}}}, {'positions.$.employeeID': null, 'positions.$.employee': null}, function(err, proj){
			if(!err){
				res.status(201).json(proj);
			} else {
				res.status(404).send('There are some errors, project wasn\'t saved!');
			}
		});
	} else if(req.body.projID && req.body.posID && req.body.emplID) {
		Project.update({_id: req.body.projID, positions: {$elemMatch: { id: req.body.posID}}}, {'positions.$.employeeID': req.body.emplID}, function(err, proj){
			if(!err){
				res.status(201).json(proj);
			} else {
				res.status(404).send('There are some errors, project wasn\'t saved!');
			}
		});
	} else {
		res.status(404).send('There are some errors, project wasn\'t saved!');
	}

});

app.delete('/projects/:id?', function(req, res){

    Project.findByIdAndRemove(req.route.params.id, function(err){
        if(!err){
            res.status(200).send(req.route.params.id);
        } else {
            res.status(404).send('There are some errors, projects can\'t be found!');
        }
    });

});

app.put('/position/', function(req, res){

	if(req.body.projID && req.body.posID){
		Project.update({_id: req.body.projID, positions: {$elemMatch: { id: req.body.posID}}}, {'positions.$.employeeID': null, 'positions.$.employee': null}, function(err, proj){
			if(!err){
				res.status(201).json(proj);
			} else {
				res.status(404).send('There are some errors, project wasn\'t saved!');
			}
		});
	} else {
		res.status(404).send('There are some errors, projects can\'t be found!');
	}

});


app.get('/users/:id?', function(req, res){
	var criteria = req.route.params.id  ? {_id: req.route.params.id} : null;

	if(criteria){
		User.find(criteria, function(err, p){
			if(!err){
				res.status(200).json(p);
			} else {
				res.status(404).send('There are some errors, users aren\'t retrieved!');
			}
		});
	} else {
		User.find(function(err, p){
			if(!err){
				res.status(200).json(p);
			} else {
				res.status(404).send('There are some errors, users aren\'t retrieved!');
			}
		});
	}

});

app.post('/users', function(req, res){

    User.create(req.body.user, function(err, usr){
        if(!err){
            res.status(201).json(usr);
        } else {
            res.status(404).send('There are some errors, user wasn\'t saved!');
        }
    });

});

app.put('/users', function(req, res){
	var id = req.body.user._id;
	delete req.body.user._id;

	User.update({_id: id}, req.body.user, function(err, user){
		if(!err){
			res.status(201).json(user);
		} else {
			res.status(404).send('There are some errors, use wasn\'t saved!');
		}
	});
});

app.delete('/users/:id?', function(req, res){

	User.findByIdAndRemove(req.route.params.id, function(err){
		if(!err){
			res.status(200).send(req.route.params.id);
		} else {
			res.status(404).send('There are some errors, user can\'t be found!');
		}
	});

});

//http.createServer(app).listen(app.get('port'), function(){
//
//});

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
});
