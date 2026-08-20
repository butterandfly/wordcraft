import { TaskItem } from '../types';

export const SENTENCE_TASKS: TaskItem[] = [
  {
    id: 'task-ruin',
    title: '古老符文遗迹的秘密',
    subtitle: '像素沙盒冒险 · 遗迹探索',
    theme: '沙盒探险',
    image: '/scenarios/ruin.jpg',
    atmosphere: '神秘、宁静、专注、清晨晨光',
    step1: {
      guidingQuestion: '第 1 步：找出画面的三个基础要素（谁、在哪里、在做什么）',
      subjects: [
        { id: 's1-1', text: '蓝衣探险家', category: 'subject', categoryLabel: '主角' },
        { id: 's1-2', text: '勇敢的少年', category: 'subject', categoryLabel: '主角' },
        { id: 's1-3', text: '小矿工', category: 'subject', categoryLabel: '主角' }
      ],
      environments: [
        { id: 's1-4', text: '在古老遗迹里', category: 'environment', categoryLabel: '地点' },
        { id: 's1-5', text: '在石拱门下', category: 'environment', categoryLabel: '地点' },
        { id: 's1-6', text: '在废墟深处', category: 'environment', categoryLabel: '地点' }
      ],
      actions: [
        { id: 's1-7', text: '观察石碑', category: 'action', categoryLabel: '动作' },
        { id: 's1-8', text: '辨认符文', category: 'action', categoryLabel: '动作' },
        { id: 's1-9', text: '寻找线索', category: 'action', categoryLabel: '动作' }
      ],
      sampleAnswer: '蓝衣探险家在古老遗迹里观察发光的石碑。'
    },
    step2: {
      guidingQuestion: '第 2 步：回答具体问题，为画面补充生动的修饰细节',
      targetItems: [
        {
          id: 'target-who',
          questionTitle: '1. 探险家是用怎样的神情和姿势在观察？',
          title: '探险家神态/外貌',
          suggestedModifiers: [
            { id: 'm-1', text: '全神贯注地', category: 'emotion', categoryLabel: '神态' },
            { id: 'm-2', text: '小心翼翼地', category: 'emotion', categoryLabel: '神态' },
            { id: 'm-3', text: '身穿蓝色外套的', category: 'modifier', categoryLabel: '外貌' },
            { id: 'm-4', text: '屏住呼吸', category: 'emotion', categoryLabel: '心理' }
          ]
        },
        {
          id: 'target-tool',
          questionTitle: '2. 他手里提着的晶石提灯发出了怎样的光？',
          title: '提灯与动作细节',
          suggestedModifiers: [
            { id: 'm-5', text: '手提发光的晶石提灯', category: 'action', categoryLabel: '工具' },
            { id: 'm-6', text: '散发着温暖的黄光', category: 'modifier', categoryLabel: '光影' },
            { id: 'm-7', text: '轻轻举起提灯照亮前方', category: 'action', categoryLabel: '动作' }
          ]
        },
        {
          id: 'target-env',
          questionTitle: '3. 古老石碑上的符文与阳光有什么细节？',
          title: '符文与光影细节',
          suggestedModifiers: [
            { id: 'm-8', text: '幽蓝发光的古代符文', category: 'modifier', categoryLabel: '细节' },
            { id: 'm-9', text: '爬满青苔的古老石碑', category: 'modifier', categoryLabel: '材质' },
            { id: 'm-10', text: '金色的晨光穿透石门', category: 'modifier', categoryLabel: '光影' }
          ]
        }
      ],
      sampleFragments: [
        '全神贯注的蓝衣探险家',
        '手提散发暖光的晶石提灯',
        '仔细辨认爬满青苔的幽蓝符文石碑'
      ]
    },
    step3: {
      guidingQuestion: '第 3 步：使用已选的语块，编写一句通顺完整的句子',
      connectorHints: [
        { id: 'c-1', text: '在……深处，', category: 'connector', categoryLabel: '地点引出' },
        { id: 'c-2', text: '清晨，', category: 'connector', categoryLabel: '时间' },
        { id: 'c-3', text: '一边……一边……', category: 'connector', categoryLabel: '关联词' },
        { id: 'c-4', text: '试图解开其中的秘密。', category: 'connector', categoryLabel: '句尾收束' }
      ],
      sampleCompleteAnswer: '清晨的金光穿透石拱门，全神贯注的蓝衣探险家手提发光的晶石提灯，在古老遗迹里仔细辨认着石碑上幽蓝色的神秘符文。',
      checklist: [
        '句子读起来是否通顺连贯？',
        '是否用上了 Step 2 中喜欢的修饰词（如：晶石提灯、幽蓝符文）？',
        '标点符号（逗号、句号）是否完整准确？'
      ]
    },
    step4: {
      handwriteTips: [
        '请拿出语文笔记本或田字格练习本。',
        '握笔坐姿端正，字迹工整，注意标点符号占一格。',
        '书写完成后，请老师拍照存档。'
      ],
      paperFormat: '建议使用田字格本或横线条格本工整书写。'
    }
  }
];
