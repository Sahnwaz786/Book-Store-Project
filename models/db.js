const mongoose = require("mongoose")
mongoose
.connect("mongodb+srv://mdsahnwazalam48:BKppJS4PFDcs2uxv@cluster0.5l4szey.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("db connected!"))
.catch(()=> console.log("err.message"));
