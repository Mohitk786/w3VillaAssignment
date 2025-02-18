const express = require('express');
const app = express();
const routes = require("./routes/routes")

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./config/database");


dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();



app.use(express.json());
app.use(cors({
    origin: process.env.DOMAIN, 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}));
app.use(cookieParser());




// app.use((req, res, next) => {

// 	// Allow requests from your specific domain
// 	res.header('Access-Control-Allow-Origin', process.env.DOMAIN);
  
// 	// Allow credentials (cookies, authorization headers, etc.)
// 	res.header('Access-Control-Allow-Credentials', true);
  
// 	// Specify allowed methods and headers
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
// 	next();
//   });



app.use('', routes);


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}` );
});
