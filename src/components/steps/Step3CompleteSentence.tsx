import React, { useState, useEffect } from 'react';
import { TaskItem, Step1Selections, Step2Selections } from '../../types';
import { Check, Volume2, BookMarked, Wand2, Trash2, Box, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speechSynth } from '../../utils/speech';

interface Step3Props {
  task: TaskItem;
  step1Selections?: Step1Selections;
  step2Selections?: Step2Selections;
  sentenceValue: string;
  onSentenceChange: (text: string) => void;
  isCompleted: boolean;
  onCompleteStep: (sentence: string) => void;
}

export const Step3CompleteSentence: React.FC<Step3Props> = ({
  task,
  step1Selections,
  step2Selections,
  sentenceValue,
  onSentenceChange,
  isCompleted,
  onCompleteStep
}) => {
  const [showSample, setShowSample] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const { step3 } = task;

  useEffect(() => {
    const unsub = speechSynth.subscribe((speaking) => setIsSpeaking(speaking));
    return () => unsub();
  }, []);

  const handleAppendWord = (text: string) => {
    soundFx.playBlockClick();
    const trimmed = sentenceValue.trim();
    if (!trimmed) {
      onSentenceChange(text);
    } else {
      onSentenceChange(trimmed + text);
    }
  };

  const handleAutoAssemble = () => {
    soundFx.playBlockClick();
    const who = step1Selections?.who || task.step1.subjects[0].text;
    const where = step1Selections?.where || task.step1.environments[0].text;
    const action = step1Selections?.action || task.step1.actions[0].text;

    const whoMod = step2Selections?.whoModifier;
    const actionMod = step2Selections?.actionModifier;
    const envMod = step2Selections?.envModifier;

    // Smart compose template: [环境修饰 + 地点]，[主角修饰 + 主角] [动作修饰]，[核心动作]。
    const parts: string[] = [];
    if (envMod) parts.push(envMod);
    if (where) parts.push(where);
    if (whoMod) parts.push(whoMod);
    if (who) parts.push(who);
    if (actionMod) parts.push(actionMod);
    if (action) parts.push(action);

    const assembled = parts.join('，') + '。';
    onSentenceChange(assembled);
  };

  const handleRead = () => {
    if (!sentenceValue.trim()) return;
    soundFx.playBlockClick();
    speechSynth.speak(sentenceValue.trim());
  };

  const handleUseSample = () => {
    soundFx.playBlockClick();
    onSentenceChange(step3.sampleCompleteAnswer);
  };

  const handleComplete = () => {
    if (!sentenceValue.trim()) return;
    soundFx.playSuccessChime();
    onCompleteStep(sentenceValue.trim());
  };

  return (
    <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-md flex flex-col gap-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-md">
            第 3 步
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900 mt-1">
            完整句子：组合素材，写出完整通顺的句子
          </h3>
        </div>

        <button
          onClick={() => setShowSample(!showSample)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slatebrand-50 hover:bg-slatebrand-100 border border-slatebrand-200 text-slatebrand-600 text-xs font-semibold transition-all"
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>{showSample ? '收起范例' : '范例'}</span>
        </button>
      </div>

      {/* 我的语块素材盒 (Collected Word Blocks Toolbox) */}
      <div className="bg-slatebrand-50/70 border border-slatebrand-200/80 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slatebrand-800 flex items-center gap-1.5">
            <Box className="w-4 h-4 text-blue-600" />
            我的语块素材盒（点击可直接插入句子）：
          </span>
          <button
            onClick={handleAutoAssemble}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>智能初拼入框</span>
          </button>
        </div>

        {/* Basic & Modifiers Chips */}
        <div className="flex flex-col gap-2">
          {/* 基础要素 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slatebrand-500 shrink-0">
              基础要素：
            </span>
            {step1Selections?.who && (
              <button
                onClick={() => handleAppendWord(step1Selections.who)}
                className="px-2.5 py-1 rounded-xl bg-blue-100 hover:bg-blue-200 border border-blue-200 text-blue-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step1Selections.who}
              </button>
            )}
            {step1Selections?.where && (
              <button
                onClick={() => handleAppendWord(step1Selections.where)}
                className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 text-emerald-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step1Selections.where}
              </button>
            )}
            {step1Selections?.action && (
              <button
                onClick={() => handleAppendWord(step1Selections.action)}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step1Selections.action}
              </button>
            )}
          </div>

          {/* 修饰要素 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slatebrand-500 shrink-0">
              修饰要素：
            </span>
            {step2Selections?.whoModifier && (
              <button
                onClick={() => handleAppendWord(step2Selections.whoModifier)}
                className="px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-200 text-purple-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step2Selections.whoModifier}
              </button>
            )}
            {step2Selections?.actionModifier && (
              <button
                onClick={() => handleAppendWord(step2Selections.actionModifier)}
                className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step2Selections.actionModifier}
              </button>
            )}
            {step2Selections?.envModifier && (
              <button
                onClick={() => handleAppendWord(step2Selections.envModifier)}
                className="px-2.5 py-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 border border-emerald-200 text-emerald-950 text-xs font-bold shadow-sm transition-all"
              >
                + {step2Selections.envModifier}
              </button>
            )}
          </div>

          {/* 常用连接词 */}
          <div className="pt-2 border-t border-slatebrand-200/50 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-slatebrand-500 shrink-0">
              常用连接词：
            </span>
            {step3.connectorHints.map((c) => (
              <button
                key={c.id}
                onClick={() => handleAppendWord(c.text)}
                className="px-2 py-0.5 rounded-lg bg-paper hover:bg-slatebrand-100 border border-slatebrand-200 text-slatebrand-700 text-xs font-semibold shadow-sm transition-all"
              >
                + {c.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 完整句子编写框 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slatebrand-800">
            我的完整句子（点击上方素材或自由输入）：
          </span>
          <div className="flex items-center gap-2">
            {sentenceValue.length > 0 && (
              <button
                onClick={() => onSentenceChange('')}
                className="text-xs text-slatebrand-400 hover:text-rose-500 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          value={sentenceValue}
          onChange={(e) => onSentenceChange(e.target.value)}
          placeholder="在此把上面的语块连成完整通顺的句子，例如加入时间、地点与动作描写..."
          rows={3}
          data-selectable="true"
          className="w-full p-3.5 bg-canvas/60 border-2 border-slatebrand-200 focus:border-slatebrand-500 focus:bg-paper rounded-2xl text-sm md:text-base font-semibold text-slatebrand-900 focus:outline-none transition-all placeholder:text-slatebrand-300 leading-relaxed resize-none"
        />

        {/* TTS 朗读与字数 */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleRead}
            disabled={!sentenceValue.trim()}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all touch-manipulation min-h-[38px] ${
              sentenceValue.trim()
                ? isSpeaking
                  ? 'bg-blue-600 text-white border-blue-700 animate-pulse'
                  : 'bg-paper hover:bg-slatebrand-50 border-slatebrand-200 text-slatebrand-700 shadow-sm'
                : 'bg-slatebrand-50 border-slatebrand-100 text-slatebrand-300 cursor-not-allowed'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? '朗读中...' : '朗读句子'}</span>
          </button>

          <span className="text-[11px] font-mono text-slatebrand-400">
            {sentenceValue.length} 字
          </span>
        </div>
      </div>

      {/* 范例框 */}
      {showSample && (
        <div className="bg-slatebrand-50 border border-slatebrand-200 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs animate-fadeIn">
          <span className="text-slatebrand-800 font-medium">
            范例：{step3.sampleCompleteAnswer}
          </span>
          <button
            onClick={handleUseSample}
            className="px-2.5 py-1 rounded-lg bg-paper hover:bg-slatebrand-100 border border-slatebrand-300 font-bold text-slatebrand-700 shrink-0"
          >
            填入
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-1">
        <button
          onClick={handleComplete}
          disabled={!sentenceValue.trim()}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-soft-sm transition-all touch-manipulation min-h-[46px] ${
            sentenceValue.trim()
              ? 'bg-sagebrand-600 hover:bg-sagebrand-700 text-white active:scale-95'
              : 'bg-slatebrand-200 text-slatebrand-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isCompleted ? '已保存，下一步：纸上默写' : '完成句子，去纸上默写'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
