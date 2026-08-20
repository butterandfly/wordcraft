import React, { useState } from 'react';
import { TaskItem, TaskProgress, TaskStepId, Step1Selections, Step2Selections } from '../types';
import { TaskTodoList } from './TaskTodoList';
import { Step1BasicSentence } from './steps/Step1BasicSentence';
import { Step2Modifiers } from './steps/Step2Modifiers';
import { Step3CompleteSentence } from './steps/Step3CompleteSentence';
import { Step4PaperHandwriting } from './steps/Step4PaperHandwriting';
import { Sparkles } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-5">
      {/* 顶部：水平连线步骤条（左侧带返回列表，右侧带重新开始） */}
      <TaskTodoList
        currentStep={currentStep}
        completedSteps={progress.completedSteps}
        onSelectStep={(stepId) => setCurrentStep(stepId)}
        onBackToTasks={onBackToTasks}
        onResetTask={handleResetTask}
      />

      {/* 主体两栏布局：图片区域 + 构建区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 区域一：图片区域 (Image Area) */}
        <section aria-label="图片区域" className="lg:col-span-5">
          <div className="bg-paper rounded-3xl p-3 sm:p-4 border border-slatebrand-200/80 shadow-soft-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs sm:text-sm font-bold text-slatebrand-800 flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-sagebrand-600 shrink-0" />
                <span>{task.title}</span>
              </h2>
              <span className="text-[11px] font-semibold text-slatebrand-400 shrink-0">
                {task.theme}
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slatebrand-900/5 shadow-inner border border-slatebrand-200/60">
              <img
                src={task.image}
                alt={task.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 区域二：构建区域 (Construction Area) */}
        <section aria-label="构建区域" className="lg:col-span-7">
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
    </div>
  );
};
