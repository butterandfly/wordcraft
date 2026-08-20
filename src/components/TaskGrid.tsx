import React from 'react';
import { TaskItem, TaskProgress } from '../types';
import { Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TaskGridProps {
  tasks: TaskItem[];
  progressMap: Record<string, TaskProgress>;
  onSelectTask: (task: TaskItem) => void;
}

export const TaskGrid: React.FC<TaskGridProps> = ({
  tasks,
  progressMap,
  onSelectTask
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* Module Title Banner */}
      <div className="bg-paper rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slatebrand-200/80 shadow-soft-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slatebrand-100 flex items-center justify-center text-slatebrand-700 shrink-0">
            <Sparkles className="w-4 h-4 text-slatebrand-600" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slatebrand-900">
              看图写句子
            </h2>
            <p className="text-xs text-slatebrand-400 mt-0.5">
              基础要素 → 修饰要素 → 自主写句 → 纸上默写
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Grid: 平板横屏与桌面每行 3 个 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {tasks.map((task) => {
          const progress = progressMap[task.id] || {
            taskId: task.id,
            completedSteps: [],
            step3Sentence: '',
            step4Confirmed: false,
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
              className="group bg-paper rounded-2xl sm:rounded-3xl border border-slatebrand-200/80 overflow-hidden shadow-soft-sm hover:shadow-soft-md hover:border-slatebrand-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slatebrand-100">
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Theme Tag */}
                <div className="absolute top-2.5 left-2.5 bg-slatebrand-900/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10">
                  {task.theme}
                </div>

                {/* Completed Stamp */}
                {isAllDone && (
                  <div className="absolute top-2.5 right-2.5 bg-sagebrand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 border border-white/20">
                    <Trophy className="w-3 h-3" />
                    <span>已通关</span>
                  </div>
                )}
              </div>

              {/* Task Info */}
              <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slatebrand-800 group-hover:text-slatebrand-900 transition-colors line-clamp-1">
                    {task.title}
                  </h3>
                </div>

                {/* Simple Sleek Progress Bar (移除了0/4步与4个细分按钮) */}
                <div className="w-full h-1.5 bg-slatebrand-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sagebrand-500 transition-all duration-300 rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {/* Action CTA Button */}
                <button
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[38px] ${
                    isAllDone
                      ? 'bg-slatebrand-50 hover:bg-slatebrand-100 text-slatebrand-700 border border-slatebrand-200'
                      : 'bg-slatebrand-700 hover:bg-slatebrand-800 text-white shadow-soft-sm'
                  }`}
                >
                  <span>{isAllDone ? '回顾任务' : completedCount > 0 ? '继续任务' : '开始任务'}</span>
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
