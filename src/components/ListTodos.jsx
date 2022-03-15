import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../features/todosSlice";
import moment from "moment";
import { Card } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import "../App.css";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;
  const { Meta } = Card;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id)).then(() => {
      console.log("kfj");
      dispatch(getTodos());
    }

    );
  };

  return (
    <div>
      <h2> You have {todos && todos.length} tasks </h2>
      {/* {todosState.getTodosStatus === "pending" ? <CircularProgress /> : null} */}
      {todos.map((todo) => (

        <Card
          style={{ width: 400, marginTop: '10px' }}

          actions={
            [
              <EditOutlined onClick={() => setTodo({ ...todo })} key="edit" />,
              <DeleteFilled onClick={() => handleDelete(todo.id)} key="delete" />
            ]}
        >
          <Meta
            title={todo.task}
            description={'Added:' + moment.utc(todo.created_At, 'YYYY-M-DD HH:mm').local().fromNow()}
          />
        </Card>
      ))}
    </div>
  );
};

export default ListTodos;
