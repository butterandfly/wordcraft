import React from 'react';
import { ExpansionTaskItem, ExpansionProgress } from '../../types';
import { Sparkles, ArrowRight, Trophy, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface ExpansionGridProps {
  tasks: ExpansionTaskItem[];
  progressMap: Record<string, ExpansionProgress>;
  onSelectTask: (task: ExpansionTaskItem) => void;
}

export const ExpansionGrid: React.FC<ExpansionGridProps> = ({
  tasks,
  progressMap,
  onSelectTask
}) => {
  const renderDifficulty = (diff: number = 2) => {
    return '🔥'.repeat(diff);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Module Title Banner */}
      <div className="bg-paper rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slatebrand-200/80 shadow-soft-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slatebrand-900">
              扩写句子
            </h2>
            <p className="text-xs text-slatebrand-400 mt-0.5">
              纯文字骨干出发 · 逐个插槽拉伸扩展 · 默写还原长句
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {tasks.map((task) => {
          const progress = progressMap[task.id] || {
            taskId: task.id,
            completedSteps: [],
            slotAnswers: {},
            finalSentence: '',
            isConfirmed: false,
            lastUpdated: 0
          };

          const completedCount = progress.completedSteps.length;
          const isAllDone = completedCount === 4;
          const percent = Math.round((completedCount / 4) * 100);

          return (
            <div
              key={task.id}
              onClick={() => {
                soundFx.playBlockClick();
                onSelectTask(task);
              }}
              className="group bg-paper rounded-2xl sm:rounded-3xl border border-slatebrand-200/80 p-5 shadow-soft-sm hover:shadow-soft-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between gap-4"
            >
              {/* Header: Title & Completed Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-slatebrand-800 group-hover:text-slatebrand-900 transition-colors">
                    《{task.title}》
                  </h3>
                  <div className="text-xs text-slatebrand-500 font-medium flex items-center gap-1">
                    <span>难度：</span>
                    <span className="tracking-tight">{renderDifficulty(task.difficulty)}</span>
                  </div>
                </div>

                {isAllDone && (
                  <div className="bg-sagebrand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1 shrink-0">
                    <Trophy className="w-3 h-3" />
                    <span>已通关</span>
                  </div>
                )}
              </div>

              {/* Skeleton Box */}
              <div className="bg-canvas/80 border border-slatebrand-200/70 rounded-2xl p-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-slatebrand-800 font-serif truncate">
                  {task.skeletonSentence}
                </span>
              </div>

              {/* Progress & CTA Button */}
              <div className="flex flex-col gap-2.5">
                <div className="w-full h-1.5 bg-slatebrand-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sagebrand-500 transition-all duration-300 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <button
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[38px] ${
                    isAllDone
                      ? 'bg-slatebrand-50 hover:bg-slatebrand-100 text-slatebrand-700 border border-slatebrand-200'
                      : 'bg-slatebrand-700 hover:bg-slatebrand-800 text-white shadow-soft-sm'
                  }`}
                >
                  <span>{isAllDone ? '回顾任务' : completedCount > 0 ? '继续扩写' : '开始扩写'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
