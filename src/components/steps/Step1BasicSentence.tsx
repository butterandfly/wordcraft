import React, { useState, useEffect } from 'react';
import { TaskItem, Step1Selections } from '../../types';
import { Check, User, MapPin, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface Step1Props {
  task: TaskItem;
  selections?: Step1Selections;
  isCompleted: boolean;
  onCompleteStep: (selections: Step1Selections) => void;
}

export const Step1BasicSentence: React.FC<Step1Props> = ({
  task,
  selections,
  isCompleted,
  onCompleteStep
}) => {
  const { step1 } = task;

  const [selectedWho, setSelectedWho] = useState<string>(selections?.who || '');
  const [selectedWhere, setSelectedWhere] = useState<string>(selections?.where || '');
  const [selectedAction, setSelectedAction] = useState<string>(selections?.action || '');

  useEffect(() => {
    if (selections) {
      if (selections.who) setSelectedWho(selections.who);
      if (selections.where) setSelectedWhere(selections.where);
      if (selections.action) setSelectedAction(selections.action);
    }
  }, [selections]);

  const handleSelectWho = (text: string) => {
    soundFx.playBlockClick();
    setSelectedWho(text);
  };

  const handleSelectWhere = (text: string) => {
    soundFx.playBlockClick();
    setSelectedWhere(text);
  };

  const handleSelectAction = (text: string) => {
    soundFx.playBlockClick();
    setSelectedAction(text);
  };

  const handleComplete = () => {
    if (!selectedWho || !selectedWhere || !selectedAction) return;
    soundFx.playSuccessChime();
    onCompleteStep({
      who: selectedWho,
      where: selectedWhere,
      action: selectedAction
    });
  };

  const isAllAnswered = Boolean(selectedWho && selectedWhere && selectedAction);

  return (
    <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-md flex flex-col gap-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
            第 1 步
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900">
            基础要素：找出画面的 3 个基本元素
          </h3>
        </div>
      </div>

      {/* Sequential Questions */}
      <div className="flex flex-col gap-4">
        {/* 问题 1：图片里的是谁？ */}
        <div className="bg-blue-50/40 border border-blue-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-700" />
              1. 图片里的是谁？
            </span>
            {selectedWho && (
              <span className="text-xs font-bold text-blue-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                已选：{selectedWho}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {step1.subjects.map((item) => {
              const isSelected = selectedWho === item.text;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWho(item.text)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm scale-105'
                      : 'bg-paper hover:bg-blue-100/70 border-blue-200 text-blue-900 active:scale-95'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{item.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 问题 2：在哪里？ (选完第 1 问后显示) */}
        {selectedWho && (
          <div className="bg-emerald-50/40 border border-emerald-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                2. 在哪里？
              </span>
              {selectedWhere && (
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  已选：{selectedWhere}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {step1.environments.map((item) => {
                const isSelected = selectedWhere === item.text;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectWhere(item.text)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm scale-105'
                        : 'bg-paper hover:bg-emerald-100/70 border-emerald-200 text-emerald-900 active:scale-95'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 问题 3：在做什么？ (选完第 2 问后显示) */}
        {selectedWhere && (
          <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 flex flex-col gap-2.5 transition-all animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-700" />
                3. 在做什么？
              </span>
              {selectedAction && (
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  已选：{selectedAction}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {step1.actions.map((item) => {
                const isSelected = selectedAction === item.text;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAction(item.text)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[42px] flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-700 shadow-sm scale-105'
                        : 'bg-paper hover:bg-amber-100/70 border-amber-200 text-amber-900 active:scale-95'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{item.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Summary Card (回答完 3 个基础要素后呈现) */}
      {isAllAnswered && (
        <div className="bg-slatebrand-50/80 border border-slatebrand-200 rounded-2xl p-4 flex flex-col gap-2 animate-fadeIn">
          <span className="text-xs font-bold text-slatebrand-700">
            已收集的基础要素：
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-950 font-bold border border-blue-200">
              👤 {selectedWho}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-bold border border-emerald-200">
              📍 {selectedWhere}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-bold border border-amber-200">
              ⚡ {selectedAction}
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
            <span>{isCompleted ? '已保存，下一步：添加修饰' : '完成基础要素，去添加修饰'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
