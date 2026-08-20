import React, { useState, useEffect } from 'react';
import { ExpansionTaskItem, ExpansionSlot } from '../../types';
import { Check, ArrowRight, Sparkles, Lightbulb, Trash2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface SlotExpansionStepProps {
  task: ExpansionTaskItem;
  slot: ExpansionSlot;
  currentValue: string;
  onChangeValue: (val: string) => void;
  isCompleted: boolean;
  onCompleteStep: (val: string) => void;
}

export const SlotExpansionStep: React.FC<SlotExpansionStepProps> = ({
  task,
  slot,
  currentValue,
  onChangeValue,
  isCompleted,
  onCompleteStep
}) => {
  const [inputValue, setInputValue] = useState<string>(currentValue || '');

  useEffect(() => {
    setInputValue(currentValue || '');
  }, [currentValue]);

  const handleSelectOption = (text: string) => {
    soundFx.playBlockClick();
    setInputValue(text);
    onChangeValue(text);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    onChangeValue(val);
  };

  const handleComplete = () => {
    if (!inputValue.trim()) return;
    soundFx.playSuccessChime();
    onCompleteStep(inputValue.trim());
  };

  return (
    <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-md flex flex-col gap-5 animate-fadeIn">
      {/* Step Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
            插槽 {slot.slotIndex}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900">
            {slot.slotName}：{slot.question}
          </h3>
        </div>
      </div>

      {/* Difficulty Mode 1: 🔥 基础 (提供直接可选答案) */}
      {task.difficulty === 1 && (
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-slatebrand-700">
            选择你喜欢的扩充内容填入方块：
          </span>
          <div className="flex flex-wrap gap-2.5">
            {slot.level1Options.map((opt) => {
              const isSelected = inputValue === opt.text;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.text)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all touch-manipulation min-h-[44px] flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-102'
                      : 'bg-paper hover:bg-amber-50 border-slatebrand-200 text-slatebrand-800 active:scale-95'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Difficulty Mode 2: 🔥🔥 进阶 (提供思考思路启发，非答案式) */}
      {task.difficulty === 2 && (
        <div className="flex flex-col gap-4">
          <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>思考思路启发（根据以下角度构思描写词）：</span>
            </div>
            
            <div className="flex flex-col gap-2">
              {slot.level2ThinkingAngles.map((ang, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-xs">
                  <span className="font-bold text-amber-900 shrink-0">
                    • {ang.angle}：
                  </span>
                  <span className="text-slatebrand-700 font-medium leading-relaxed">
                    {ang.clues}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slatebrand-800">
                根据以上思路，写出你的扩充内容：
              </span>
              {inputValue.length > 0 && (
                <button
                  onClick={() => handleInputChange('')}
                  className="text-xs text-slatebrand-400 hover:text-rose-500 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>清空</span>
                </button>
              )}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="在此输入你的词句，填入方块 [ ? ] ..."
              className="w-full px-4 py-3 bg-canvas/60 border-2 border-slatebrand-200 focus:border-amber-500 focus:bg-paper rounded-2xl text-sm md:text-base font-semibold text-slatebrand-900 focus:outline-none transition-all min-h-[48px]"
            />
          </div>
        </div>
      )}

      {/* Difficulty Mode 3: 🔥🔥🔥 挑战 (最小提示自主创作) */}
      {task.difficulty === 3 && (
        <div className="flex flex-col gap-3">
          <div className="bg-purple-50/40 border border-purple-200/70 rounded-2xl p-3.5 flex items-center gap-2 text-xs font-semibold text-purple-950">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{slot.level3Prompt}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slatebrand-800">
                我的扩充内容：
              </span>
              {inputValue.length > 0 && (
                <button
                  onClick={() => handleInputChange('')}
                  className="text-xs text-slatebrand-400 hover:text-rose-500 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>清空</span>
                </button>
              )}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="在此输入丰富的修辞或生动细节..."
              className="w-full px-4 py-3 bg-canvas/60 border-2 border-slatebrand-200 focus:border-purple-500 focus:bg-paper rounded-2xl text-sm md:text-base font-semibold text-slatebrand-900 focus:outline-none transition-all min-h-[48px]"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-2 border-t border-slatebrand-100">
        <button
          onClick={handleComplete}
          disabled={!inputValue.trim()}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-soft-sm transition-all touch-manipulation min-h-[46px] ${
            inputValue.trim()
              ? 'bg-sagebrand-600 hover:bg-sagebrand-700 text-white active:scale-95'
              : 'bg-slatebrand-200 text-slatebrand-400 cursor-not-allowed'
          }`}
        >
          <span>{isCompleted ? '已填入，下一步' : '填入该方块，下一步'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
