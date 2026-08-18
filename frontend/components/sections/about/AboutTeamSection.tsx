import { aboutTeam } from "@/lib/content";

export function AboutTeamSection() {
  return (
    <section className="about-team">
      <h2>OUR TEAM</h2>
      <p className="about-team-lead">
        我们是一群热爱东西方命理、玄学与身心灵成长的探索者，希望用我们的指引，点亮你的人生方向。
      </p>
      <div className="team-grid">
        {aboutTeam.members.map((member) => (
          <article key={member.name} className="team-card">
            <img src={member.image} alt="" />
            <h3>{member.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
