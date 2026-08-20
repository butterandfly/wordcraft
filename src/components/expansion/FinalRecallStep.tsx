import React, { useState } from 'react';
import { ExpansionTaskItem } from '../../types';
import { Eye, EyeOff, Volume2, Camera, Trophy, ArrowLeft, PenTool, Sparkles, BookOpen } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speechSynth } from '../../utils/speech';

interface FinalRecallStepProps {
  task: ExpansionTaskItem;
  finalSentence: string;
  isConfirmed: boolean;
  confirmedAt?: number;
  onConfirmPaperDone: () => void;
  onBackToTasks: () => void;
}

export const FinalRecallStep: React.FC<FinalRecallStepProps> = ({
  task,
  finalSentence,
  isConfirmed,
  confirmedAt,
  onConfirmPaperDone,
  onBackToTasks
}) => {
  const [showStudentSentence, setShowStudentSentence] = useState<boolean>(false);
  const [showSampleSentence, setShowSampleSentence] = useState<boolean>(false);

  const studentSentenceText = finalSentence.trim() || task.sampleCompleteSentence;

  const handleRead = (text: string) => {
    soundFx.playBlockClick();
    speechSynth.speak(text);
  };

  const handleConfirm = () => {
    soundFx.playSuccessChime();
    onConfirmPaperDone();
  };

  const formattedDate = confirmedAt
    ? new Date(confirmedAt).toLocaleDateString('zh-CN', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  return (
    <div className="bg-paper rounded-3xl p-5 sm:p-6 border border-slatebrand-200/80 shadow-soft-md flex flex-col gap-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
            默写收束
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900 mt-1">
            骨干默写：看着骨干短句，在纸上默写出扩写句
          </h3>
        </div>

        {/* 顶部辅助按钮组：查看扩展句子 + 查看例句 */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 按钮 1：查看扩展句子（学生自己写的） */}
          <button
            onClick={() => {
              soundFx.playBlockClick();
              setShowStudentSentence(!showStudentSentence);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              showStudentSentence
                ? 'bg-amber-600 text-white border-amber-700'
                : 'bg-amber-50 hover:bg-amber-100/80 text-amber-900 border-amber-200/80'
            }`}
          >
            {showStudentSentence ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showStudentSentence ? '隐藏扩展句子' : '查看扩展句子'}</span>
          </button>

          {/* 按钮 2：查看例句（标准参考） */}
          <button
            onClick={() => {
              soundFx.playBlockClick();
              setShowSampleSentence(!showSampleSentence);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              showSampleSentence
                ? 'bg-sagebrand-600 text-white border-sagebrand-700'
                : 'bg-sagebrand-50 hover:bg-sagebrand-100/80 text-sagebrand-900 border-sagebrand-200/80'
            }`}
          >
            {showSampleSentence ? <EyeOff className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            <span>{showSampleSentence ? '隐藏例句' : '查看例句'}</span>
          </button>
        </div>
      </div>

      {/* 原始骨干句子卡片 (作为核心默写提示) */}
      <div className="bg-amber-50/50 border-2 border-amber-300/80 rounded-3xl p-5 flex flex-col gap-2 shadow-inner">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>原始骨干短句（请根据骨干，在练习本上默写出扩展后的完整长句）：</span>
        </div>
        <div className="text-lg sm:text-xl font-bold text-slatebrand-900 font-serif tracking-wide py-1">
          {task.skeletonSentence}
        </div>
      </div>

      {/* 卡片 1：学生自己扩展的句子（点击“查看扩展句子”展开） */}
      {showStudentSentence && (
        <div className="bg-amber-50/60 border-2 border-dashed border-amber-300 rounded-3xl p-4 sm:p-5 flex flex-col gap-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
              <PenTool className="w-4 h-4 text-amber-700" />
              <span>你刚才扩展的句子：</span>
            </div>
            <button
              onClick={() => handleRead(studentSentenceText)}
              className="flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-bold bg-paper/80 px-2 py-0.5 rounded-lg border border-amber-200"
            >
              <Volume2 className="w-3 h-3" />
              <span>朗读</span>
            </button>
          </div>
          <div className="font-serif text-base sm:text-lg text-slatebrand-900 leading-relaxed font-semibold">
            {studentSentenceText}
          </div>
        </div>
      )}

      {/* 卡片 2：标准参考例句（点击“查看例句”展开） */}
      {showSampleSentence && (
        <div className="bg-sagebrand-50/60 border-2 border-dashed border-sagebrand-300 rounded-3xl p-4 sm:p-5 flex flex-col gap-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sagebrand-900">
              <BookOpen className="w-4 h-4 text-sagebrand-700" />
              <span>标准参考例句：</span>
            </div>
            <button
              onClick={() => handleRead(task.sampleCompleteSentence)}
              className="flex items-center gap-1 text-xs text-sagebrand-800 hover:text-sagebrand-950 font-bold bg-paper/80 px-2 py-0.5 rounded-lg border border-sagebrand-200"
            >
              <Volume2 className="w-3 h-3" />
              <span>朗读</span>
            </button>
          </div>
          <div className="font-serif text-base sm:text-lg text-slatebrand-900 leading-relaxed font-semibold">
            {task.sampleCompleteSentence}
          </div>
        </div>
      )}

      {/* 确认打卡区域 */}
      {!isConfirmed ? (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-emerald-950 font-medium">
            学生在纸上默写完成后，请老师拍照留存，并点击确认：
          </span>

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all touch-manipulation min-h-[46px] whitespace-nowrap flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>老师已拍照存档</span>
          </button>
        </div>
      ) : (
        /* Confirmed State */
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-5 flex flex-col items-center text-center gap-3.5 animate-fadeIn shadow-soft-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounce">
            <Trophy className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              💮 扩写任务已通关
            </span>
            <h4 className="text-base font-bold text-slatebrand-900 mt-1.5">
              已完成《{task.title}》全流程
            </h4>
            <p className="text-[11px] text-slatebrand-400 mt-0.5">
              存档时间：{formattedDate}
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playBlockClick();
              onBackToTasks();
            }}
            className="px-5 py-2.5 rounded-2xl bg-slatebrand-800 hover:bg-slatebrand-900 text-white font-bold text-xs flex items-center gap-2 shadow-soft-sm touch-manipulation min-h-[42px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回任务列表</span>
          </button>
        </div>
      )}
    </div>
  );
};
