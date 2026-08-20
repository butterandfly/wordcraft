import React, { useState, useEffect } from 'react';
import { TaskItem, Step1Selections, Step2Selections } from '../../types';
import { Check, CheckCircle2, Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Step2Props {
  task: TaskItem;
  step1Selections?: Step1Selections;
  selections?: Step2Selections;
  isCompleted: boolean;
  onCompleteStep: (selections: Step2Selections) => void;
}

export const Step2Modifiers: React.FC<Step2Props> = ({
  task,
  step1Selections,
  selections,
  isCompleted,
  onCompleteStep
}) => {
  const { step2 } = task;

  const [whoMod, setWhoMod] = useState<string>(selections?.whoModifier || '');
  const [actionMod, setActionMod] = useState<string>(selections?.actionModifier || '');
  const [envMod, setEnvMod] = useState<string>(selections?.envModifier || '');

  useEffect(() => {
    if (selections) {
      if (selections.whoModifier) setWhoMod(selections.whoModifier);
      if (selections.actionModifier) setActionMod(selections.actionModifier);
      if (selections.envModifier) setEnvMod(selections.envModifier);
    }
  }, [selections]);

  const targetWho = step2.targetItems[0];
  const targetAction = step2.targetItems[1];
  const targetEnv = step2.targetItems[2];

  const handleSelectWhoMod = (text: string) => {
    soundFx.playBlockClick();
    setWhoMod(text);
  };

  const handleSelectActionMod = (text: string) => {
    soundFx.playBlockClick();
    setActionMod(text);
  };

  const handleSelectEnvMod = (text: string) => {
    soundFx.playBlockClick();
    setEnvMod(text);
  };

  const handleComplete = () => {
    if (!whoMod || !actionMod || !envMod) return;
    soundFx.playSuccessChime();
    onCompleteStep({
      whoModifier: whoMod,
      actionModifier: actionMod,
      envModifier: envMod
    });
  };

  const isAllAnswered = Boolean(whoMod && actionMod && envMod);

  return (
    <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-md flex flex-col gap-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-md">
            第 2 步
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900">
            修饰要素：回答具体问题，补充细节
          </h3>
        </div>
      </div>

      {/* Step 1 Context Reminder */}
      {step1Selections && (
        <div className="bg-slatebrand-50/80 border border-slatebrand-200/70 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 text-xs">
          <Bookmark className="w-4 h-4 text-slatebrand-500 shrink-0" />
          <span className="text-slatebrand-600">
            基础要素：
            <strong className="text-blue-900 ml-1">[{step1Selections.who}]</strong> ·
            <strong className="text-emerald-900 ml-1">[{step1Selections.where}]</strong> ·
            <strong className="text-amber-900 ml-1">[{step1Selections.action}]</strong>
          </span>
        </div>
      )}

      {/* Sequential Modifier Questions */}
      <div className="flex flex-col gap-4">
        {/* 问题 1：具体修饰问题 1 */}
        {targetWho && (
          <div className="bg-purple-50/40 border border-purple-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-700" />
                {targetWho.questionTitle}
              </span>
              {whoMod && (
                <span className="text-xs font-bold text-purple-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  已选：{whoMod}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {targetWho.suggestedModifiers.map((mod) => {
                const isSelected = whoMod === mod.text;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectWhoMod(mod.text)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-700 shadow-sm scale-105'
                        : 'bg-paper hover:bg-purple-100/70 border-purple-200 text-purple-900 active:scale-95'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{mod.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 问题 2：具体修饰问题 2 (选完第 1 问后显示) */}
        {whoMod && targetAction && (
          <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                {targetAction.questionTitle}
              </span>
              {actionMod && (
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  已选：{actionMod}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {targetAction.suggestedModifiers.map((mod) => {
                const isSelected = actionMod === mod.text;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectActionMod(mod.text)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm scale-105'
                        : 'bg-paper hover:bg-amber-100/70 border-amber-200 text-amber-900 active:scale-95'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{mod.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 问题 3：具体修饰问题 3 (选完第 2 问后显示) */}
        {actionMod && targetEnv && (
          <div className="bg-emerald-50/40 border border-emerald-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                {targetEnv.questionTitle}
              </span>
              {envMod && (
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  已选：{envMod}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {targetEnv.suggestedModifiers.map((mod) => {
                const isSelected = envMod === mod.text;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleSelectEnvMod(mod.text)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm scale-105'
                        : 'bg-paper hover:bg-emerald-100/70 border-emerald-200 text-emerald-900 active:scale-95'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{mod.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Modifiers Summary Card */}
      {isAllAnswered && (
        <div className="bg-slatebrand-50/80 border border-slatebrand-200 rounded-2xl p-4 flex flex-col gap-2 animate-fadeIn">
          <span className="text-xs font-bold text-slatebrand-700">
            已收集的修饰要素：
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-950 font-bold border border-purple-200">
              ✨ {whoMod}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-200">
              ✨ {actionMod}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-bold border border-emerald-200">
              ✨ {envMod}
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {isAllAnswered && (
        <div className="flex justify-end pt-1 animate-fadeIn">
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sagebrand-600 hover:bg-sagebrand-700 text-white font-bold text-xs shadow-soft-sm transition-all active:scale-95 touch-manipulation min-h-[46px]"
          >
            <span>{isCompleted ? '已保存，下一步：写完整句子' : '修饰完成，去写完整句子'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
