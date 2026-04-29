const API = "https://your-worker.workers.dev";


// ─────────────────────────
// 1. ВЫБОР ПЛАНА
// СРАЗУ СОЗДАЁТ CHECKOUT
// ─────────────────────────

async function startCheckout(plan) {

  const res = await fetch(
    API + "/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        plan
      })
    }
  );

  const data = await res.json();

  // переход на оплату
  window.location.href =
    data.checkoutUrl;
}


// ─────────────────────────
// 2. СОЗДАНИЕ USER
// ПОСЛЕ ВОЗВРАТА С ОПЛАТЫ
// ─────────────────────────

async function register() {

  const email =
    document.getElementById("email").value;

  const user_key =
    document.getElementById("key").value;

  const plan =
    localStorage.getItem("plan");

  const res = await fetch(
    API + "/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        user_key,
        plan
      })
    }
  );

  const data = await res.json();

  console.log(data);

  alert("Аккаунт создан");
}


// ─────────────────────────
// 3. ОБЫЧНЫЙ ВХОД
// ─────────────────────────

async function login() {

  const email =
    document.getElementById("email").value;

  const user_key =
    document.getElementById("key").value;

  const res = await fetch(
    API + "/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        user_key
      })
    }
  );

  const data = await res.json();

  if (
    data.status === "access_granted"
  ) {
    alert("Доступ открыт");
  }

  if (
    data.status === "payment_required"
  ) {
    window.location.href =
      data.checkoutUrl;
  }
}
