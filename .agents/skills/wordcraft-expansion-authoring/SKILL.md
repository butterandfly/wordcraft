---
name: wordcraft-expansion-authoring
description: >-
  WordCraft「扩写句子」纯文字任务创作者与标准化流水线。专用于为阿斯伯格/孤独症谱系（ASD Level 1）4-6年级儿童设计纯文字句式扩展任务。
  与看图写话不同，本流水线不依赖任何图片，而是从一个极简且结构完整的“最简骨干句子”出发，通过动态数量插槽（2~4个）进行“严格逐层递增”拉伸，并以“看着骨干默写长句”作为收束。支持3级难度阶梯设计（难度2为纯思路启发非答案式）、句式模板全流程自然完整性与 expansionTasks.ts 全自动装配。
---

# WordCraft 扩写句子任务创作标准规范 (Expansion Authoring Skill)

本 Skill 规范了为 **WordCraft（语块工坊）** 的 **「扩写句子」模块** 创建新学习任务的流程与强制质检标准。

> ⚠️ **与「看图写句子」Skill 的本质区别**：
> - **看图写话 Skill (`wordcraft-task-authoring`)**：依赖 **16:9 场景图片**，核心是“视觉知觉 $\rightarrow$ 要素提取 $\rightarrow$ 自主组句”；
> - **扩写句子 Skill (`wordcraft-expansion-authoring`)**：**100% 纯文字**，无图片。核心是“最简完整骨干 $\rightarrow$ 严格逐层递增拉伸 $\rightarrow$ 看着原始骨干默写扩展长句”。

---

## 🎯 核心特教认知准则与五大强制铁律 (Five Invariant Rules)

### 1. 严格逐层递增原则（Strict Progressive Layering Invariant）
- **骨干句必须是不可再拆分的“最简主谓宾”**（例如：`探测车采集矿石。`、`小女孩给向日葵浇水。`、`列车穿过了大桥。`）；
- **严禁在骨干中预先塞入后续插槽要扩充的词**（例如：骨干句绝不可写成 `探测车在火星上采集矿石。`，因为“在火星上”是 Step 2 要扩充的环境插槽）；
- **每一步必须在上一步的基础上原原本本地累加新插槽**：
  - **最简骨干**：`探测车采集矿石。`
  - **Step 1（累加主角定语）**：`[ ? ] 探测车采集矿石。` $\rightarrow$ 填入后：`[ 展开太阳能帆板的六轮 ] 探测车采集矿石。`
  - **Step 2（在 Step 1 基础上累加环境）**：`在 [ ? ] ， [ 展开太阳能帆板的六轮 ] 探测车采集矿石。` $\rightarrow$ 填入后：`在 [ 橙红色的落日余晖下 ] ， [ 展开太阳能帆板的六轮 ] 探测车采集矿石。`
  - **Step 3（在 Step 2 基础上累加动作道具）**：`在 [ 橙红色的落日余晖下 ] ， [ 展开太阳能帆板的六轮 ] 探测车 [ ? ] 采集矿石。`
  - **Step 4（默写）**：对照原始骨干 `探测车采集矿石。`，默写出上面层层递增后的完整长句。

### 2. 句式模板全流程自然完整（No Broken Sentences or Dangling Punctuation）
- 每一个步骤展示给学生的句子都必须是**语法通顺完整、无悬垂介词标点（如 ❌ `在 ，`）的自然句子**。

### 3. 难度 2 纯思路启发规范（Thinking Angles, NOT Ready-Made Answers）
- **难度 2（进阶）严禁提供答案式的词块选项**！
- 必须提供 **思考思路与维度点拨（`level2ThinkingAngles`）**（例如：`【结构与装备】：轮子数量、车顶太阳能帆板、天线...`），启发学生由点及面联想，并在输入框中自主组织词句。

### 4. 严禁字词重复（No Duplicate Words Invariant）
- **绝不允许插槽内容与外围模板文字出现重字**！
- ❌ 模板写 `在{slot}，`，插槽却填 `在阳光明媚的小院里`，导致出现 `在 在阳光明媚的小院里`；
- ✅ 模板写 `在{slot}，`，插槽内容严格填写 `阳光明媚的小院里`。

### 5. 动态插槽数量与纯问号方块（Dynamic `[ ? ]` Slot Focus）
- 支持 2 ~ 4 个插槽，每一步在句子中**仅显示 1 个呼吸高亮的 `[ ? ]` 问号方块**，无多余文字干扰。

---

## 🔥 3 级难度脚手架梯度 (3-Tier Scaffolding)

| 难度等级 | 标识 | 适用对象与脚手架设计 | 界面呈现形式 |
| :--- | :--- | :--- | :--- |
| **难度 1（基础起步）** | 🔥 | 刚开始接触句式扩展的学生；提供直接可选的答案卡片。 | 列出 3 个具象选项卡片（`level1Options`），一键点选填入 `[ ? ]` |
| **难度 2（进阶拓展 · 默认）** | 🔥🔥 | 掌握基础句型，训练多维度观察与词汇联想能力。 | **提供 2~3 个思考思路与启发线索（`level2ThinkingAngles`）**，学生在输入框自主输入 |
| **难度 3（挑战跃升）** | 🔥🔥🔥 | 语言组织能力较强，训练比喻修辞与高阶生动描写。 | 仅提供一句简要启发语（`level3Prompt`），学生完全自由创作 |

---

## 📐 数据结构规范 (`ExpansionTaskItem`)

```typescript
export interface ExpansionThinkingAngle {
  angle: string; // e.g. "【结构与装备】"
  clues: string; // e.g. "轮子数量（如：六轮）、车顶太阳能帆板、通信天线..."
}

export interface ExpansionSlot {
  slotId: string;
  slotIndex: number;
  slotName: string;
  targetWord: string;
  question: string;
  level1Options: { id: string; text: string }[];
  level2ThinkingAngles: ExpansionThinkingAngle[]; // 难度 2 思路启发
  level3Prompt: string;
  sampleFill: string;
}

export interface ExpansionTaskItem {
  id: string;
  title: string;
  theme: string;
  difficulty: 1 | 2 | 3;
  skeletonSentence: string; // 不可再拆分的最简骨干句，例如："探测车采集矿石。"
  sentenceTemplate: string; // 最终长句合成模板
  stepSentenceTemplates: string[]; // 严格逐层递增的每步句子模板
  slots: ExpansionSlot[]; // 支持 2 ~ 4 个插槽
  sampleCompleteSentence: string;
  handwriteTips: string[];
}
```

---

## 🔄 双阶段创作流水线与自检清单 (Checklist)

### 阶段 1：提案阶段 (Proposal Phase)
提供 3 个不同题材的最简骨干句，展示其逐层递增的扩写规划。

### 阶段 2：全量装配与质检 (Assembly & QA Phase)
写入 `src/data/expansionTasks.ts` 之前，**必须严格执行以下质检**：
- [ ] **逐层递增检查**：确认从最简骨干出发，Step 1 $\rightarrow$ Step 2 $\rightarrow$ Step 3 是严格在前一步基础上累加，骨干基底 100% 一致且无词语忽有忽无；
- [ ] **难度 2 思路检查**：确认难度 2 提供的是启发维度的思考线索（`level2ThinkingAngles`），而非现成答案；
- [ ] **重字检查**：逐字对比模板与插槽，确认无重复字词；
- [ ] **编译验证**：运行 `npm run build` 确保 100% 编译通过。
