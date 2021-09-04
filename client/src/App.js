import React,{ useState, useEffect} from 'react'
import axios from 'axios'
const api_base = 'http://localhost:3001';

function App() {
  const [items, setitems] = useState([]);

  useEffect(() => {
    console.log('hello')
    axios.get(api_base +'/api/todos')
    .then((res)=>{
      setitems(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [items])


  //add todo
  const submit = e => {
    let title = e.target[0].value
    let data = {
      title
    };
    console.log(data);
    addTodo(data);
  }

  const addTodo = data  => {
		axios
    .post(api_base + "/api/todo/new", data)
    .then(res => {
      console.log(res)
    })
    .catch(err => alert(err))
		
	}

  const deleteTodo = async id => {
		const data = await fetch(api_base + '/api/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setitems(items => items.filter(todo => todo._id !== data.result._id));
	}



  return (
    <>
      <div className="container">
        <div className="today">
          Your Todos List
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3">
            <div className="add-control">
              <form onSubmit={e=> {e.preventDefault();submit(e)}}>
              <div className="form-group has-feedback">
                <input type="text" className="form-control" name="title" placeholder="✍️ Add item..." />
              </div>
              <button type="submit" className="button my-2"><i className="fa fa-plus form-control-feedback add-btn" title="Add item" />Create task</button>
              </form>
            </div>
            <p className="err text-danger text-center hidden"><i className="fa fa-warning" /> Oops! Please, enter name item</p>
            <p className="no-items text-muted text-center hidden"><i className="fa fa-ban" /></p>
            <ul className="todo-list">
            {items.map(item => (
              <li key={item.id}>{item.title}
              <button onClick={() => deleteTodo(item._id)}>Delete item</button>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
