import React, { useState, useEffect } from 'react';
import { SENTENCE_TASKS } from './data/tasks';
import { EXPANSION_TASKS } from './data/expansionTasks';
import { TaskItem, TaskProgress, ExpansionTaskItem, ExpansionProgress } from './types';
import { Header } from './components/Header';
import { TaskGrid } from './components/TaskGrid';
import { TaskWorkspace } from './components/TaskWorkspace';
import { ExpansionGrid } from './components/expansion/ExpansionGrid';
import { ExpansionWorkspace } from './components/expansion/ExpansionWorkspace';
import { TaskStorageManager } from './utils/storage';
import { soundFx } from './utils/audio';
import { Image, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<'module-sentence' | 'module-expansion'>('module-sentence');

  // --- 看图写句子 模块状态 ---
  const [sentenceTasks] = useState<TaskItem[]>(SENTENCE_TASKS);
  const [activeSentenceTask, setActiveSentenceTask] = useState<TaskItem | null>(null);
  const [sentenceProgressMap, setSentenceProgressMap] = useState<Record<string, TaskProgress>>(() => {
    return TaskStorageManager.getAllProgress();
  });

  // --- 扩写句子 模块状态 ---
  const [expansionTasks] = useState<ExpansionTaskItem[]>(EXPANSION_TASKS);
  const [activeExpansionTask, setActiveExpansionTask] = useState<ExpansionTaskItem | null>(null);
  const [expansionProgressMap, setExpansionProgressMap] = useState<Record<string, ExpansionProgress>>(() => {
    return TaskStorageManager.getAllExpansionProgress();
  });

  // 音效
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return TaskStorageManager.getSoundEnabled();
  });

  useEffect(() => {
    soundFx.setEnabled(soundEnabled);
    TaskStorageManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  // 看图写句子 逻辑
  const handleSelectSentenceTask = (task: TaskItem) => {
    setActiveSentenceTask(task);
  };

  const handleBackFromSentenceTask = () => {
    setActiveSentenceTask(null);
  };

  const handleUpdateSentenceProgress = (taskId: string, updates: Partial<TaskProgress>) => {
    const current = sentenceProgressMap[taskId] || {
      taskId,
      completedSteps: [],
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
    setSentenceProgressMap((prev) => ({
      ...prev,
      [taskId]: updated
    }));
  };

  // 扩写句子 逻辑
  const handleSelectExpansionTask = (task: ExpansionTaskItem) => {
    setActiveExpansionTask(task);
  };

  const handleBackFromExpansionTask = () => {
    setActiveExpansionTask(null);
  };

  const handleUpdateExpansionProgress = (taskId: string, updates: Partial<ExpansionProgress>) => {
    const current = expansionProgressMap[taskId] || {
      taskId,
      completedSteps: [],
      slotAnswers: {},
      finalSentence: '',
      isConfirmed: false,
      lastUpdated: Date.now()
    };

    const updated: ExpansionProgress = {
      ...current,
      ...updates,
      lastUpdated: Date.now()
    };

    TaskStorageManager.saveExpansionProgress(updated);
    setExpansionProgressMap((prev) => ({
      ...prev,
      [taskId]: updated
    }));
  };

  // 切换模块
  const handleSwitchModule = (modId: 'module-sentence' | 'module-expansion') => {
    setActiveSentenceTask(null);
    setActiveExpansionTask(null);
    setActiveModuleId(modId);
  };

  const isBrowsingList = !activeSentenceTask && !activeExpansionTask;

  return (
    <div className="min-h-screen bg-canvas text-slatebrand-900 flex flex-col font-sans">
      {/* 顶部 Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Header 下方的模块选择导航栏（在任务列表页展示） */}
        {isBrowsingList && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 bg-paper p-1.5 rounded-2xl border border-slatebrand-200/80 shadow-soft-xs">
              <button
                onClick={() => {
                  if (activeModuleId !== 'module-sentence') {
                    soundFx.playBlockClick();
                    handleSwitchModule('module-sentence');
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all touch-manipulation min-h-[40px] ${
                  activeModuleId === 'module-sentence'
                    ? 'bg-slatebrand-800 text-white shadow-soft-sm'
                    : 'text-slatebrand-600 hover:text-slatebrand-900 hover:bg-slatebrand-50'
                }`}
              >
                <Image className={`w-4 h-4 ${activeModuleId === 'module-sentence' ? 'text-sagebrand-300' : 'text-sagebrand-600'}`} />
                <span>看图写句子</span>
              </button>

              <button
                onClick={() => {
                  if (activeModuleId !== 'module-expansion') {
                    soundFx.playBlockClick();
                    handleSwitchModule('module-expansion');
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all touch-manipulation min-h-[40px] ${
                  activeModuleId === 'module-expansion'
                    ? 'bg-slatebrand-800 text-white shadow-soft-sm'
                    : 'text-slatebrand-600 hover:text-slatebrand-900 hover:bg-slatebrand-50'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${activeModuleId === 'module-expansion' ? 'text-amber-300' : 'text-amber-600'}`} />
                <span>扩写句子</span>
              </button>
            </div>
          </div>
        )}

        {/* 模块一：看图写句子 */}
        {activeModuleId === 'module-sentence' && (
          <>
            {!activeSentenceTask && (
              <TaskGrid
                tasks={sentenceTasks}
                progressMap={sentenceProgressMap}
                onSelectTask={handleSelectSentenceTask}
              />
            )}

            {activeSentenceTask && (
              <TaskWorkspace
                task={activeSentenceTask}
                progress={
                  sentenceProgressMap[activeSentenceTask.id] || {
                    taskId: activeSentenceTask.id,
                    completedSteps: [],
                    step3Sentence: '',
                    step4Confirmed: false,
                    lastUpdated: 0
                  }
                }
                onUpdateProgress={(updates) => handleUpdateSentenceProgress(activeSentenceTask.id, updates)}
                onBackToTasks={handleBackFromSentenceTask}
              />
            )}
          </>
        )}

        {/* 模块二：扩写句子 */}
        {activeModuleId === 'module-expansion' && (
          <>
            {!activeExpansionTask && (
              <ExpansionGrid
                tasks={expansionTasks}
                progressMap={expansionProgressMap}
                onSelectTask={handleSelectExpansionTask}
              />
            )}

            {activeExpansionTask && (
              <ExpansionWorkspace
                task={activeExpansionTask}
                progress={
                  expansionProgressMap[activeExpansionTask.id] || {
                    taskId: activeExpansionTask.id,
                    completedSteps: [],
                    slotAnswers: {},
                    finalSentence: '',
                    isConfirmed: false,
                    lastUpdated: 0
                  }
                }
                onUpdateProgress={(updates) => handleUpdateExpansionProgress(activeExpansionTask.id, updates)}
                onBackToTasks={handleBackFromExpansionTask}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};
