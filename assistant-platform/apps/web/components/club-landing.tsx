"use client";

import { useMemo, useState } from "react";

const benefits = [
  "Закрытые эфиры и творческие разборы каждую неделю",
  "Личный backstage EEKLERA: планы, референсы, анонсы",
  "Комьюнити девушек с вайбом pop-art и премиум-роста",
  "Приоритетный доступ к мерчу, ивентам и релизам",
];

const insideClub = [
  "Эксклюзивные voice и видео для участниц",
  "Практики для уверенности, стиля и контент-магии",
  "Мини-уроки по личному бренду и продвижению",
  "Moodboard недели + артистические челленджи",
];

const faqs = [
  {
    q: "Как я получу доступ после оплаты?",
    a: "После успешной оплаты подписка активируется в системе, а затем вы увидите экран подтверждения и кнопку получения ссылки в закрытый Telegram.",
  },
  {
    q: "Это Telegram Stars?",
    a: "Нет. В этом MVP используется внешняя оплата банковской картой через YooKassa Checkout.",
  },
  {
    q: "Подписка продлевается автоматически?",
    a: "В MVP — вручную. Повторную оплату можно сделать в любой момент, чтобы продлить доступ еще на 30 дней.",
  },
];

export function ClubLanding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initData = useMemo(() => {
    if (typeof window === "undefined") return "";
    const tg = (window as any)?.Telegram?.WebApp;
    return tg?.initData || "debug=true";
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      });

      if (!authRes.ok) {
        throw new Error("Не удалось пройти Telegram-авторизацию.");
      }

      const authData = await authRes.json();

      const paymentRes = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: authData.user.id, initData }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok || !paymentData.confirmationUrl) {
        throw new Error(paymentData.error || "Не удалось создать платеж.");
      }

      window.location.href = paymentData.confirmationUrl;
    } catch (err: any) {
      setError(err?.message || "Ошибка оплаты");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <section className="glass-card relative overflow-hidden p-8 md:p-12 shadow-glow">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <p className="mb-2 inline-flex rounded-full border border-fuchsia-300/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-fuchsia-200">
          EEKLERA Private Club
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Мир EEKLERA: закрытый Telegram-клуб для тех, кто выбирает premium vibe.
        </h1>
        <p className="mt-4 max-w-2xl text-white/80 md:text-lg">
          Luxury dark эстетика, креатив, поддержка и эксклюзивный контент. Вход только для своих.
        </p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="mt-8 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-500 px-8 py-4 text-lg font-semibold shadow-glow transition hover:scale-[1.02] disabled:opacity-70"
        >
          {loading ? "Создаём checkout..." : "Купить доступ"}
        </button>
        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="glass-card p-6">
          <h2 className="section-title">Что внутри клуба</h2>
          <ul className="mt-4 space-y-2 text-white/80">
            {insideClub.map((item) => (
              <li key={item}>✦ {item}</li>
            ))}
          </ul>
        </div>
        <div className="glass-card p-6">
          <h2 className="section-title">Преимущества</h2>
          <ul className="mt-4 space-y-2 text-white/80">
            {benefits.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="glass-card aspect-[4/3] p-4">
            <div className="h-full rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-900/40 p-4 text-white/60">
              Фото/баннер #{item}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <div className="glass-card p-8 md:p-10">
          <h2 className="section-title">Тариф</h2>
          <p className="mt-2 text-white/70">30 дней доступа в закрытый клуб EEKLERA</p>
          <p className="mt-5 text-5xl font-semibold">200 ₽</p>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 rounded-2xl border border-white/20 px-6 py-3 text-lg transition hover:border-fuchsia-300/60"
          >
            Оформить доступ
          </button>
        </div>
      </section>

      <section className="mt-10 mb-8">
        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="glass-card p-5">
              <p className="font-medium">{item.q}</p>
              <p className="mt-2 text-white/75">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
