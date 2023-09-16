import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
  Engage:{
    Kickoff: Boolean,
    "Scoping call": Boolean,
    "Sow Signed": Boolean,
    "MSA Signed": Boolean,
    "Request GA Creds": Boolean
  },
  Containment: {
     "Disable Compromised User": Boolean,
    "Reset Passwords": Boolean,
    "Revoke Active Sessions": Boolean,
    "Force MFA": Boolean
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
},{ timestamps: Boolean }
);

const Post = models.Post || mongoose.model("Post", postSchema);
export default Post;
