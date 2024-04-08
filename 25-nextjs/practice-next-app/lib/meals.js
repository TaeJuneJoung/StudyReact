import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 학습을 위한 지연
  return db.prepare("SELECT * FROM meals").all();
}
