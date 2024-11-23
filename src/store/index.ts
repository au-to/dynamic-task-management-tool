import { createPinia } from "pinia";
import { useTaskStore } from "./task.ts";
import { useUserStore } from "./user.ts";

const pinia = createPinia();

export default pinia;