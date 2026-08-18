import { FadeIn } from "@/components/ui/FadeIn";

export function AboutStorySection() {
  return (
    <section className="about-hero">
      <FadeIn>
        <p className="about-hero-kicker">
          我们的故事
          <br />
          <span>OUR STORY</span>
        </p>
      </FadeIn>
      <h1 className="about-hero-title">
        STORYTELLERS?
        <br />
        WE&apos;RE STORY MAKERS
      </h1>
      <div className="about-hero-body">
        <p>本程序受启发于国学易经，并基于数字生命能量学开发。</p>
        <p>
          自2023至2024年，本产品仅限于内部测试阶段，主要服务于核心学员与小范围用户。随着学员数量不断增长，以及大众对命理与自我探索的兴趣日益提升，我们团队决定于2025年对产品进行全面改版升级。
          <br />
          新版平台由智码先锋团队负责技术开发，并由科学方舟团队在后续运营中进行重点管理与优化。经过数月筹备与测试，产品已于2025年6月22日正式上架至安卓、iOS等主流应用商店，向公众全面开放。
        </p>
        <p>
          为丰富平台内容与提升用户体验，我们同步拓展了占卜服务，融合东西方文化传统，将塔罗牌与东方占卜术（如小六壬、奇门遁甲等）一并纳入功能体系中。我们相信，命理与占卜不仅是一种预测工具，更是引导用户面对人生课题、进行内在觉察与外在决策的重要智慧资
          <br />
          源。
        </p>
        <p>
          千寓为数字生命学的资深老师，现居住美国与马来西亚两地。作为一个数字生命学的倡导者，她相信人可以透过自身的努力去改变命运，好的名字与数字组合会为人生带来辅助。数字本无好坏之分，皆在与我们如何透过自身的能量去驾驭属于我们的生命密码。
        </p>
        <p>
          俯宏为NLP高级导师（ABNLP与NLPU认证），催眠咨询与治疗师(ABH与NGH认证）与臼井与慈光灵气导师。他因千寓而认识了数字生命学。并希望结合自身经历与学问，协助，帮助有需要的人去达成目标。
        </p>
      </div>
    </section>
  );
}
