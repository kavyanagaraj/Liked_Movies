var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
 content: { type: String, required: true}
}, {timestamps: true });
mongoose.model('Item', ItemSchema);
