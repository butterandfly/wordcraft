export type TaskStepId = 'step1_basic' | 'step2_modifiers' | 'step3_complete' | 'step4_handwrite' | string;

export type TaskDifficulty = 1 | 2 | 3;

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

// ----------------------------------------------------
// 看图写句子 模块类型 (Image-to-Sentence Module)
// ----------------------------------------------------
export interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  difficulty: TaskDifficulty;
  image: string;
  atmosphere: string;
  
  step1: {
    guidingQuestion: string;
    subjects: WordOption[];
    environments: WordOption[];
    actions: WordOption[];
    sampleAnswer: string;
  };

  step2: {
    guidingQuestion: string;
    targetItems: {
      id: string;
      questionTitle: string;
      title: string;
      suggestedModifiers: WordOption[];
    }[];
    sampleFragments: string[];
  };

  step3: {
    guidingQuestion: string;
    connectorHints: WordOption[];
    sampleCompleteAnswer: string;
    checklist: string[];
  };

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
  step1Sentence?: string;
  step2Selections?: Step2Selections;
  step2Fragments?: string[];
  step3Sentence: string;
  step4Confirmed: boolean;
  step4ConfirmedAt?: number;
  lastUpdated: number;
}

// ----------------------------------------------------
// 扩写句子 模块类型 (Pure-Text Sentence Expansion Module)
// ----------------------------------------------------
export interface ExpansionThinkingAngle {
  angle: string; // e.g. "【结构与装备】", "【颜色与指示灯】"
  clues: string; // e.g. "轮子数量、太阳能帆板、机械臂..." (思路点拨，非现成答案)
}

export interface ExpansionSlot {
  slotId: string;
  slotIndex: number; // 1, 2, 3, 4 ...
  slotName: string; // e.g. "主角修饰", "环境修饰", "动作修饰"
  targetWord: string; // e.g. "探测车"
  question: string; // e.g. "什么样的【探测车】？"
  
  // 难度 1：提供直接可选答案
  level1Options: { id: string; text: string }[];
  
  // 难度 2：提供思考思路与维度点拨（非答案式，启发思路）
  level2ThinkingAngles: ExpansionThinkingAngle[];
  
  // 难度 3：仅提供最基本的引导提示
  level3Prompt: string;

  sampleFill: string; // 范例填入
}

export interface ExpansionTaskItem {
  id: string;
  title: string;
  theme: string;
  difficulty: TaskDifficulty; // 1: 基础选答案, 2: 思路引导自主输入, 3: 最小提示独立创作
  skeletonSentence: string; // 必须是完整的原始骨干句子，e.g. "探测车在火星上采集矿石。"
  
  // 完整句式合成模板（使用 {slotId} 占位）
  sentenceTemplate: string;
  
  // 每一步呈现的自然完整句子模板（使用 {slot} 代表当前 [ ? ]，使用 {slotId} 代表已填入的前序插槽）
  // 确保每一步展示的都是一个语法完整、自然的句子！
  stepSentenceTemplates: string[];
  
  slots: ExpansionSlot[];
  sampleCompleteSentence: string;
  handwriteTips: string[];
}

export interface ExpansionProgress {
  taskId: string;
  completedSteps: TaskStepId[];
  slotAnswers: Record<string, string>; // slotId -> string
  finalSentence: string;
  isConfirmed: boolean;
  confirmedAt?: number;
  lastUpdated: number;
}

// ----------------------------------------------------
// 模块全局定义
// ----------------------------------------------------
export interface LearningModule {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  status: 'active' | 'upcoming';
  stageGrade: string;
  totalTasks: number;
}
