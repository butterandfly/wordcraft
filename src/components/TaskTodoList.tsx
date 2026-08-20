import React, { useState } from 'react';
import { TaskStepId } from '../types';
import { Check, Lock, Layers, Sparkles, FileText, PenTool, ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';

export interface CustomStepConfig {
  id: TaskStepId;
  stepNumber: number;
  title: string;
  icon: React.ReactNode;
}

interface TaskTodoListProps {
  currentStep: TaskStepId;
  completedSteps: TaskStepId[];
  onSelectStep: (stepId: TaskStepId) => void;
  onBackToTasks: () => void;
  onResetTask: () => void;
  customSteps?: CustomStepConfig[];
}

export const TaskTodoList: React.FC<TaskTodoListProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
  onBackToTasks,
  onResetTask,
  customSteps
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  const defaultSteps: CustomStepConfig[] = [
    {
      id: 'step1_basic',
      stepNumber: 1,
      title: '基础要素',
      icon: <Layers className="w-3.5 h-3.5" />
    },
    {
      id: 'step2_modifiers',
      stepNumber: 2,
      title: '修饰要素',
      icon: <Sparkles className="w-3.5 h-3.5" />
    },
    {
      id: 'step3_complete',
      stepNumber: 3,
      title: '完整句子',
      icon: <FileText className="w-3.5 h-3.5" />
    },
    {
      id: 'step4_handwrite',
      stepNumber: 4,
      title: '纸上默写',
      icon: <PenTool className="w-3.5 h-3.5" />
    }
  ];

  const steps = customSteps || defaultSteps;

  // Helper to check if step is unlocked
  const isStepUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prevStepId = steps[index - 1].id;
    return completedSteps.includes(prevStepId);
  };

  const handleConfirmReset = () => {
    soundFx.playBlockClick();
    setShowConfirmReset(false);
    onResetTask();
  };

  return (
    <>
      <nav aria-label="任务步骤导航" className="w-full py-1.5 px-1 sm:px-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Back to Task List Button */}
        <button
          onClick={() => {
            soundFx.playBlockClick();
            onBackToTasks();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-paper hover:bg-slatebrand-50 border border-slatebrand-200 text-slatebrand-700 font-bold text-xs shadow-sm transition-all touch-manipulation min-h-[38px] shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>任务列表</span>
        </button>

        {/* Center: Connected Step Nodes */}
        <div className="flex-1 flex items-center justify-between relative max-w-xl mx-auto px-2">
          {steps.map((st, idx) => {
            const isDone = completedSteps.includes(st.id);
            const isCurrent = currentStep === st.id;
            const isUnlocked = isStepUnlocked(idx);
            const isLocked = !isUnlocked;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={st.id}>
                {/* Step Node */}
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      soundFx.playBlockClick();
                      onSelectStep(st.id);
                    }
                  }}
                  disabled={isLocked}
                  className={`group flex items-center gap-1.5 relative z-10 transition-all select-none ${
                    isLocked
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                >
                  {/* Circle Icon Badge */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-sagebrand-500 text-white shadow-sm ring-2 ring-sagebrand-200'
                        : isCurrent
                        ? 'bg-slatebrand-800 text-white shadow-sm ring-4 ring-slatebrand-200 scale-110'
                        : isLocked
                        ? 'bg-slatebrand-100 text-slatebrand-400 border border-slatebrand-300/80'
                        : 'bg-paper text-slatebrand-600 border-2 border-slatebrand-400 hover:border-slatebrand-600'
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isLocked ? (
                      <Lock className="w-3 h-3 text-slatebrand-400" />
                    ) : (
                      st.icon
                    )}
                  </div>

                  {/* Step Text Label */}
                  <span
                    className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap ${
                      isCurrent
                        ? 'text-slatebrand-900'
                        : isDone
                        ? 'text-sagebrand-800'
                        : isLocked
                        ? 'text-slatebrand-400'
                        : 'text-slatebrand-600 group-hover:text-slatebrand-900'
                    }`}
                  >
                    {st.stepNumber}. {st.title}
                  </span>
                </button>

                {/* Connecting Line between steps */}
                {!isLast && (
                  <div className="flex-1 mx-2 sm:mx-3 h-0.5 bg-slatebrand-200 relative overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isDone ? 'bg-sagebrand-500 w-full' : 'bg-transparent w-0'
                      }`}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Restart/Reset Task Button */}
        <button
          onClick={() => {
            soundFx.playBlockClick();
            setShowConfirmReset(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-paper hover:bg-slatebrand-50 border border-slatebrand-200 text-slatebrand-600 hover:text-slatebrand-900 font-bold text-xs shadow-sm transition-all touch-manipulation min-h-[38px] shrink-0"
          title="重新开始任务"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slatebrand-500" />
          <span className="hidden sm:inline">重新开始</span>
        </button>
      </nav>

      {/* Confirmation Modal for Resetting Task */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slatebrand-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-paper w-full max-w-sm rounded-3xl border border-slatebrand-200 shadow-soft-lg p-6 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slatebrand-900">
                确定要重新开始这个任务吗？
              </h4>
              <p className="text-xs text-slatebrand-500 mt-1">
                已填写的插槽内容将被清空，需重新回答问题。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="py-2.5 px-4 rounded-xl bg-slatebrand-50 hover:bg-slatebrand-100 border border-slatebrand-200 text-slatebrand-700 font-bold text-xs transition-all touch-manipulation min-h-[42px]"
              >
                取消
              </button>
              <button
                onClick={handleConfirmReset}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all touch-manipulation min-h-[42px]"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
