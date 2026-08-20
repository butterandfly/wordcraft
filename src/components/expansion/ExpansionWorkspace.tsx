import React, { useState } from 'react';
import { ExpansionTaskItem, ExpansionProgress, TaskStepId } from '../../types';
import { TaskTodoList, CustomStepConfig } from '../TaskTodoList';
import { SlotExpansionStep } from './SlotExpansionStep';
import { FinalRecallStep } from './FinalRecallStep';
import { Sparkles, Layers, PenTool } from 'lucide-react';

interface ExpansionWorkspaceProps {
  task: ExpansionTaskItem;
  progress: ExpansionProgress;
  onUpdateProgress: (updates: Partial<ExpansionProgress>) => void;
  onBackToTasks: () => void;
}

export const ExpansionWorkspace: React.FC<ExpansionWorkspaceProps> = ({
  task,
  progress,
  onUpdateProgress,
  onBackToTasks
}) => {
  const totalSlots = task.slots.length;

  const getStepId = (idx: number) => `slot_step_${idx}`;
  const recallStepId = 'step_recall';

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    for (let i = 0; i < totalSlots; i++) {
      if (!progress.completedSteps.includes(getStepId(i))) {
        return i;
      }
    }
    return totalSlots;
  });

  const [slotAnswers, setSlotAnswers] = useState<Record<string, string>>(progress.slotAnswers || {});

  // Dynamic step navigation: 插槽 1 ── 插槽 2 ── ... ── 默写
  const expansionStepsConfig: CustomStepConfig[] = [
    ...task.slots.map((_, idx) => ({
      id: getStepId(idx) as TaskStepId,
      stepNumber: idx + 1,
      title: `插槽 ${idx + 1}`,
      icon: <Layers className="w-3.5 h-3.5" />
    })),
    {
      id: recallStepId as TaskStepId,
      stepNumber: totalSlots + 1,
      title: '默写',
      icon: <PenTool className="w-3.5 h-3.5" />
    }
  ];

  const handleUpdateSlotAnswer = (slotId: string, val: string) => {
    const next = { ...slotAnswers, [slotId]: val };
    setSlotAnswers(next);
  };

  const handleCompleteCurrentSlot = (val: string) => {
    const activeSlot = task.slots[currentStepIndex];
    if (!activeSlot) return;

    const nextAnswers = { ...slotAnswers, [activeSlot.slotId]: val };
    setSlotAnswers(nextAnswers);

    const stepId = getStepId(currentStepIndex);
    const newCompleted = Array.from(new Set([...progress.completedSteps, stepId as TaskStepId]));

    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);

    const isFinishedAllSlots = nextIndex >= totalSlots;
    const finalComposed = assembleTemplateSentence(nextAnswers);

    onUpdateProgress({
      slotAnswers: nextAnswers,
      completedSteps: newCompleted,
      finalSentence: isFinishedAllSlots ? finalComposed : progress.finalSentence
    });
  };

  const handleConfirmRecallDone = () => {
    const newCompleted = Array.from(new Set([...progress.completedSteps, recallStepId as TaskStepId]));
    onUpdateProgress({
      completedSteps: newCompleted,
      isConfirmed: true,
      confirmedAt: Date.now()
    });
  };

  const handleResetTask = () => {
    setSlotAnswers({});
    setCurrentStepIndex(0);
    onUpdateProgress({
      slotAnswers: {},
      finalSentence: '',
      completedSteps: [],
      isConfirmed: false,
      confirmedAt: undefined
    });
  };

  // Helper to assemble final sentence
  const assembleTemplateSentence = (answers: Record<string, string>) => {
    let result = task.sentenceTemplate;
    task.slots.forEach((s) => {
      const val = answers[s.slotId] || s.sampleFill;
      result = result.replace(`{${s.slotId}}`, val);
    });
    return result;
  };

  // Render sentence template dynamically for the active step index
  const renderSentenceForCurrentStep = () => {
    if (currentStepIndex >= totalSlots) return null;

    const activeSlot = task.slots[currentStepIndex];
    const currentActiveVal = slotAnswers[activeSlot.slotId];
    const templateForStep = task.stepSentenceTemplates[currentStepIndex] || '{slot}' + task.skeletonSentence;

    // Tokenize template by {slot} or {slotId}
    const parts = templateForStep.split(/(\{[^}]+\})/g);

    return (
      <div className="flex flex-wrap items-center gap-1.5 text-base sm:text-lg font-serif font-bold text-slatebrand-900 leading-relaxed">
        {parts.map((part, pIdx) => {
          if (part === '{slot}') {
            // Current active slot [ ? ]
            return currentActiveVal ? (
              <span
                key={pIdx}
                className="inline-flex items-center px-3 py-1 rounded-xl bg-amber-600 text-white font-bold shadow-xs animate-fadeIn"
              >
                {currentActiveVal}
              </span>
            ) : (
              <span
                key={pIdx}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border-2 border-dashed border-amber-400 font-bold text-lg shadow-xs animate-pulse"
              >
                ?
              </span>
            );
          }

          if (part.startsWith('{') && part.endsWith('}')) {
            // Pre-filled slot from previous steps
            const slotId = part.slice(1, -1);
            const slotIdx = task.slots.findIndex((s) => s.slotId === slotId);
            if (slotIdx !== -1) {
              const filledVal = slotAnswers[slotId] || task.slots[slotIdx].sampleFill;
              return (
                <span
                  key={pIdx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-sagebrand-50 text-sagebrand-900 border border-sagebrand-200 font-semibold text-sm"
                >
                  {filledVal}
                </span>
              );
            }
          }

          // Static text part in template
          return (
            <span key={pIdx} className="text-slatebrand-800">
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  const fireEmoji = '🔥'.repeat(task.difficulty || 2);
  const currentStepId = currentStepIndex >= totalSlots ? recallStepId : getStepId(currentStepIndex);

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
      {/* 顶部：动态连线步骤条（自适应 N 个插槽 + 默写） */}
      <TaskTodoList
        currentStep={currentStepId}
        completedSteps={progress.completedSteps}
        onSelectStep={(stepId) => {
          if (stepId === recallStepId) {
            setCurrentStepIndex(totalSlots);
          } else {
            const idx = parseInt(stepId.replace('slot_step_', ''), 10);
            if (!isNaN(idx)) setCurrentStepIndex(idx);
          }
        }}
        onBackToTasks={onBackToTasks}
        onResetTask={handleResetTask}
        customSteps={expansionStepsConfig}
      />

      {/* 任务名称与难度标识条 */}
      <div className="bg-paper rounded-2xl px-5 py-3 border border-slatebrand-200/80 shadow-soft-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slatebrand-900 tracking-tight leading-none">
              《{task.title}》
            </h2>
            <div className="text-xs text-slatebrand-500 font-medium flex items-center gap-1 mt-1">
              <span>难度：</span>
              <span className="tracking-tight">{fireEmoji}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 核心视觉：每一步展示 100% 语法完整、无悬垂标点的单插槽句子卡片 */}
      {currentStepIndex < totalSlots && (
        <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-sm flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-slatebrand-600">
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>当前句子：</span>
            </span>
            <span className="text-[11px] text-slatebrand-400">
              请填写方块 [ ? ]
            </span>
          </div>

          <div className="bg-canvas/80 border-2 border-slatebrand-200/70 rounded-2xl p-4 sm:p-5">
            {renderSentenceForCurrentStep()}
          </div>
        </div>
      )}

      {/* 单步插槽构建组件 或 第 4 步骨干默写组件 */}
      <div>
        {currentStepIndex < totalSlots && (
          <SlotExpansionStep
            task={task}
            slot={task.slots[currentStepIndex]}
            currentValue={slotAnswers[task.slots[currentStepIndex].slotId] || ''}
            onChangeValue={(val) => handleUpdateSlotAnswer(task.slots[currentStepIndex].slotId, val)}
            isCompleted={progress.completedSteps.includes(getStepId(currentStepIndex))}
            onCompleteStep={handleCompleteCurrentSlot}
          />
        )}

        {currentStepIndex >= totalSlots && (
          <FinalRecallStep
            task={task}
            finalSentence={progress.finalSentence || assembleTemplateSentence(slotAnswers)}
            isConfirmed={progress.completedSteps.includes(recallStepId)}
            confirmedAt={progress.confirmedAt}
            onConfirmPaperDone={handleConfirmRecallDone}
            onBackToTasks={onBackToTasks}
          />
        )}
      </div>
    </div>
  );
};
