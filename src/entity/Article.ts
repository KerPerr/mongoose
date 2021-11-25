import { model, Schema } from 'mongoose';

const ArticleSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        /* Custom validator
        validate: {
            validator: (v: string) => {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid american number!`
            // 235-555-8485
        } */
    },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
});

export const Article = model('Article', ArticleSchema);