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

const category = model('category', categorySchema)

module.exports = category
