import mongoose , {Schema} from "mongoose";
const postSchema = new Schema({
    title:String,
    desc:String,
},{
    timestamps:true,
})

const Posts = mongoose.models.Posts ||mongoose.model("Posts",postSchema)

export default Posts;