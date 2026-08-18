import { aboutPartnerLogos } from "@/lib/content";

export function AboutPartnersSection() {
  return (
    <section className="about-partners">
      <h2>合作伙伴</h2>
      <p className="about-partners-copy">
        <span className="about-partners-body">
          《数易赋能》的成功推出，离不开以下合作伙伴的鼎力支持与信任。在此，我们谨致以最诚挚的感
          <br />
          谢：感谢每一位合作单位、技术支持团队、内容贡献者以及早期参与测试的用户。正是你们在背后默
          <br />
          默的付出与专业的协作，让我们的产品从理念走向现实。我们深知，一个优质的应用不仅仅是技术的
          <br />
          堆砌，更需要智慧的融合与价值的共创。未来，《数易赋能》将持续优化体验、扩展功能，并携手更
          <br />
          多伙伴共同打造一个融合东西方智慧、助力个人成长的命理生态圈。再次感谢你们的参与与支持，让
        </span>
        <span className="about-partners-end">我们一起见证成长的力量，赋能更多人生。</span>
      </p>
      <div className="partners-logos">
        {aboutPartnerLogos.map((partner) => (
          <img key={partner.name} src={partner.logo} alt="" />
        ))}
      </div>
    </section>
  );
}
