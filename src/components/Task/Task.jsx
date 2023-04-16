import {
	Card,
	CardContent,
	CardHeader,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";

/**
 * Props:
 * - task: object containing "id" and "title"
 * - index: int is required by react-dnd
 * - columnId: The columnId where the task resides
 * - setTasks: A function owned by "Board" that can modify the title of a task
 * - tasks: All tasks in a board
 */
export default function Task({ task, index, columnId, setTasks, tasks }) {
	const [inEditMode, setInEditMode] = useState(false);
	const [taskTitle, setTaskTitle] = useState(task.title);

	const deleteTask = (e) => {
		e.preventDefault();
		let modifieableTasks = { ...tasks };
		modifieableTasks[columnId] = modifieableTasks[columnId].filter(
			(item) => item.id !== task.id
		);
		setTasks(modifieableTasks);
	};
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
					<CardHeader
						subheader={
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								#{task.id}
							</Typography>
						}
						action={
							<div>
								<IconButton onClick={() => setInEditMode(!inEditMode)}>
									{inEditMode ? <CheckIcon /> : <EditIcon />}
								</IconButton>
								<IconButton onClick={deleteTask}>
									<DeleteOutlineOutlinedIcon />
								</IconButton>
							</div>
						}
					/>
					<CardContent>
						{inEditMode ? (
							<TextField
								multiline
								variant="standard"
								value={taskTitle}
								onChange={(e) => setTaskTitle(e.target.value)}
							/>
						) : (
							<Typography variant="body" component="div" className="task-title">
								{taskTitle}
							</Typography>
						)}
					</CardContent>
					{provided.placeholder}
				</Card>
			)}
		</Draggable>
	);
}
