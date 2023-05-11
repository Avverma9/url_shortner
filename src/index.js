const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const route = require('./routes/route');
const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware
app.use('/', route);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Avverma:Avverma95766@avverma.2g4orpk.mongodb.net/urlShrink', {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB is Connected NOW'))
  .catch((err) => console.log(err));

app.listen(3001, () => {
  console.log('Server is ready to boom on port', 3001);
});
