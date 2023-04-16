import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";

export default function Board() {
	const [tasks, setTasks] = useState({
		1: [
			{ id: "task1", title: "task with id 1" },
			{ id: "task3", title: "task with id 3" },
		],
		2: [{ id: "task2", title: "task with id 2" }],
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
			<h1> Board title </h1>
			<div>
				<Column title={"To Do"} tasks={tasks["1"]} id={"1"} />
				<Column title={"Done"} tasks={tasks["2"]} id={"2"} />
			</div>
		</DragDropContext>
	);
}
