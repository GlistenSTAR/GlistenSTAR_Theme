import Api from "./Api";
import { TodoModel } from "../types/todo_types";

const TodoService = {
    async getAllTodos() {
        var response = await Api().get("todos");
        return response.data;
    },
    async getParticularTodo(todo_id: number) {
        var response = await Api().get("todos");
        return response.data.filter(
            (todo: TodoModel) => todo.id === todo_id
        )[0];
    },
};

export default TodoService;
