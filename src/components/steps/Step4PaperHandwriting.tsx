import React from 'react';
import { TaskItem } from '../../types';
import {
  Camera,
  PenTool,
  Volume2,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { speechSynth } from '../../utils/speech';

interface Step4Props {
  task: TaskItem;
  step3Sentence: string;
  isConfirmed: boolean;
  confirmedAt?: number;
  onConfirmPaperDone: () => void;
  onBackToTasks: () => void;
}

export const Step4PaperHandwriting: React.FC<Step4Props> = ({
  task,
  step3Sentence,
  isConfirmed,
  confirmedAt,
  onConfirmPaperDone,
  onBackToTasks
}) => {
  const sentenceToCopy = step3Sentence.trim() || task.step3.sampleCompleteAnswer;

  const handleRead = () => {
    soundFx.playBlockClick();
    speechSynth.speak(sentenceToCopy);
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
      {/* Action Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slatebrand-100 pb-3">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
            第 4 步
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slatebrand-900 mt-1">
            行动：在纸上默写这句话
          </h3>
        </div>

        <button
          onClick={handleRead}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slatebrand-50 hover:bg-slatebrand-100 border border-slatebrand-200 text-slatebrand-700 text-xs font-semibold transition-all"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>朗读范句</span>
        </button>
      </div>

      {/* Handwriting Card */}
      <div className="bg-canvas/80 border-2 border-dashed border-slatebrand-300 rounded-3xl p-5 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slatebrand-600">
          <PenTool className="w-4 h-4 text-emerald-600" />
          <span>纸面书写内容：</span>
        </div>

        <div className="bg-paper rounded-2xl p-4 sm:p-5 border border-slatebrand-200 shadow-inner font-serif text-base sm:text-lg text-slatebrand-900 leading-loose tracking-wide select-all">
          {sentenceToCopy}
        </div>
      </div>

      {/* Confirmation Area */}
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
              💮 任务已存档通关
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
