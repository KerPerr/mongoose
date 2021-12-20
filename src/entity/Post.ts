import { model, Schema } from 'mongoose';

const PostSchema: Schema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    visibility : {
        type: String,
        default: 'PUBLIC',
        enum: {
            values: ['PUBLIC', 'SHARED', 'PRIVATE'],
            message: '{VALUE} is not allowed'
        }
    }
}, {
    timestamps: true
});

export const Post = model('Post', PostSchema);