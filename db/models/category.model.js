const categorySchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "category name is required"],
        min: [2, " category name minimum length 2 char"],
        max: [20, " category name max length 2 char"],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Category = model("Category", categorySchema);