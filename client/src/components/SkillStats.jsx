function SkillStats() {
  return (
    <div className="analytics-section">

      <h2>🎯 Skill Analytics</h2>

      <p>React - 90%</p>

      <progress value="90" max="100"></progress>

      <p>Node.js - 80%</p>

      <progress value="80" max="100"></progress>

      <p>MongoDB - 70%</p>

      <progress value="70" max="100"></progress>

      <p>AWS - 20%</p>

      <progress value="20" max="100"></progress>

    </div>
  );
}

export default SkillStats;