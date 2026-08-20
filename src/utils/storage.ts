import { TaskProgress, TaskStepId } from '../types';

const STORAGE_KEY_PROGRESS = 'wordcraft_tasks_progress_v2';
const STORAGE_KEY_SOUND = 'wordcraft_sound_enabled';

export class TaskStorageManager {
  // Get all task progresses
  public static getAllProgress(): Record<string, TaskProgress> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  // Get progress for a single task
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

  // Save/Update progress for a single task
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

  // Mark a step as completed
  public static markStepCompleted(taskId: string, stepId: TaskStepId, data?: Partial<TaskProgress>): TaskProgress {
    const progress = this.getTaskProgress(taskId);
    if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
    }
    if (stepId === 'step4_handwrite') {
      progress.step4Confirmed = true;
      progress.step4ConfirmedAt = Date.now();
    }
    if (data) {
      Object.assign(progress, data);
    }
    this.saveTaskProgress(progress);
    return progress;
  }

  // Unmark a step
  public static unmarkStep(taskId: string, stepId: TaskStepId): TaskProgress {
    const progress = this.getTaskProgress(taskId);
    progress.completedSteps = progress.completedSteps.filter((s) => s !== stepId);
    if (stepId === 'step4_handwrite') {
      progress.step4Confirmed = false;
      delete progress.step4ConfirmedAt;
    }
    this.saveTaskProgress(progress);
    return progress;
  }

  // Get sound settings
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
