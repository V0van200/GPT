export default function TasksPage() {
  return (
    <div className="card">
      <h1 className="h1">Tasks</h1>
      <div className="small">Сюда подключим API: список задач, фильтры, добавление.</div>
      <div style={{ marginTop: 12 }} className="row">
        <a className="btn" href="/">← Home</a>
        <a className="btn" href="#">+ New Task (скоро)</a>
      </div>
      <div style={{ marginTop: 14 }}>
        <div className="small">Пока заглушка. Далее: CRUD через FastAPI.</div>
      </div>
    </div>
  );
}
