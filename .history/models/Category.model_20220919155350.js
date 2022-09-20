const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
	{
		name: {
			type: String,
		},
		subCategory: [
			{
				type: String,
			},
		],
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

const Category = model('Category', categorySchema)

module.exports = Category
