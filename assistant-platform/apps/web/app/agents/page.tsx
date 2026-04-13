const agents = [
  { id: "router", name: "Главный модератор", role: "Распределяет задачи между агентами" },
  { id: "planner", name: "Planner", role: "Задачи/календарь/дедлайны" },
  { id: "calories", name: "Calories", role: "Питание/калории" }
];

export default function AgentsPage() {
  return (
    <div className="card">
      <h1 className="h1">Agents</h1>
      <div className="small">Агенты — это конфиги (name/role/tools). Далее подключим сохранение через API.</div>

      <div style={{ marginTop: 12 }} className="row">
        <a className="btn" href="/">← Home</a>
        <a className="btn" href="#">+ Create Agent (скоро)</a>
      </div>

      <div style={{ marginTop: 16 }}>
        {agents.map((a) => (
          <div key={a.id} className="card" style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>{a.name}</div>
            <div className="small">{a.role}</div>
            <div className="row" style={{ marginTop: 10 }}>
              <a className="btn" href="#">Чат (скоро)</a>
              <a className="btn" href="#">Настройки (скоро)</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
