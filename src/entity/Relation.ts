import { model, Schema } from 'mongoose';

const RelationSchema: Schema = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: {
        type: String,
        default: 'PENDING',
        enum: {
            values: ['PENDING', 'RESOLVE', 'REJECT'],
            message: '{VALUE} is not allowed'
        }
    }
}, {
    timestamps: true
});

RelationSchema.index({
    owner: 1,
    user: 1
}, {
    unique: true
})

export const Relation = model('Relation', RelationSchema);