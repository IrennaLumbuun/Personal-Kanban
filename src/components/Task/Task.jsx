import React from "react";
import { Draggable } from "react-beautiful-dnd";

/**
 * Props:
 * - "task": object containing "id" and "title"
 * - "index": int is required by react-dnd
 */
export default function Task({ task, index }) {
	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<div
					className="task-container"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isDragging={snapshot.isDragging}
				>
					<div className="task-id">
						<span>
							<small> #{task.id}</small>
						</span>
					</div>
					<div
						style={{ display: "flex", justifyContent: "center", padding: 2 }}
					>
						<p>{task.title}</p>
					</div>
					{provided.placeholder}
				</div>
			)}
		</Draggable>
	);
}
