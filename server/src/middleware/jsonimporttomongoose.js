import data from "./middleware/data.json" assert { type: "json" };
import User from "./models/User.model.js";
const importData = async () => {
  try {
    await User.create(data);
    console.log("Data seeded successfully....");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
//delete Data in DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
