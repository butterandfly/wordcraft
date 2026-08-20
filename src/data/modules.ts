import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-sentence',
    title: '看图写句子',
    shortDesc: '一图一任务 · 4步 To-Do 进阶，从骨架到完整句子与纸上默写',
    iconName: 'Image',
    status: 'active',
    stageGrade: '小学 4-6 年级',
    totalTasks: 1
  },
  {
    id: 'module-paragraph',
    title: '看图写段落',
    shortDesc: '总分结构、时间与空间顺序连接成段（即将开放）',
    iconName: 'AlignLeft',
    status: 'upcoming',
    stageGrade: '小学 4-6 年级',
    totalTasks: 0
  },
  {
    id: 'module-essay',
    title: '看图成篇 · 作文工坊',
    shortDesc: '起承转合、三段式思维导图与完整篇章构建（即将开放）',
    iconName: 'BookOpenCheck',
    status: 'upcoming',
    stageGrade: '小学 4-6 年级',
    totalTasks: 0
  },
  {
    id: 'module-social',
    title: '情境社交表达',
    shortDesc: '视角转换、心智理论与情境对话表达（即将开放）',
    iconName: 'Users',
    status: 'upcoming',
    stageGrade: '小学 4-6 年级',
    totalTasks: 0
  }
];
