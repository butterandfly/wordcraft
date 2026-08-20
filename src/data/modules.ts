import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module-sentence',
    title: '看图写句子',
    shortDesc: '视觉观察 · 4步递进，从骨架到修饰与纸上默写',
    iconName: 'Image',
    status: 'active',
    stageGrade: '小学 4-6 年级',
    totalTasks: 3
  },
  {
    id: 'module-expansion',
    title: '扩写句子',
    shortDesc: '纯文字骨干出发 · 逐个插槽拉伸扩展 · 默写还原长句',
    iconName: 'Sparkles',
    status: 'active',
    stageGrade: '小学 4-6 年级',
    totalTasks: 3
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
  }
];
