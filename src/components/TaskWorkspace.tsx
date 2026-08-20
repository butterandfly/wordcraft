import React, { useState, useEffect } from 'react';
import { TaskItem, TaskProgress, TaskStepId, Step1Selections, Step2Selections } from '../types';
import { TaskTodoList } from './TaskTodoList';
import { Step1BasicSentence } from './steps/Step1BasicSentence';
import { Step2Modifiers } from './steps/Step2Modifiers';
import { Step3CompleteSentence } from './steps/Step3CompleteSentence';
import { Step4PaperHandwriting } from './steps/Step4PaperHandwriting';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TaskWorkspaceProps {
  task: TaskItem;
  progress: TaskProgress;
  onUpdateProgress: (updates: Partial<TaskProgress>) => void;
  onBackToTasks: () => void;
}

export const TaskWorkspace: React.FC<TaskWorkspaceProps> = ({
  task,
  progress,
  onUpdateProgress,
  onBackToTasks
}) => {
  const [currentStep, setCurrentStep] = useState<TaskStepId>(() => {
    if (!progress.completedSteps.includes('step1_basic')) return 'step1_basic';
    if (!progress.completedSteps.includes('step2_modifiers')) return 'step2_modifiers';
    if (!progress.completedSteps.includes('step3_complete')) return 'step3_complete';
    return 'step4_handwrite';
  });

  const [step1Selections, setStep1Selections] = useState<Step1Selections | undefined>(progress.step1Selections);
  const [step2Selections, setStep2Selections] = useState<Step2Selections | undefined>(progress.step2Selections);
  const [step3Input, setStep3Input] = useState<string>(progress.step3Sentence || '');
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isImageZoomed) {
        setIsImageZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageZoomed]);

  const handleCompleteStep1 = (selections: Step1Selections) => {
    setStep1Selections(selections);
    const newCompleted = Array.from(new Set([...progress.completedSteps, 'step1_basic' as TaskStepId]));
    onUpdateProgress({
      step1Selections: selections,
      completedSteps: newCompleted
    });
    setCurrentStep('step2_modifiers');
  };

  const handleCompleteStep2 = (selections: Step2Selections) => {
    setStep2Selections(selections);
    const newCompleted = Array.from(new Set([...progress.completedSteps, 'step2_modifiers' as TaskStepId]));
    onUpdateProgress({
      step2Selections: selections,
      completedSteps: newCompleted
    });
    setCurrentStep('step3_complete');
  };

  const handleCompleteStep3 = (sentence: string) => {
    setStep3Input(sentence);
    const newCompleted = Array.from(new Set([...progress.completedSteps, 'step3_complete' as TaskStepId]));
    onUpdateProgress({
      step3Sentence: sentence,
      completedSteps: newCompleted
    });
    setCurrentStep('step4_handwrite');
  };

  const handleConfirmStep4 = () => {
    const newCompleted = Array.from(new Set([...progress.completedSteps, 'step4_handwrite' as TaskStepId]));
    onUpdateProgress({
      completedSteps: newCompleted,
      step4Confirmed: true,
      step4ConfirmedAt: Date.now()
    });
  };

  const handleResetTask = () => {
    setStep1Selections(undefined);
    setStep2Selections(undefined);
    setStep3Input('');
    setCurrentStep('step1_basic');
    onUpdateProgress({
      step1Selections: undefined,
      step2Selections: undefined,
      step3Sentence: '',
      completedSteps: [],
      step4Confirmed: false,
      step4ConfirmedAt: undefined
    });
  };

  const fireEmoji = '🔥'.repeat(task.difficulty || 2);

  return (
    <div className="flex flex-col gap-5">
      {/* 顶部：水平连线步骤条 */}
      <TaskTodoList
        currentStep={currentStep}
        completedSteps={progress.completedSteps}
        onSelectStep={(stepId) => setCurrentStep(stepId)}
        onBackToTasks={onBackToTasks}
        onResetTask={handleResetTask}
      />

      {/* 主体两栏布局：图片区域(放大占比) + 构建区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* 区域一：图片区域 (Image Area - 加大显示与点击放大) */}
        <section aria-label="图片区域" className="lg:col-span-6">
          <div className="bg-paper rounded-3xl p-3.5 sm:p-5 border border-slatebrand-200/80 shadow-soft-sm flex flex-col gap-3">
            {/* Header info with Title & Difficulty */}
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-sm sm:text-base font-bold text-slatebrand-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-sagebrand-600 shrink-0" />
                  <span>{task.title}</span>
                </h2>
                {/* 独立一行显示难度 */}
                <div className="text-xs text-slatebrand-500 font-medium flex items-center gap-1">
                  <span>难度：</span>
                  <span className="tracking-tight">{fireEmoji}</span>
                </div>
              </div>
            </div>

            {/* Main Image (Click to Zoom) */}
            <div
              onClick={() => {
                soundFx.playBlockClick();
                setIsImageZoomed(true);
              }}
              className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slatebrand-900/5 shadow-inner border border-slatebrand-200/60 cursor-zoom-in transition-all"
              title="点击查看大图"
            >
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />

              {/* Hover Zoom Overlay Hint */}
              <div className="absolute inset-0 bg-slatebrand-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="bg-slatebrand-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>点击查看大图</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 区域二：构建区域 (Construction Area) */}
        <section aria-label="构建区域" className="lg:col-span-6">
          {currentStep === 'step1_basic' && (
            <Step1BasicSentence
              task={task}
              selections={step1Selections}
              isCompleted={progress.completedSteps.includes('step1_basic')}
              onCompleteStep={handleCompleteStep1}
            />
          )}

          {currentStep === 'step2_modifiers' && (
            <Step2Modifiers
              task={task}
              step1Selections={step1Selections}
              selections={step2Selections}
              isCompleted={progress.completedSteps.includes('step2_modifiers')}
              onCompleteStep={handleCompleteStep2}
            />
          )}

          {currentStep === 'step3_complete' && (
            <Step3CompleteSentence
              task={task}
              step1Selections={step1Selections}
              step2Selections={step2Selections}
              sentenceValue={step3Input}
              onSentenceChange={setStep3Input}
              isCompleted={progress.completedSteps.includes('step3_complete')}
              onCompleteStep={handleCompleteStep3}
            />
          )}

          {currentStep === 'step4_handwrite' && (
            <Step4PaperHandwriting
              task={task}
              step3Sentence={step3Input}
              isConfirmed={progress.completedSteps.includes('step4_handwrite')}
              confirmedAt={progress.step4ConfirmedAt}
              onConfirmPaperDone={handleConfirmStep4}
              onBackToTasks={onBackToTasks}
            />
          )}
        </section>
      </div>

      {/* Lightbox Modal (高清大图弹窗) */}
      {isImageZoomed && (
        <div
          onClick={() => setIsImageZoomed(false)}
          className="fixed inset-0 z-50 bg-slatebrand-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn cursor-zoom-out"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsImageZoomed(false)}
            aria-label="关闭大图"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all touch-manipulation z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Full-view Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center cursor-default"
          >
            <img
              src={task.image}
              alt={task.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="flex items-center justify-between w-full mt-3 px-2 text-white/80 text-xs sm:text-sm">
              <span className="font-bold">{task.title}</span>
              <span className="text-white/60">点击背景或按 ESC 关闭</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
