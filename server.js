var express= require('express'),
	app= express(),
	cors= require('cors'),
	bodyParser= require('body-parser'),
	jwt= require('jsonwebtoken'),
	mongoose= require('mongoose'),
	Schema= mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/product', function(error){
	if(error){
		console.log(error);
	}else{
		console.log("success!!!");
	}
});

// app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cors({
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
})); 

// app.get('/', function(req, res){
// 	res.sendFile(__dirname+'/dist/index.html')
// });

var Products= mongoose.model('Products', {
	productId: {
		type: Number,
		required: [true, 'ProductId required!!!']
	},
	productName: {
		type: String,
		required: [true, 'Product Name required!!!']
	},
	productCode: {
		type: String,
		required: [true, 'Product Code required!!!']
	},
	releaseDate: {
		type: String,
		required: [true, 'Date required!!!']
	},
	description: {
		type: String,
		required: [true, 'Product Description required!!!']
	},
	price: {
		type: Number,
		required: [true, 'Product Price required!!!']
	},
	starRating: {
		type: Number,
		required: [true, 'Product Rating is required!!']
	}
});

//deleting products
app.get('/delete/:id', function( req, res, next) {
    console.log(req.params.id);
    Products.find({ _id: req.params.id}, function(err) {
      if(err) {
        req.status(504);
        req.end();
        console.log(err);
      }
    }).remove(function (err) {
      console.log(err);
      if (err) {
        res.end(err);            
      } else {
        res.end();
      }
    });
   });

 
app.post('/savedata', (req,res)=>{
	console.log(req.body);
	var newProduct= new Products(req.body);

	newProduct.save().then((docs)=>{
		res.json({
			success: true,
			msg: 'Posted Successfully!!!'
		})
	}).catch((err)=>{
			res.json({
				success: false,
				msg: 'failed to post!!'
			});
	});
});


app.post('/authenticate', function(req,res){
	if(req.body.email && req.body.password){
		var token= jwt.sign({
			email: req.body.email
		},
		'marlabs-secret-key',
		{expiresIn: '1h'}
		);
		res.send({
			isLoggedIn: true,
			msg: 'Logged in Successfully',
			token: token
		});
	}
	else{
		res.send({
			isLoggedIn: false,
			msg: 'Log In fail!!!'
		});
	}
});

app.use(function(req, res, next){
	var token= req.body.token || req.query.token || req.headers.token;
	if(token){
		jwt.verify(token, 'marlabs-secret-key', function(err, decoded){
			if(!err){
				req.decoded = decoded;
				console.log(decoded);
				next();
			}else{
				res.send({
					msg: 'Invalid Request',
					isLoggedIn: false
				});
			}
		});
	}else{
		res.send({
			msg:'Invalid request',
			isLoggedIn: false
		});
	}
});

app.get('/getproducts', (req, res)=>{
	console.log('User Info');
	console.log(req.decoded);
	Products.find({}, (err, docs)=>{		
		if(!err){
			console.log(docs);
			res.json(docs);
		} else{
			console.log(err);
		}
	})
	// res.send([

	// 	{
	// 		'productId': 1,
	// 		'productName': 'Leaf Rake',
	// 		'productCode': 'GDN-0011',
	// 		'releaseDate': 'March 19, 2016',
	// 		'description': 'Leaf rake with 48-inch wooden handle.',
	// 		'price': 19.95,
	// 		'starRating': 3.2,
	// 		'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
	// 	},
	// 	{
	// 		'productId': 2,
	// 		'productName': 'Garden Cart',
	// 		'productCode': 'GDN-0023',
	// 		'releaseDate': 'March 18, 2016',
	// 		'description': '15 gallon capacity rolling garden cart',
	// 		'price': 32.99,
	// 		'starRating': 4.2,
	// 		'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
	// 	}          
	// ]);
});
 

app.listen(3000, function(){
	console.log('Server running @localhost:3000');
});