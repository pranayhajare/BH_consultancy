import './Team.css';

const team = [
  {
    name: 'Mr. Dhirendra Amarnath Singh',
    role: 'Managing Director',
    image: '/dhiren.jpg',
    highlights: ['Began journey at IBM', 'Director of 6+ companies', 'Committed to youth empowerment'],
    delay: '0s'
  },
  {
    name: 'Mr. Linesh Chaudhari',
    role: 'Chief Executive Officer',
    image: '/linesh.jpg',
    highlights: ['Six Sigma Green Belt', 'Supervisory role in London Olympics 2012', 'Brand Owner & Entrepreneur'],
    delay: '0.2s'
  },
  {
    name: 'Mr. Manish Prakash Dongre',
    role: 'Chief Operations Officer',
    image: '/manish.jpg',
    highlights: ['Founder of NHK Hospitality', 'Expertise in student placements', 'Visionary & relationship-driven'],
    delay: '0.4s'
  }
];

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Leadership</span>
          <h2 className="section-title">Meet Our <span className="text-accent">Core Team</span></h2>
          <p className="section-subtitle">
            Guided by visionary leaders with decades of cross-industry experience
            in engineering, operations, and strategic consulting.
          </p>
        </div>

        <div className="team__grid">
          {team.map((member, i) => (
            <div key={i} className="team__card" style={{ animationDelay: member.delay }}>
              <div className="team__card-image-wrapper">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="team__card-image" />
                ) : (
                  <div className="team__card-image-placeholder">
                    <span className="team__card-initials">
                      {member.name.split(' ').map(n => n[0]).join('').replace('M.', '').substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="team__card-body">
                <h3 className="team__name">{member.name}</h3>
                <span className="team__role">{member.role}</span>
                <div className="team__highlights">
                  {member.highlights.map((highlight, j) => (
                    <span key={j} className="team__highlight-tag">{highlight}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
