import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";

/**
 * Props:
 * - "task": object containing "id" and "title"
 * - "index": int is required by react-dnd
 */
export default function Task({ task, index }) {
	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<Card
					variant="outlined"
					className="task-container"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isDragging={snapshot.isDragging}
				>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							#{task.id}
						</Typography>
						<Typography variant="body" component="div">
							{task.title}
						</Typography>
					</CardContent>
					{provided.placeholder}
				</Card>
			)}
		</Draggable>
	);
}
