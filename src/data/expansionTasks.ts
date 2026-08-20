import { ExpansionTaskItem } from '../types';

export const EXPANSION_TASKS: ExpansionTaskItem[] = [
  {
    id: 'exp-sunflower',
    title: '小女孩浇花',
    theme: '日常劳动',
    difficulty: 1,
    skeletonSentence: '小女孩给向日葵浇水。',
    sentenceTemplate: '在{slot-where}，{slot-who}小女孩{slot-action}给向日葵浇水。',
    stepSentenceTemplates: [
      '{slot}小女孩给向日葵浇水。',
      '在{slot}，{slot-who}小女孩给向日葵浇水。',
      '在{slot-where}，{slot-who}小女孩{slot}给向日葵浇水。'
    ],
    slots: [
      {
        slotId: 'slot-who',
        slotIndex: 1,
        slotName: '主角修饰',
        targetWord: '小女孩',
        question: '什么样的【小女孩】？',
        level1Options: [
          { id: 'o-1', text: '扎着双马尾的' },
          { id: 'o-2', text: '穿着蓝色背带裙的' },
          { id: 'o-3', text: '可爱的小' }
        ],
        level2ThinkingAngles: [
          { angle: '【发型与外貌】', clues: '梳着什么发型？脸蛋有什么特征？' },
          { angle: '【穿着颜色】', clues: '穿着什么衣服或裙子？戴着什么帽子？' }
        ],
        level3Prompt: '请用 1~2 个词简要修饰小女孩的外貌或穿着。',
        sampleFill: '扎着双马尾的'
      },
      {
        slotId: 'slot-where',
        slotIndex: 2,
        slotName: '环境修饰',
        targetWord: '小院里',
        question: '在怎样的【环境/地点】里？',
        level1Options: [
          { id: 'o-4', text: '阳光明媚的小院里' },
          { id: 'o-5', text: '盛开的花丛旁' },
          { id: 'o-6', text: '绿油油的草地上' }
        ],
        level2ThinkingAngles: [
          { angle: '【天气与光线】', clues: '今天天气如何？阳光和微风是怎样的？' },
          { angle: '【地点特征】', clues: '在花园里、草地上还是阳台旁？' }
        ],
        level3Prompt: '请描述小女孩所在的地点、天气或环境细节。',
        sampleFill: '阳光明媚的小院里'
      },
      {
        slotId: 'slot-action',
        slotIndex: 3,
        slotName: '动作与道具修饰',
        targetWord: '给向日葵浇水',
        question: '怎样地【给向日葵浇水】？用什么浇？',
        level1Options: [
          { id: 'o-7', text: '提着红色的小水壶，认认真真地' },
          { id: 'o-8', text: '小心翼翼地' },
          { id: 'o-9', text: '轻轻洒出细细的水流，' }
        ],
        level2ThinkingAngles: [
          { angle: '【手持工具】', clues: '手里拿着什么水壶？水壶是什么颜色的？' },
          { angle: '【动作神情】', clues: '浇水时是什么神态？水流是怎样洒出来的？' }
        ],
        level3Prompt: '请描述浇花时的动作、手持工具或神情。',
        sampleFill: '提着红色的小水壶，认认真真地'
      }
    ],
    sampleCompleteSentence: '在阳光明媚的小院里，扎着双马尾的小女孩提着红色的小水壶，认认真真地给向日葵浇水。',
    handwriteTips: [
      '在练习本上，看着原句【小女孩给向日葵浇水。】默写出刚才扩展的长句。',
      '注意字迹工整，标点符号占一格。',
      '写完后请老师拍照打卡。'
    ]
  },
  {
    id: 'exp-sailboat',
    title: '小帆船驶向远方',
    theme: '海洋探索',
    difficulty: 2,
    skeletonSentence: '小帆船驶向远方。',
    sentenceTemplate: '在{slot-sea}，{slot-boat}小帆船{slot-sail-action}驶向远方。',
    stepSentenceTemplates: [
      '{slot}小帆船驶向远方。',
      '在{slot}，{slot-boat}小帆船驶向远方。',
      '在{slot-sea}，{slot-boat}小帆船{slot}驶向远方。'
    ],
    slots: [
      {
        slotId: 'slot-boat',
        slotIndex: 1,
        slotName: '主角修饰',
        targetWord: '小帆船',
        question: '什么样的【小帆船】？',
        level1Options: [
          { id: 'b-1', text: '扬着洁白三角帆的' },
          { id: 'b-2', text: '蓝白相间的小巧' },
          { id: 'b-3', text: '轻巧灵活的木质' }
        ],
        level2ThinkingAngles: [
          { angle: '【风帆与船体】', clues: '风帆的形状与颜色（如：洁白三角帆/鲜艳风帆）、船体材质（木质/轻巧）...' },
          { angle: '【色彩与外貌】', clues: '蓝白相间、红白相间、油漆发亮...' }
        ],
        level3Prompt: '请从风帆形状、颜色或船体特点修饰小帆船。',
        sampleFill: '扬着洁白三角帆的'
      },
      {
        slotId: 'slot-sea',
        slotIndex: 2,
        slotName: '环境与天气修饰',
        targetWord: '大海环境',
        question: '在怎样的【海面/天气】下？',
        level1Options: [
          { id: 'b-4', text: '波光粼粼的蔚蓝海面上' },
          { id: 'b-5', text: '金灿灿的晨曦霞光中' },
          { id: 'b-6', text: '微风轻拂的平静海湾里' }
        ],
        level2ThinkingAngles: [
          { angle: '【海面光影】', clues: '波光粼粼的蔚蓝海面、碧波荡漾、霞光洒在水面...' },
          { angle: '【天气与风浪】', clues: '和煦微风、清晨日光、平静海湾...' }
        ],
        level3Prompt: '请描述海面的色彩、光影或天气风浪细节。',
        sampleFill: '波光粼粼的蔚蓝海面上'
      },
      {
        slotId: 'slot-sail-action',
        slotIndex: 3,
        slotName: '动作与姿态修饰',
        targetWord: '驶向远方',
        question: '怎样地【驶向远方】？有怎样的航行姿态或水花？',
        level1Options: [
          { id: 'b-7', text: '迎着微风破开层层浪花，轻快地' },
          { id: 'b-8', text: '平稳而坚定地' },
          { id: 'b-9', text: '伴着欢快的浪花声，慢慢地' }
        ],
        level2ThinkingAngles: [
          { angle: '【航行姿态】', clues: '破开白色浪花、迎着和煦海风、船头起伏...' },
          { angle: '【速度与感觉】', clues: '轻快地、平稳坚定地、自由自在地...' }
        ],
        level3Prompt: '请使用动词和生动细节描绘小船航行时的姿态与水花。',
        sampleFill: '迎着微风破开层层浪花，轻快地'
      }
    ],
    sampleCompleteSentence: '在波光粼粼的蔚蓝海面上，扬着洁白三角帆的小帆船迎着微风破开层层浪花，轻快地驶向远方。',
    handwriteTips: [
      '看着原句【小帆船驶向远方。】，在练习纸上默写出刚才丰富的海洋探索长句。',
      '注意“帆船”、“波光粼粼”、“浪花”等词语的书写。',
      '写完后大声朗读一遍，请老师拍照存档。'
    ]
  },
  {
    id: 'exp-train',
    title: '列车穿过大桥',
    theme: '机械交通',
    difficulty: 3,
    skeletonSentence: '列车穿过了大桥。',
    sentenceTemplate: '在{slot-bridge-env}，{slot-train}列车{slot-speed-action}穿过了大桥。',
    stepSentenceTemplates: [
      '{slot}列车穿过了大桥。',
      '在{slot}，{slot-train}列车穿过了大桥。',
      '在{slot-bridge-env}，{slot-train}列车{slot}穿过了大桥。'
    ],
    slots: [
      {
        slotId: 'slot-train',
        slotIndex: 1,
        slotName: '主角修饰',
        targetWord: '列车',
        question: '什么样的【列车】？（外貌/速度/气势）',
        level1Options: [
          { id: 't-1', text: '一列银白色的流线型高铁' },
          { id: 't-2', text: '呼啸飞驰的现代化' },
          { id: 't-3', text: '满载旅客的红色' }
        ],
        level2ThinkingAngles: [
          { angle: '【外貌色彩】', clues: '流线型车身、银白色/中国红、车窗明亮...' },
          { angle: '【气势比喻】', clues: '如银色长龙、像离弦之箭...' }
        ],
        level3Prompt: '请使用生动的形容词或比喻（如颜色、速度、气势）修饰列车。',
        sampleFill: '一列银白色的流线型高铁'
      },
      {
        slotId: 'slot-bridge-env',
        slotIndex: 2,
        slotName: '环境与大桥修饰',
        targetWord: '大桥',
        question: '在怎样的【天气/江面】下？',
        level1Options: [
          { id: 't-4', text: '晨光照耀下，横跨宽阔江面的宏伟钢铁大桥上' },
          { id: 't-5', text: '烟雨朦胧中，雄伟的跨江斜拉桥上' },
          { id: 't-6', text: '夕阳的照耀下，高高耸立的红色悬索桥上' }
        ],
        level2ThinkingAngles: [
          { angle: '【大桥结构】', clues: '钢铁大桥、跨江斜拉桥、高耸的桥塔...' },
          { angle: '【江面与天气】', clues: '波光粼粼的江面、晨光洒在水上、薄雾朦胧...' }
        ],
        level3Prompt: '请描述大桥的雄伟结构，以及周围江面、天气或光影的景象。',
        sampleFill: '晨光照耀下，横跨宽阔江面的宏伟钢铁大桥上'
      },
      {
        slotId: 'slot-speed-action',
        slotIndex: 3,
        slotName: '动作声光与气势细节',
        targetWord: '穿过大桥',
        question: '怎样地【穿过了大桥】？伴随什么声音或气势？',
        level1Options: [
          { id: 't-7', text: '伴着清脆的鸣笛声，如离弦之箭般风驰电掣地' },
          { id: 't-8', text: '平稳而迅速地呼啸着' },
          { id: 't-9', text: '如一道银色闪电般飞快地' }
        ],
        level2ThinkingAngles: [
          { angle: '【声音拟声】', clues: '清脆鸣笛、呼啸而过、轰鸣奔驰...' },
          { angle: '【速度比喻】', clues: '如离弦之箭、风驰电掣、一道银色闪电...' }
        ],
        level3Prompt: '请使用动词、拟声词或比喻描绘列车穿过大桥时的声势与速度。',
        sampleFill: '伴着清脆的鸣笛声，如离弦之箭般风驰电掣地'
      }
    ],
    sampleCompleteSentence: '在晨光照耀下，横跨宽阔江面的宏伟钢铁大桥上一列银白色的流线型高铁列车伴着清脆的鸣笛声，如离弦之箭般风驰电掣地穿过了大桥。',
    handwriteTips: [
      '看着原始骨干【列车穿过了大桥。】，在练习纸上默写出刚才气势恢宏的扩写句子。',
      '注意“高铁”、“流线型”、“风驰电掣”、“宏伟”等字词的笔画结构。',
      '写完后大声朗读一遍，请老师拍照存档。'
    ]
  }
];
