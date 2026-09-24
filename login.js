const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHV6dXNwcHpjb2xjbnBhYm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzMyNzEsImV4cCI6MjEwNTg0OTI3MX0.vJVvyk2N2486O512Ly7b0JAMtu4XSnMqw2sFA3G7Guw';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.querySelector('form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede recarregamento da página e perda do layout

    const emailInput = document.getElementById('login');
    const passwordInput = document.getElementById('senha');

    if (!emailInput || !passwordInput) {
      alert('Campos de e-mail ou senha não encontrados.');
      return;
    }

    const { data, error } = await _supabase.auth.signInWithPassword({
      email: emailInput.value.trim(),
      password: passwordInput.value,
    });

    if (error) {
      alert('Erro ao fazer login: ' + error.message);
    } else {
      alert('Login realizado com sucesso!');
      window.location.href = 'home.html';
    }
  });
}