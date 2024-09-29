import React from 'react'
import { Helmet } from 'react-helmet'
import './Index.scss'
import Icon from '@mdi/react';
import { mdiCloseCircleOutline } from '@mdi/js';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, postTodo, updateTodo } from '../../../redux/slices/todoSlice';
import toast from 'react-hot-toast';
const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { userToken } = useSelector(state => state.users)
  const { todo } = useSelector(state => state.todo)
  const formik = useFormik({
    initialValues: {
      addedTodo: '',
      todoContent: '',
      isCompleted: false,
      todoPosterId: ''
    },

    onSubmit: async (values) => {
      if (!values.todoContent.trim()) {
        toast.error('Todo content cannot be empty');
        return;
      }
      const username = `${userToken?.firstName} ${userToken?.lastName}`
      const newTodo = {
        addedTodo: username,
        todoContent: values.todoContent,
        isCompleted: values.isCompleted,
        todoPosterId: userToken?.id
      }
      await dispatch(postTodo(newTodo))
      toast.success('Todo added successfully');

      formik.resetForm()
    },
  });
  const handleTodoChange = async (todoId, isCompleted) => {

    await dispatch(updateTodo({ id: todoId, newData: { isCompleted: !isCompleted } }));
    toast.success('Todo updated successfully');
  };
  return (
    <div className={'adminDashboard'}>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="adminDashboardBox">
        <div className="row">
          <div className="col-lg-12">
            <div className="todoCard card">
              <div className="card-body">
                <h4 className='todoTitle'>
                  Todo list
                </h4>
                <form onSubmit={formik.handleSubmit} className="addBoxInAdminDash">
                  <input name='todoContent' value={formik.values.todoContent} onChange={formik.handleChange} type="text" className="form-control " placeholder="What do you need to do today?" />
                  <button type='submit' className='btn btn-primary font-weight-bold'>Add</button>
                </form>
                <div className="todoList">
                  <ul className='d-flex flex-column-reverse todoReversedList'>
                    {
                      todo.length == 0 ? <p className="text-center text-danger">Oops! There are no tasks to do at the moment.</p>
                        : todo?.map((item, index) => {
                          return <li key={index} className={`${item.isCompleted == true ? ' completeTodo' : ''}`}>
                            <div className="listFormInDashboard">
                              <label htmlFor="checkInput">
                                <input checked={item.isCompleted}
                                  onChange={() => handleTodoChange(item._id, item.isCompleted)}
                                  className='adminDashboardChecked' type="checkbox" />
                                {item.todoContent}
                                <i className="helpering">

                                </i>
                              </label>
                            </div>
                            <div className="checkedDashboardIn " onClick={() => {
                              dispatch(deleteTodo(item._id))
                              toast.success('Todo deleted successfully')
                            }}>
                              <Icon path={mdiCloseCircleOutline} size={0.8} />

                            </div>
                          </li>
                        })
                    }

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AdminDashboard
