import {
	Card,
	CardContent,
	CardHeader,
	Container,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import AddIcon from "@mui/icons-material/Add";
import "./Column.css";
import { v4 as uuidv4 } from "uuid";

/**
 * Each column component takes in:
 * - title: The title of the column
 * - columnId: The columnId of the column
 * - setTasks: A function owned by "Board" that can modify the list of all tasks
 * - tasks: a list of all tasks
 */
export default function Column({ title, columnId, setTasks, tasks }) {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const addTask = (e) => {
		e.preventDefault();
		let modifieableTasks = { ...tasks };
		modifieableTasks[columnId].push({ id: uuidv4(), title: newTaskTitle });
		setTasks(modifieableTasks);
		setNewTaskTitle("");
	};
	return (
		<Container className="column" spacing={1}>
			<Typography variant="h5" component="div" className="column-title">
				{title}
			</Typography>
			<Droppable droppableId={columnId}>
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
							{tasks[columnId].map((task, index) => (
								<Task
									key={index}
									index={index}
									task={task}
									columnId={columnId}
									setTasks={setTasks}
									tasks={tasks}
								/>
							))}
							{/** A non-removable, non-draggable, edit-only card. This lets user add a new task. */}
							{columnId === "todo" && (
								<Card variant="outlined" className="task-container">
									<CardHeader
										action={
											<div>
												<IconButton onClick={addTask}>
													<AddIcon />
												</IconButton>
											</div>
										}
									/>
									<CardContent>
										<TextField
											multiline
											variant="standard"
											placeholder="Add a new task"
											value={newTaskTitle}
											onChange={(e) => setNewTaskTitle(e.target.value)}
										/>
									</CardContent>
								</Card>
							)}
							{provided.placeholder}
						</div>
					)
				}
			</Droppable>
		</Container>
	);
}
