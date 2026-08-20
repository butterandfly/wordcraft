import { TaskProgress, ExpansionProgress } from '../types';

const STORAGE_KEY_PROGRESS = 'wordcraft_tasks_progress_v2';
const STORAGE_KEY_EXPANSION_PROGRESS = 'wordcraft_expansion_progress_v1';
const STORAGE_KEY_SOUND = 'wordcraft_sound_enabled';

export class TaskStorageManager {
  // ----------------------------------------------------
  // 看图写句子 进度管理
  // ----------------------------------------------------
  public static getAllProgress(): Record<string, TaskProgress> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  public static getTaskProgress(taskId: string): TaskProgress {
    const all = this.getAllProgress();
    if (all[taskId]) {
      return all[taskId];
    }
    return {
      taskId,
      completedSteps: [],
      step1Sentence: '',
      step2Fragments: [],
      step3Sentence: '',
      step4Confirmed: false,
      lastUpdated: Date.now()
    };
  }

  public static saveTaskProgress(progress: TaskProgress): void {
    try {
      const all = this.getAllProgress();
      all[progress.taskId] = {
        ...progress,
        lastUpdated: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save task progress', e);
    }
  }

  // ----------------------------------------------------
  // 扩写句子 进度管理
  // ----------------------------------------------------
  public static getAllExpansionProgress(): Record<string, ExpansionProgress> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_EXPANSION_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  public static getExpansionProgress(taskId: string): ExpansionProgress {
    const all = this.getAllExpansionProgress();
    if (all[taskId]) {
      return all[taskId];
    }
    return {
      taskId,
      completedSteps: [],
      slotAnswers: {},
      finalSentence: '',
      isConfirmed: false,
      lastUpdated: Date.now()
    };
  }

  public static saveExpansionProgress(progress: ExpansionProgress): void {
    try {
      const all = this.getAllExpansionProgress();
      all[progress.taskId] = {
        ...progress,
        lastUpdated: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_EXPANSION_PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save expansion task progress', e);
    }
  }

  // ----------------------------------------------------
  // 音效设置
  // ----------------------------------------------------
  public static getSoundEnabled(): boolean {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SOUND);
      return raw !== null ? raw === 'true' : true;
    } catch {
      return true;
    }
  }

  public static setSoundEnabled(enabled: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, enabled.toString());
    } catch {
      // Ignore
    }
  }
}
