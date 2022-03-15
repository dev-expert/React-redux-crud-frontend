import { useDispatch, useSelector } from "react-redux";
import { todosAdd, getTodos } from "../features/todosSlice";
import { Alert,Button, CircularProgress } from "@mui/material";
// import { Button } from 'antd';

import "../App.css";

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo.id) {
      dispatch(todosAdd(todo)).then(() => {
        dispatch(getTodos());
      });
    } else {
      const newTodo = {
        ...todo,
        created_at: new Date(),
      };

      dispatch(todosAdd(newTodo)).then(() => {
        dispatch(getTodos());
      });
    }

    setTodo({
      task: "",
      isComplete: 0,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          {todosState.addTodoStatus === "pending" ||
            todosState.updateTodoStatus === "pending" ? (
            <CircularProgress size={24} color="secondary" />
          ) : todo.id ? (
            "Update Task"
          ) : (
            "Add Task"
          )}
        </Button>
        {todosState.addTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.addTodoError}</Alert>
        ) : null}
        {todosState.addTodoStatus === "success" ? (
          <Alert severity="success">Task Added...</Alert>
        ) : null}
        {todosState.updateTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.updateTodoError}</Alert>
        ) : null}
        {todosState.updateTodoStatus === "success" ? (
          <Alert severity="success">Task Updated...</Alert>
        ) : null}
        {todosState.deleteTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.deleteTodoError}</Alert>
        ) : null}
        {todosState.deleteTodoStatus === "success" ? (
          <Alert severity="warning">A todo was deleted...</Alert>
        ) : null}
      </form>
    </>
  );
};

export default AddTodo;
