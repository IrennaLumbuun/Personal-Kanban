import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./Column.css";

/**
 * Each column component takes in:
 * - The title of the column
 * - A list of tasks that resides in the column
 * - The id of the column
 */
export default function Column({ title, tasks, id }) {
	return (
		<div className="column">
			<h1 className="column-title"> {title}</h1>
			<Droppable droppableId={id}>
				{
					/* {
					/** Here, snapshot provides the state of a task during the time it's being dragged.
					 * This information can be used so we can update the component's appearance as it's being dragged. */
					(provided, snapshot) => (
						<div
							className="column-task-list"
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{/* {tasks.map((task, index) => (
								<Task key={index} index={index} task={task} />
							))} */}
							<Task
								key="1"
								index={1}
								task={{ title: "hello world", id: "1" }}
							/>
							{provided.placeholder}
						</div>
					)
				}
			</Droppable>
		</div>
	);
}
