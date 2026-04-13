export default function Page() {
  return (
    <div className="grid">
      <section className="card" style={{ gridColumn: "span 12" }}>
        <h1 className="h1">Личный кабинет</h1>
        <div className="small">MVP: Dashboard / Tasks / Calendar / Agents / Memory</div>
      </section>

      <section className="card" style={{ gridColumn: "span 6" }}>
        <div className="h2">Сегодня</div>
        <div>— 0 задач</div>
        <div>— 0 событий</div>
        <div className="row" style={{ marginTop: 10 }}>
          <a className="btn" href="/tasks">+ Задача</a>
          <a className="btn" href="/calendar">+ Событие</a>
        </div>
      </section>

      <section className="card" style={{ gridColumn: "span 6" }}>
        <div className="h2">Агент дня</div>
        <div>Главный модератор (router)</div>
        <div className="row" style={{ marginTop: 10 }}>
          <a className="btn" href="/agents">Открыть агентов</a>
        </div>
      </section>

      <section className="card" style={{ gridColumn: "span 12" }}>
        <div className="h2">Что дальше</div>
        <ol className="small">
          <li>Подключаем API (FastAPI) и показываем реальные задачи</li>
          <li>Добавляем Telegram WebApp кнопку из бота</li>
          <li>Добавляем память и настройки агентов</li>
        </ol>
      </section>
    </div>
  );
}
