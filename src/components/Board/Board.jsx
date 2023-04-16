import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column/Column";

export default function Board() {
	// TODO: this should be a dicitonary instead.
	// Where key = the id of the board.
	const [todo, setTodo] = useState([]);
	const [done, setDone] = useState([]);

	const handleDragEnd = ({ destination, source, draggableId }) => {
		if (!source || !destination) return;
		// An edge case where use attempts to drag a task to a different column
		// but changed their mind and put such task back to its original column
		if (source.droppableId === destination.droppableId) return;

		// remove from source array, append to the destination array
		if (source.droppableId == 2) {
			setDone(removeItemById(draggableId, done));
		} else {
			setTodo(removeItemById(draggableId, todo));
		}

		const task = findItemById(draggableId, [...todo, ...done]);
		if (destination.droppableId == 2) {
			setDone([{ task }, ...done]);
		} else {
			setTodo([{ task }, ...todo]);
		}
	};

	const findItemById = (id, array) => {
		return array.find((item) => item.id === id);
	};

	const removeItemById = (id, array) => {
		return array.filter((item) => item.id !== id);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h1> Board title </h1>
			<div>
				<Column title={"To Do"} tasks={todo} id={"1"} />
				<Column title={"Done"} tasks={done} id={"2"} />
			</div>
		</DragDropContext>
	);
}
