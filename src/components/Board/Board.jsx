import { Grid } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";
import "./Board.css";

export default function Board() {
	const [tasks, setTasks] = useState({
		todo: [
			{ id: "task1", title: "task with id 1" },
			{ id: "task3", title: "task with id 3" },
		],
		inProgress: [],
		done: [{ id: "task2", title: "task with id 2" }],
	});

	const handleDragEnd = ({ destination, source, draggableId }) => {
		if (!source || !destination) return;
		// An edge case where use attempts to drag a task to a different column
		// but changed their mind and put such task back to its original column
		if (source.droppableId === destination.droppableId) return;

		// Update state of tasks
		let modifieableTasks = { ...tasks };
		modifieableTasks[source.droppableId] = removeItemById(
			source.droppableId,
			draggableId
		);
		const task = findItemById(draggableId);
		modifieableTasks[destination.droppableId].push(task);

		setTasks(modifieableTasks);
	};

	const findItemById = (taskId) => {
		for (const columnId in tasks) {
			let task = tasks[columnId].find((item) => item.id === taskId);
			if (task) return task;
		}
	};

	const removeItemById = (columnId, taskId) => {
		return tasks[columnId].filter((item) => item.id !== taskId);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h1 className="board-title"> Irenna's Weekend Board </h1>
			<Grid
				container
				spacing={{ xs: 2 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
				className="board"
			>
				<Grid item xs={2} sm={4} md={4}>
					<Column
						title={"To Do"}
						columnId={"todo"}
						setTasks={setTasks}
						tasks={tasks}
					/>
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<Column
						title={"In Progress"}
						columnId={"inProgress"}
						setTasks={setTasks}
						tasks={tasks}
					/>
				</Grid>
				<Grid item xs={2} sm={4} md={4}>
					<Column
						title={"Done"}
						columnId={"done"}
						setTasks={setTasks}
						tasks={tasks}
					/>
				</Grid>
			</Grid>
		</DragDropContext>
	);
}
