const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
	name: {
		type: String,
	},
	subCategory: [{
			type: String,
	}],
	// size: [
	// 	{
	// 		type: String,
	// 		default: ['xs', 's', 'm', 'l','xl']
	// 	}
	// ],
	photos: [
		{
			url: {
				type: String, 
					
			},
			color: {
				type: String, 
			}
		}
	]
}, { timestamps: true })

const category = model("category", categorySchema);

module.exports = category
 