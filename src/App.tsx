import React, { useState, useEffect } from 'react';
import { SENTENCE_TASKS } from './data/tasks';
import { TaskItem, TaskProgress } from './types';
import { Header } from './components/Header';
import { TaskGrid } from './components/TaskGrid';
import { TaskWorkspace } from './components/TaskWorkspace';
import { TaskStorageManager } from './utils/storage';
import { soundFx } from './utils/audio';

export const App: React.FC = () => {
  const [tasks] = useState<TaskItem[]>(SENTENCE_TASKS);
  const [activeTask, setActiveTask] = useState<TaskItem | null>(null);
  const [currentView, setCurrentView] = useState<'task_list' | 'task_workspace'>('task_list');

  // Load progress from storage
  const [progressMap, setProgressMap] = useState<Record<string, TaskProgress>>(() => {
    return TaskStorageManager.getAllProgress();
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return TaskStorageManager.getSoundEnabled();
  });

  useEffect(() => {
    soundFx.setEnabled(soundEnabled);
    TaskStorageManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleSelectTask = (task: TaskItem) => {
    setActiveTask(task);
    setCurrentView('task_workspace');
  };

  const handleBackToTasks = () => {
    setActiveTask(null);
    setCurrentView('task_list');
  };

  const handleUpdateTaskProgress = (taskId: string, updates: Partial<TaskProgress>) => {
    const current = progressMap[taskId] || {
      taskId,
      completedSteps: [],
      step1Sentence: '',
      step2Fragments: [],
      step3Sentence: '',
      step4Confirmed: false,
      lastUpdated: Date.now()
    };

    const updated: TaskProgress = {
      ...current,
      ...updates,
      lastUpdated: Date.now()
    };

    TaskStorageManager.saveTaskProgress(updated);
    setProgressMap((prev) => ({
      ...prev,
      [taskId]: updated
    }));
  };

  // Count fully completed tasks (4/4 steps completed)
  const completedTasksCount = Object.values(progressMap).filter(
    (p) => p.completedSteps && p.completedSteps.length === 4
  ).length;

  return (
    <div className="min-h-screen bg-canvas text-slatebrand-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        currentView={currentView}
        activeTaskTitle={activeTask?.title}
        onBack={handleBackToTasks}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        completedTasksCount={completedTasksCount}
        totalTasksCount={tasks.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'task_list' && (
          <TaskGrid
            tasks={tasks}
            progressMap={progressMap}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'task_workspace' && activeTask && (
          <TaskWorkspace
            task={activeTask}
            progress={
              progressMap[activeTask.id] || {
                taskId: activeTask.id,
                completedSteps: [],
                step1Sentence: '',
                step2Fragments: [],
                step3Sentence: '',
                step4Confirmed: false,
                lastUpdated: 0
              }
            }
            onUpdateProgress={(updates) => handleUpdateTaskProgress(activeTask.id, updates)}
            onBackToTasks={handleBackToTasks}
          />
        )}
      </main>
    </div>
  );
};
