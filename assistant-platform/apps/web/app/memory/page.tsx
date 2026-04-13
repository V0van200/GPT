export default function MemoryPage() {
  return (
    <div className="card">
      <h1 className="h1">Memory</h1>
      <div className="small">
        Здесь будет память: профиль (вкусы/интересы), заметки, факты. В MVP — простые заметки.
      </div>
      <div style={{ marginTop: 12 }} className="row">
        <a className="btn" href="/">← Home</a>
        <a className="btn" href="#">+ New Note (скоро)</a>
      </div>
    </div>
  );
}
