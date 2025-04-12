import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from '../redux/goalsSlice';
import { fetchTasks } from '../redux/tasksSlice';
import { Draggable } from '@fullcalendar/interaction';

function Sidebar() {
    const tasksRef = useRef(null);
    const dispatch = useDispatch();
    const { goals } = useSelector((state) => state.goals);
    const { tasks } = useSelector((state) => state.tasks);
    const [selectedGoal, setSelectedGoal] = useState(null);

    useEffect(() => {
        dispatch(fetchGoals());
    }, [dispatch]);

    useEffect(() => {
        if (tasksRef.current) {
            new Draggable(tasksRef.current, {
                itemSelector: 'div',
                eventData: function(eventEl) {
                    return JSON.parse(eventEl.getAttribute('data-event'));
                },
            });
        }
    }, [tasks]);

    const handleGoalClick = (goal) => {
        setSelectedGoal(goal);
        dispatch(fetchTasks(goal._id));
    };

    return (
        <div className="w-72 p-4 bg-white border-r border-gray-200 shadow-md overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Goals</h2>
            <div className="space-y-2">
                {goals.map((goal) => (
                    <div
                        key={goal._id}
                        onClick={() => handleGoalClick(goal)}
                        className="p-3 bg-gray-100 hover:bg-blue-100 rounded-lg cursor-pointer flex items-center gap-2 transition"
                        style={{ borderLeft: `5px solid ${goal.color}` }}
                    >
                        <span className="font-semibold">{goal.name}</span>
                    </div>
                ))}
            </div>

            {selectedGoal && (
                <>
                    <h3 className="text-xl font-bold mt-6 mb-2">Tasks</h3>
                    <div ref={tasksRef}>
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-grab hover:bg-gray-100 transition"
                                data-event={JSON.stringify({
                                    title: task.name,
                                    color: selectedGoal.color,
                                })}
                            >
                                {task.name}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;
