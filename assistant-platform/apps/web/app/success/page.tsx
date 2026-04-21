export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-4">
      <section className="glass-card w-full p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200">EEKLERA Club</p>
        <h1 className="mt-2 text-3xl font-semibold">Оплата подтверждена ✨</h1>
        <p className="mt-3 text-white/80">
          Ваша подписка активирована. Нажмите кнопку ниже, чтобы запросить доступ в закрытый Telegram.
        </p>
        <a
          href="/api/access-link"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-3 font-semibold"
        >
          Получить доступ
        </a>
      </section>
    </main>
  );
}
