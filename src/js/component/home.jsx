import React, { useEffect, useState } from "react";


//create your first component

const Home = () => {

	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [user, setUser] = useState();
	const [inputValue, setInputValue] = useState("");

	const createUser = async () => {
		await fetch("https://playground.4geeks.com/todo/users/cris_martin",
			{method: "POST"}
		).then(resp => {
			
			if (resp.ok) {
				alert("se ha creado el usuario correctamente")
				//getUser();
			}
		})
	}

	const getUser = async () => {
		await fetch("https://playground.4geeks.com/todo/users/cris_martin").then(resp => {
			console.log(resp)
			if (!resp.ok) {
				console.log("entramos")
				return createUser();
			}
			return resp.json()
		}).then(user => setUser(user))
	};

	useEffect(() => {
		//getUser();
		createUser();
	}, [])

	const createTask = async (task) => {
		await fetch("https://playground.4geeks.com/todo/todos/cris_martin", {
			method: "POST",
			headers: {
				"Content-type":"application/json"
			},
			body: JSON.stringify({
				"label": task,
				"is_done": false
			})
		}).then(resp => {
			if (resp.ok) {
				return resp.json()
			}
		}).then(respJson => respJson)
	.catch(error => console.log(error))
	}

	const validateTask = (task) => {
		if (!task || !task.trim()) {
			alert("el valor de la tarea no puede estar vacio")
		}
		createTask(task)
		setTask("");
	}

	const deleteTask = async (task) => {
		const id = task.id;
		await fetch("https://playground.4geeks.com/todo//todos/${id}", {
			method: "DELETE"
		}).then(resp => {
			if (resp.ok) {
				const userTaks = user.todos.filter(item.id !== task.id)
				const newUser = {
					...user,
					todos: [...userTaks]
				}
			}
		})

	}

	console.log(user);


	return (
		<div className="container">
			<h1>My Todos</h1>
			<div>
				<input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setTodos(todos.concat([inputValue]));
							createTask(inputValue)
							setInputValue("")
						}
					}}
					placeholder="what do you need for the event?" />


				{todos.map((item, index) => (

					<li key={index} className="lista">
						{item}{' '}
						<i className="fas fa-trash-alt"
							onClick={() =>
								setTodos(todos.filter((t, currentIndex) => index !== currentIndex))}></i>
					</li>))}
			</div>

			<p>
				Tienes {todos.length} tareas pendientes
			</p>
		</div>


	);
};

export default Home;
