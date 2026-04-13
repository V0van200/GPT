export default function CalendarPage() {
  return (
    <div className="card">
      <h1 className="h1">Calendar</h1>
      <div className="small">В MVP можно начать со списка событий. Потом — день/неделя/месяц.</div>
      <div style={{ marginTop: 12 }} className="row">
        <a className="btn" href="/">← Home</a>
        <a className="btn" href="#">+ New Event (скоро)</a>
      </div>
    </div>
  );
}
