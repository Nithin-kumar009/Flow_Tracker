const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title:       { type:String, required:[true,"Title is required"], trim:true, maxlength:[200,"Max 200 chars"] },
    desc:        { type:String, trim:true, default:"", maxlength:[1000,"Max 1000 chars"] },
    priority:    { type:String, enum:["low","medium","high","urgent"],   default:"medium"  },
    category:    { type:String, enum:["work","personal","health","learning","other"], default:"work" },
    status:      { type:String, enum:["pending","in-progress","completed"], default:"pending" },
    deadline:    { type:String, default:null },
    completedAt: { type:Date,   default:null },
  },
  { timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true} }
);

taskSchema.index({ status:1 });
taskSchema.index({ priority:1 });
taskSchema.index({ category:1 });
taskSchema.index({ createdAt:-1 });

// Auto-set completedAt when status flips to "completed"
taskSchema.pre("save", function(next) {
  if (this.isModified("status")) {
    if (this.status==="completed" && !this.completedAt) this.completedAt = new Date();
    else if (this.status!=="completed")                 this.completedAt = null;
  }
  next();
});

taskSchema.virtual("isOverdue").get(function() {
  if (this.status==="completed"||!this.deadline) return false;
  return new Date(this.deadline) < new Date();
});

module.exports = mongoose.model("Task", taskSchema);