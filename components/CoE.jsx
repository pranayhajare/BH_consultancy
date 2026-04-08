import './CoE.css';

export default function CoE() {
  return (
    <section className="coe" id="coe">
      <div className="container">
        <div className="coe__wrapper glass-card">
          <div className="coe__content">
            <span className="coe__badge">ISSDP Program</span>
            <h2 className="coe__title">Center of <span className="text-accent">Excellence</span></h2>
            <p className="coe__desc">
              Operating advanced Center of Excellence (CoE) initiatives under the flagship brand 
              <strong> Industrial Software Skill Development Program (ISSDP)</strong>, in collaboration 
              with the Shastri Group of Institutions.
            </p>
            <p className="coe__desc">
              Bridging the gap between industry requirements and employability by offering specialized, 
              industry-oriented software skills to students, engineers, and professionals.
            </p>

            <div className="coe__features">
              <div className="coe__feature">
                <h4>Software Skill Training</h4>
                <p>CAD/CAM/CAE, CATIA, SOLIDWORKS, PLM & Digital Engineering Tools</p>
              </div>
              <div className="coe__feature">
                <h4>Industry-Integrated Projects</h4>
                <p>Exposure to live industrial projects for real-world problem-solving experience</p>
              </div>
              <div className="coe__feature">
                <h4>Placement-Oriented</h4>
                <p>Strong corporate network with OEMs for internships and job placements</p>
              </div>
              <div className="coe__feature">
                <h4>Specialized Skilling</h4>
                <p>Aligned with Automotive, Aerospace & Defence sectors (TATA, Eicher, Bharat Forge)</p>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary" style={{ marginTop: '24px' }}>
              Join the Program
            </a>
          </div>

          <div className="coe__image-wrapper">
            <div className="coe__mockup">
              <div className="coe__mockup-header">
                <span></span><span></span><span></span>
              </div>
              <div className="coe__mockup-body">
                <div className="coe__stats-grid">
                  <div className="coe__stat-box">
                    <span className="coe__number">100%</span>
                    <span className="coe__label">Industry Aligned</span>
                  </div>
                  <div className="coe__stat-box">
                    <span className="coe__number">5+</span>
                    <span className="coe__label">Core Softwares</span>
                  </div>
                  <div className="coe__stat-box" style={{ gridColumn: '1 / -1' }}>
                    <span className="coe__number">Direct Placement</span>
                    <span className="coe__label">Corporate Network Access</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Background elements */}
            <div className="coe__shape coe__shape-1"></div>
            <div className="coe__shape coe__shape-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
