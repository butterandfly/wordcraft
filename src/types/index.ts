export type TaskStepId = 'step1_basic' | 'step2_modifiers' | 'step3_complete' | 'step4_handwrite';

export interface WordOption {
  id: string;
  text: string;
  category: 'subject' | 'environment' | 'action' | 'modifier' | 'emotion' | 'connector';
  categoryLabel: string;
}

export interface TaskStepData {
  id: TaskStepId;
  title: string;
  shortName: string;
  description: string;
  guidingQuestion: string;
}

export interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  image: string;
  atmosphere: string;
  
  // Step 1: 基础要素 (只选不拼句)
  step1: {
    guidingQuestion: string;
    subjects: WordOption[];
    environments: WordOption[];
    actions: WordOption[];
    sampleAnswer: string;
  };

  // Step 2: 修饰要素 (逐题问答补充细节)
  step2: {
    guidingQuestion: string;
    targetItems: {
      id: string;
      questionTitle: string; // e.g. "1. 主角有什么神态或外貌？"
      title: string; // e.g. "主角神态/外貌"
      suggestedModifiers: WordOption[];
    }[];
    sampleFragments: string[];
  };

  // Step 3: 完整句子 (汇总素材盒，学生自主输入)
  step3: {
    guidingQuestion: string;
    connectorHints: WordOption[];
    sampleCompleteAnswer: string;
    checklist: string[];
  };

  // Step 4: 纸上默写与老师拍照存档
  step4: {
    handwriteTips: string[];
    paperFormat: string;
  };
}

export interface Step1Selections {
  who: string;
  where: string;
  action: string;
}

export interface Step2Selections {
  whoModifier: string;
  actionModifier: string;
  envModifier: string;
  customModifiers?: string[];
}

export interface TaskProgress {
  taskId: string;
  completedSteps: TaskStepId[];
  step1Selections?: Step1Selections;
  step1Sentence?: string; // for backward compatibility
  step2Selections?: Step2Selections;
  step2Fragments?: string[]; // for backward compatibility
  step3Sentence: string;
  step4Confirmed: boolean;
  step4ConfirmedAt?: number;
  lastUpdated: number;
}

export interface LearningModule {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  status: 'active' | 'upcoming';
  stageGrade: string;
  totalTasks: number;
}
