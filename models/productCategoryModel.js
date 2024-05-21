import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    }
}, { timestamps: true });

//Export the model
export default mongoose.model('ProductCategory', productCategorySchema);