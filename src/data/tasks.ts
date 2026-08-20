import { TaskItem } from '../types';

export const SENTENCE_TASKS: TaskItem[] = [
  {
    id: 'task-ruin',
    title: '古老符文遗迹的秘密',
    subtitle: '像素沙盒冒险 · 遗迹探索',
    theme: '沙盒探险',
    difficulty: 2,
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
  },
  {
    id: 'task-mars',
    title: '火星红岩上的探路小车',
    subtitle: '深空科学探索 · 火星地表采样',
    theme: '科学探索',
    difficulty: 2,
    image: '/scenarios/mars.jpg',
    atmosphere: '壮阔、静谧、探索发现、橙红晚霞',
    step1: {
      guidingQuestion: '第 1 步：找出画面的三个基础要素（谁、在哪里、在做什么）',
      subjects: [
        { id: 'ms1-1', text: '火星探测车', category: 'subject', categoryLabel: '主角' },
        { id: 'ms1-2', text: '六轮探路小车', category: 'subject', categoryLabel: '主角' },
        { id: 'ms1-3', text: '智能机器人', category: 'subject', categoryLabel: '主角' }
      ],
      environments: [
        { id: 'ms1-4', text: '在火星赤红的戈壁上', category: 'environment', categoryLabel: '地点' },
        { id: 'ms1-5', text: '在巨大的环形山下', category: 'environment', categoryLabel: '地点' },
        { id: 'ms1-6', text: '在红色的火星地表', category: 'environment', categoryLabel: '地点' }
      ],
      actions: [
        { id: 'ms1-7', text: '扫描发光矿石', category: 'action', categoryLabel: '动作' },
        { id: 'ms1-8', text: '采集地质样本', category: 'action', categoryLabel: '动作' },
        { id: 'ms1-9', text: '探索未知地表', category: 'action', categoryLabel: '动作' }
      ],
      sampleAnswer: '火星探测车在火星赤红的戈壁上扫描发光矿石。'
    },
    step2: {
      guidingQuestion: '第 2 步：回答具体问题，为画面补充生动的修饰细节',
      targetItems: [
        {
          id: 'target-rover',
          questionTitle: '1. 探路小车的外观与车灯有什么特征？',
          title: '探测车外观/车灯',
          suggestedModifiers: [
            { id: 'msm-1', text: '闪烁着蓝色光芒的车灯', category: 'modifier', categoryLabel: '细节' },
            { id: 'msm-2', text: '展开平整的双翼太阳能帆板', category: 'modifier', categoryLabel: '外观' },
            { id: 'msm-3', text: '带有六个坚固车轮的探测车', category: 'modifier', categoryLabel: '结构' }
          ]
        },
        {
          id: 'target-arm',
          questionTitle: '2. 它伸出的机械手臂与扫描光束有什么细节？',
          title: '机械臂与光束细节',
          suggestedModifiers: [
            { id: 'msm-4', text: '灵活地伸出精巧的机械臂', category: 'action', categoryLabel: '动作' },
            { id: 'msm-5', text: '射出一道幽蓝色的扫描光束', category: 'action', categoryLabel: '光影' },
            { id: 'msm-6', text: '小心翼翼地对准晶体矿石', category: 'emotion', categoryLabel: '状态' }
          ]
        },
        {
          id: 'target-mars-env',
          questionTitle: '3. 发光的矿石与火星晚霞有什么景象？',
          title: '发光矿石与晚霞细节',
          suggestedModifiers: [
            { id: 'msm-7', text: '散发着橙蓝微光的神秘晶石', category: 'modifier', categoryLabel: '材质' },
            { id: 'msm-8', text: '温暖和煦的橙红色落日余晖', category: 'environment', categoryLabel: '光影' },
            { id: 'msm-9', text: '远处起伏沉睡的巨大环形山', category: 'environment', categoryLabel: '远景' }
          ]
        }
      ],
      sampleFragments: [
        '展开双翼太阳能帆板的六轮探测车',
        '灵活伸出精巧的机械臂并射出幽蓝扫描光束',
        '在橙红晚霞下仔细检测散发微光的神秘晶石'
      ]
    },
    step3: {
      guidingQuestion: '第 3 步：使用已选的语块，编写一句通顺完整的句子',
      connectorHints: [
        { id: 'msc-1', text: '在橙红色的火星晚霞下，', category: 'connector', categoryLabel: '时间环境' },
        { id: 'msc-2', text: '正灵活地……', category: 'connector', categoryLabel: '动作进行' },
        { id: 'msc-3', text: '试图揭开这颗红色星球的古老秘密。', category: 'connector', categoryLabel: '心愿收束' }
      ],
      sampleCompleteAnswer: '在橙红色的火星落日余晖下，展开双翼太阳能帆板的六轮探测车正灵活地伸出机械臂，用幽蓝色的扫描光束仔细检测着赤红戈壁上散发微光的神秘晶石。',
      checklist: [
        '是否生动地描绘了探测车与机械臂的动作？',
        '是否提到了发光晶石与火星落日晚霞？',
        '句子读起来是否通畅、充满科学探索感？'
      ]
    },
    step4: {
      handwriteTips: [
        '请拿出田字格练习本，工整书写这句描写火星探测车的句子。',
        '注意“探测车”、“机械臂”、“晶体矿石”等字词的笔画结构。',
        '写完后大声朗读一遍，请老师拍照存档。'
      ],
      paperFormat: '建议使用田字格本或标准横线本规范书写。'
    }
  },
  {
    id: 'task-sunflower',
    title: '阳光小院里浇花的小女孩',
    subtitle: '温暖日常生活 · 庭院植物浇灌',
    theme: '生活观察',
    difficulty: 1,
    image: '/scenarios/sunflower.jpg',
    atmosphere: '明媚、温馨、专注、阳光和煦',
    step1: {
      guidingQuestion: '第 1 步：找出画面的三个基础要素（谁、在哪里、在做什么）',
      subjects: [
        { id: 'sf1-1', text: '扎双马尾的小女孩', category: 'subject', categoryLabel: '主角' },
        { id: 'sf1-2', text: '小女孩', category: 'subject', categoryLabel: '主角' },
        { id: 'sf1-3', text: '小朋友', category: 'subject', categoryLabel: '主角' }
      ],
      environments: [
        { id: 'sf1-4', text: '在阳光明媚的小院里', category: 'environment', categoryLabel: '地点' },
        { id: 'sf1-5', text: '在盛开的花丛旁', category: 'environment', categoryLabel: '地点' },
        { id: 'sf1-6', text: '在向日葵旁边', category: 'environment', categoryLabel: '地点' }
      ],
      actions: [
        { id: 'sf1-7', text: '给向日葵浇水', category: 'action', categoryLabel: '动作' },
        { id: 'sf1-8', text: '提着小水壶浇花', category: 'action', categoryLabel: '动作' },
        { id: 'sf1-9', text: '细心照顾花朵', category: 'action', categoryLabel: '动作' }
      ],
      sampleAnswer: '扎双马尾的小女孩在阳光明媚的小院里给向日葵浇水。'
    },
    step2: {
      guidingQuestion: '第 2 步：回答具体问题，为画面补充生动的修饰细节',
      targetItems: [
        {
          id: 'target-girl',
          questionTitle: '1. 小女孩的外貌与神情是怎样的？',
          title: '小女孩外貌/神情',
          suggestedModifiers: [
            { id: 'sfm-1', text: '扎着可爱双马尾的小女孩', category: 'modifier', categoryLabel: '外貌' },
            { id: 'sfm-2', text: '认认真真地', category: 'emotion', categoryLabel: '神态' },
            { id: 'sfm-3', text: '身穿蓝色背带裙的', category: 'modifier', categoryLabel: '服饰' }
          ]
        },
        {
          id: 'target-pot',
          questionTitle: '2. 她手里提着的小水壶与浇水动作有什么特征？',
          title: '水壶与浇水动作',
          suggestedModifiers: [
            { id: 'sfm-4', text: '提着一把红色的小水壶', category: 'action', categoryLabel: '工具' },
            { id: 'sfm-5', text: '轻轻洒出细细的水流', category: 'action', categoryLabel: '动作' },
            { id: 'sfm-6', text: '小心地倾斜水壶', category: 'action', categoryLabel: '动作' }
          ]
        },
        {
          id: 'target-flower',
          questionTitle: '3. 金黄的向日葵与阳光有什么细节？',
          title: '向日葵与阳光细节',
          suggestedModifiers: [
            { id: 'sfm-7', text: '金黄色的向日葵高高盛开', category: 'modifier', categoryLabel: '特征' },
            { id: 'sfm-8', text: '水珠在阳光下闪闪发亮', category: 'modifier', categoryLabel: '光影' },
            { id: 'sfm-9', text: '温暖和煦的阳光洒满小院', category: 'environment', categoryLabel: '环境' }
          ]
        }
      ],
      sampleFragments: [
        '扎着双马尾的小女孩',
        '提着一把红色的小水壶轻轻洒水',
        '给阳光下金黄盛开的向日葵浇水'
      ]
    },
    step3: {
      guidingQuestion: '第 3 步：使用已选的语块，编写一句通顺完整的句子',
      connectorHints: [
        { id: 'sfc-1', text: '在阳光明媚的小院里，', category: 'connector', categoryLabel: '环境引出' },
        { id: 'sfc-2', text: '轻轻地……', category: 'connector', categoryLabel: '动作连接' },
        { id: 'sfc-3', text: '看着花朵在微风中轻轻摇曳。', category: 'connector', categoryLabel: '生动收束' }
      ],
      sampleCompleteAnswer: '在阳光明媚的小院里，扎着双马尾的小女孩提着红色的小水壶，认认真真地给盛开的金黄色向日葵浇水。',
      checklist: [
        '句子是否通顺、表达清楚？',
        '是否提到了红色小水壶和金黄向日葵？',
        '标点符号是否完整准确？'
      ]
    },
    step4: {
      handwriteTips: [
        '请在练习本上工整书写这句描写小院浇花的句子。',
        '注意“向日葵”、“水壶”、“盛开”等字词的写法。',
        '书写完成后，请老师拍照存档。'
      ],
      paperFormat: '建议使用田字格本或拼音田字格本规范书写。'
    }
  }
];
