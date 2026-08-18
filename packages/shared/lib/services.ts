export const SERVICE_IMAGES = {
  number: "/images/svc-number.png",
  name: "/images/name-ink-h.jpg",
  tarot: "/images/tarot-im2.png",
  eastern: "/images/eastern-hero.webp",
  numberGallery: ["/images/number-gallery-1.jpg", "/images/number-gallery-2.jpg"],
  nameGallery: ["/images/results-2.avif", "/images/name-ink-v.jpg"],
  tarotGallery: [
    "/images/tarot-wix.png",
    "/images/tarot-im4.png",
    "/images/tarot-im5.png",
  ],
};

export const GUIDE_ITEMS = [
  { href: "/number", title: "数字生命", img: "/images/svc-number.png" },
  { href: "/name", title: "姓名学", img: "/images/svc-name.png" },
  { href: "/tarot", title: "塔罗牌", img: "/images/svc-tarot.png" },
  {
    href: "/eastern-divination",
    title: "东方占卜术",
    img: "/images/svc-eastern-alt.webp",
  },
] as const;

/** Demo “点我测算” goes to /sign-up; this site’s real equivalent is KCC /login. */
const SERVICE_CTA_HREF = "/login";

export const SERVICE_PAGES = {
  number: {
    title: "数字生命",
    tagline: "「数字定格，生命解码」",
    introTitle: "数字生命",
    intro:
      "数字生命是基于《易经》与东方命理的智慧系统，通过出生日期与姓名的数字\n转化，解析一个人的性格、潜能、天赋与人生节奏。它结合传统天人合一的理\n念与现代数据建模，将复杂的命理信息数字化、结构化、可视化，帮助你更清\n晰地理解自己与命运的关系。",
    ideaTitle: "数易赋能所赋予的理念",
    idea:
      "我们相信，生命是可以被数字映照的。《易经》讲“数生万物”，古人以阴阳五\n行推演宇宙运行与人生命运；而现代科学也发现，自然界无不遵循着数字规律\n ——从斐波那契序列到黄金比例 1.618，从 DNA 的螺旋角度到星系的旋转轨\n迹，宇宙本质是数字与模式的共舞。我们称之为：数字生命。在我们看来，出\n生的那一刻、名字的字数、笔画、组合……每一个数字，都是你人生剧本中的\n密码。它不是命运绝对定义，而是你性格模式、行为偏好、能量走向的一种投\n射方式。通过数字的解读，我们得以看清自身优势、盲区与时机，从而活出更\n有节奏感与方向感的人生。数字不是冷冰冰的计算，它们是生命的语言，是跨\n越古今中外的智慧坐标。",
    image: SERVICE_IMAGES.number,
    ctaHref: SERVICE_CTA_HREF,
    stats: [
      { value: "20M", label: "用户下载量" },
      { value: "125%", label: "以其简单1-9数字解析，融会贯通，成长快速" },
      { value: "-50%", label: "我们的订阅价格是市场价格的一半" },
    ],
    gallery: SERVICE_IMAGES.numberGallery,
  },
  name: {
    title: "姓名学",
    tagline: "「一字定乾坤，姓名见未来」",
    introTitle: "姓名学",
    intro:
      "姓名学是一门研究人名中每个字的笔画、音韵、部首与五行属性，并分析其对一个人性格、命运、事业、人际关系等方面的影响的学问。 它源于中国古代的命理思想，认为“名以定性，字乃启运”，一个好名字不仅要音义美观，更要与个人的生辰八字相合，达到补命调运、助力人生的目的。",
    ideaTitle: "数易赋能所赋予的理念",
    idea:
      "在我们看来，姓名不仅是一个称呼，更是一个人与宇宙之间的密码。姓名学不是迷信，它是融合字义美感、五行逻辑、人生节奏的东方智慧。我们相信，每个名字都藏着独特的能量，它能照见一个人的潜质，指引一个人走得更顺、更稳。透过现代技术与传统姓名学的结合，我们希望帮助你理解名字背后的意义，并以此为起点，活出真正的自己。",
    image: SERVICE_IMAGES.name,
    pageClass: "is-name",
    ctaHref: SERVICE_CTA_HREF,
    stats: [
      { value: "50%", label: "INCREASE IN WEBSITE TRAFFIC" },
      { value: "40%", label: "BOOST IN SOCIAL MEDIA REACH" },
      { value: "30%", label: "UPLIFT IN ONLINE SALES" },
    ],
    gallery: SERVICE_IMAGES.nameGallery,
  },
  tarot: {
    title: "塔罗占卜",
    tagline: "「每天一张牌，生活不迷茫。」",
    introTitle: "塔罗牌",
    intro:
      "塔罗牌（Tarot Cards）是一种用于占卜、内在探索与心理引导的工具。它起源于14世纪的欧洲，最初是纸牌游戏，后来逐渐演变为灵性和心理学的辅助工\n具。",
    ideaTitle: "数易赋能所赋予的理念",
    idea:
      "在我们看来，塔罗牌不是用来告诉你「接下来会发生什么」，而是邀请你静下来、问一问自己真正在乎的是什么。每一张牌，都是内在情绪的镜子，是潜意识的语言，是灵魂给自己的提醒。我们相信：一张牌可以照见当下的盲点，一组牌可以连接过去、现在与未来的选择，一次抽牌，是一次面对自己、理解自己、安顿自己的旅程。占卜师在这里扮演的是你的教练，您的指导者，您的良师益友。我们尊重塔罗的神秘，但更推崇它的温柔与诚实。它不会替你做决\n定，却会在你迷茫时，点亮一盏方向的灯。",
    image: SERVICE_IMAGES.tarot,
    pageClass: "is-tarot",
    ctaHref: SERVICE_CTA_HREF,
    stats: [
      { value: "5万", label: "每个月的搜索率" },
      { value: "20%", label: "全球华人家庭会寻找姓名皮算服务" },
      { value: "$500", label: "其他老师与平台平均费用，是我们的四倍" },
    ],
    gallery: SERVICE_IMAGES.tarotGallery,
  },
  eastern: {
    title: "东方占卜术",
    tagline: "「窥见命运的东方智慧之眼」",
    introTitle: "东方占卜术",
    intro:
      "东方占卜术是中华文化中的一颗璀璨明珠，它根植于天人合一的哲学思想，通过观察天时、地利、人和的关系，借助阴阳五行、干支历法等系统，来推演人生的起伏、吉凶祸福与时空能量的变化。它不仅仅是古代智者的生存工具，更是一种人与自然和谐共处的智慧体现。在东方占卜的浩瀚体系中，小六壬以其简洁而直观的特性，广泛用于生活中的即时判断，例如出行、求财、考试、交际等方面；而奇门遁甲则以庞大而精细的格局著称，讲究天地九宫、时空能量、八门三奇等多重组合，是用于战略决策与重大选择的重要工具。除此之外，尚有太乙、六壬等深奥术数，共同构成了东方古代预测学的核心体系。",
    ideaTitle: "数易赋能所赋予的理念",
    idea:
      "我们相信，东方占卜术不应被局限为“算命”的标签，它更像是一种对节奏与机遇的敏锐感知，是人与自然、人与时空之间的深层互动。它帮助人看清自己所处的节点与趋势，在混沌中找到方向。因此，我们在实践中并不拘泥于某一种术数，而是融合多种传统体系的精髓。我们常用小六壬来捕捉当下的流动与直觉判断，也借助奇门遁甲来进行更深层的出行计划、择日分析与格局设计。我们希望通过对时间与空间的系统理解，帮助现代人在复杂的社会节奏中找到合适的时机与路径。",
    image: SERVICE_IMAGES.eastern,
    pageClass: "is-eastern",
    ctaHref: SERVICE_CTA_HREF,
    stats: [
      { value: "4千万", label: "海外华人及东亚圈透过网络订阅" },
      { value: "2千万", label: "在安卓 + 苹果商店累计下载超过 2500万次" },
      { value: "-15%", label: "我们的订阅价格比其他平台便宜" },
    ],
    gallery: [] as string[],
  },
} as const;
