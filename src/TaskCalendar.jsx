import { useState, useEffect } from "react";
import { Calendar, CheckSquare, Square, Plus, BarChart3 } from "lucide-react";
import { Button } from "react-bootstrap";
import "./TaskCalendar.css"; // Import the CSS file

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [obligatoryTasks, setObligatoryTasks] = useState({});
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Obligatory task definitions
  const obligatoryTaskTypes = [
    { key: "ART", variant: "primary", label: "ART" },
    { key: "FUN", variant: "primary", label: "FUN" },
    { key: "SIN", variant: "primary", label: "SIN" },
    { key: "DOM", variant: "primary", label: "DOM" },
    { key: "ORK", variant: "primary", label: "ORK" },
    { key: "WIZ", variant: "primary", label: "WIZ" },
  ];

  const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getTasksForDate = (date) => {
    const dateKey = formatDateKey(date);
    return tasks[dateKey] || [];
  };

  const getObligatoryTasksForDate = (date) => {
    const dateKey = formatDateKey(date);
    return obligatoryTasks[dateKey] || {};
  };

  const getCompletionPercentage = (date) => {
    const dateTasks = getTasksForDate(date);
    const dateObligatoryTasks = getObligatoryTasksForDate(date);

    const totalTasks = dateTasks.length + obligatoryTaskTypes.length;
    if (totalTasks === 0) return 0;

    const completedRegularTasks = dateTasks.filter(
      (task) => task.completed
    ).length;
    const completedObligatoryTasks =
      Object.values(dateObligatoryTasks).filter(Boolean).length;

    return Math.round(
      ((completedRegularTasks + completedObligatoryTasks) / totalTasks) * 100
    );
  };

  const getCompletedCount = (date) => {
    const dateTasks = getTasksForDate(date);
    const dateObligatoryTasks = getObligatoryTasksForDate(date);

    const completedRegularTasks = dateTasks.filter(
      (task) => task.completed
    ).length;
    const completedObligatoryTasks =
      Object.values(dateObligatoryTasks).filter(Boolean).length;

    return completedRegularTasks + completedObligatoryTasks;
  };

  const getTotalCount = (date) => {
    const dateTasks = getTasksForDate(date);
    return dateTasks.length + obligatoryTaskTypes.length;
  };

  const toggleTask = (taskId) => {
    const dateKey = formatDateKey(selectedDate);
    setTasks((prev) => ({
      ...prev,
      [dateKey]:
        prev[dateKey]?.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ) || [],
    }));
  };

  const toggleObligatoryTask = (taskKey) => {
    const dateKey = formatDateKey(selectedDate);
    setObligatoryTasks((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [taskKey]: !prev[dateKey]?.[taskKey],
      },
    }));
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const dateKey = formatDateKey(selectedDate);
    const newTaskObj = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTaskObj],
    }));

    setNewTask("");
    setShowAddTask(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date && date.toDateString() === selectedDate.toDateString();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getPercentageClass = (percentage) => {
    if (percentage === 100) return "green";
    if (percentage >= 75) return "blue";
    if (percentage >= 50) return "yellow";
    if (percentage >= 25) return "orange";
    return "red";
  };

  const getStatsPercentageClass = (percentage) => {
    if (percentage === 100) return "excellent";
    if (percentage >= 50) return "good";
    return "fair";
  };

  const selectedDateTasks = getTasksForDate(selectedDate);
  const selectedDateObligatoryTasks = getObligatoryTasksForDate(selectedDate);
  const completionPercentage = getCompletionPercentage(selectedDate);
  const completedCount = getCompletedCount(selectedDate);
  const totalCount = getTotalCount(selectedDate);

  return (
    <div className="task-calendar-container">
      <div className="task-calendar-main">
        <div className="task-calendar-header">
          <div className="header-content">
            <div className="header-title">
              <Calendar size={32} />
              <h1>Task Calendar</h1>
            </div>
            <div className="header-stats">
              <BarChart3 size={24} />
              <span>Productivity Tracker</span>
            </div>
          </div>
        </div>

        <div className="calendar-grid">
          {/* Calendar Section */}
          <div className="calendar-section">
            <div className="calendar-navigation">
              <button
                className="nav-button"
                onClick={() => navigateMonth(-1)}
                aria-label="Previous month"
              >
                ←
              </button>
              <h2 className="month-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                className="nav-button"
                onClick={() => navigateMonth(1)}
                aria-label="Next month"
              >
                →
              </button>
            </div>

            <div className="weekdays-grid">
              {weekDays.map((day) => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
            </div>

            <div className="days-grid">
              {getDaysInMonth(currentDate).map((date, index) => {
                if (!date) {
                  return <div key={index} className="day-cell empty"></div>;
                }

                const percentage = getCompletionPercentage(date);
                const completed = getCompletedCount(date);
                const total = getTotalCount(date);
                const dayClasses = [
                  "day-cell",
                  isSelected(date) ? "selected" : "",
                  isToday(date) ? "today" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={date.toISOString()}
                    className={dayClasses}
                    onClick={() => setSelectedDate(date)}
                    role="button"
                    tabIndex="0"
                    aria-label={`${date.getDate()} ${
                      monthNames[date.getMonth()]
                    }, ${total} tasks, ${completed} completed`}
                  >
                    <div className="day-number">{date.getDate()}</div>
                    {total > 0 && (
                      <div className="day-progress">
                        <div className="progress-bar">
                          <div
                            className={`progress-fill ${getPercentageClass(
                              percentage
                            )}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="task-count">
                          {completed}/{total}
                        </div>
                        <div className="completion-percentage">
                          {percentage}%
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="tasks-section">
            <div className="tasks-panel">
              <div className="tasks-header">
                <h3 className="selected-date-title">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button
                  className="add-task-button"
                  onClick={() => setShowAddTask(true)}
                >
                  <Plus size={16} />
                  <span>Add Task</span>
                </button>
              </div>

              {/* Obligatory Tasks Buttons */}
              <div className="obligatory-tasks-section">
                <h4 className="obligatory-tasks-title">
                  Daily Routine
                </h4>
                <div className="obligatory-tasks-grid">
                  {obligatoryTaskTypes.map((taskType) => {
                    const isCompleted =
                      selectedDateObligatoryTasks[taskType.key] || false;F
                    return (
                      <Button
                        key={taskType.key}
                        variant={isCompleted ? "success" : taskType.variant}
                        size="lg"
                        onClick={() => toggleObligatoryTask(taskType.key)}
                        className={`obligatory-task-button ${
                          isCompleted ? "completed" : ""
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckSquare
                              size={16}
                              style={{ marginRight: "5px" }}
                            />
                            {taskType.label}
                          </>
                        ) : (
                          <>
                            <Square size={16} style={{ marginRight: "5px" }} />
                            {taskType.label}
                          </>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {totalCount > 0 && (
                <div className="progress-summary">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="progress-bar-large">
                    <div
                      className={`progress-fill-large ${getPercentageClass(
                        completionPercentage
                      )}`}
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {completedCount} of {totalCount} tasks completed
                  </div>
                </div>
              )}

              {showAddTask && (
                <div className="add-task-form">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task..."
                    className="task-input"
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <div className="form-buttons">
                    <button className="form-button primary" onClick={addTask}>
                      Add Task
                    </button>
                    <button
                      className="form-button secondary"
                      onClick={() => {
                        setShowAddTask(false);
                        setNewTask("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Regular Tasks List */}
              <div className="tasks-list">
                <h4 className="tasks-list-title">Additional Tasks</h4>
                {selectedDateTasks.length === 0 ? (
                  <div className="no-tasks">
                    No additional tasks for this day
                  </div>
                ) : (
                  selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-item ${
                        task.completed ? "completed" : "incomplete"
                      }`}
                      onClick={() => toggleTask(task.id)}
                      role="button"
                      tabIndex="0"
                      aria-label={`${
                        task.completed ? "Completed" : "Incomplete"
                      } task: ${task.text}`}
                    >
                      {task.completed ? (
                        <CheckSquare className="task-checkbox" size={20} />
                      ) : (
                        <Square className="task-checkbox" size={20} />
                      )}
                      <span
                        className={`task-text ${
                          task.completed ? "completed" : "incomplete"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
              <h4 className="stats-title">This Month Summary</h4>
              <div className="stats-list">
                {Array.from(
                  new Set([
                    ...Object.keys(tasks),
                    ...Object.keys(obligatoryTasks),
                  ])
                ).map((dateKey) => {
                  const date = new Date(dateKey);
                  const dayTasks = tasks[dateKey] || [];
                  const dayObligatoryTasks = obligatoryTasks[dateKey] || {};

                  const totalTasks =
                    dayTasks.length + obligatoryTaskTypes.length;
                  const completedRegularTasks = dayTasks.filter(
                    (t) => t.completed
                  ).length;
                  const completedObligatoryTasks =
                    Object.values(dayObligatoryTasks).filter(Boolean).length;
                  const totalCompleted =
                    completedRegularTasks + completedObligatoryTasks;

                  const percentage =
                    totalTasks > 0
                      ? Math.round((totalCompleted / totalTasks) * 100)
                      : 0;

                  return (
                    <div key={dateKey} className="stats-item">
                      <span className="stats-date">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <div className="stats-data">
                        <span className="stats-count">
                          {totalCompleted}/{totalTasks}
                        </span>
                        <span
                          className={`stats-percentage ${getStatsPercentageClass(
                            percentage
                          )}`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
