import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Category', categorySchema);
