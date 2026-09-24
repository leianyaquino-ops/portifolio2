// Configuração com as suas credenciais do Supabase
const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHV6dXNwcHpjb2xjbnBhYm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNzMyNzEsImV4cCI6MjEwNTg0OTI3MX0.vJVvyk2N2486O512Ly7b0JAMtu4XSnMqw2sFA3G7Guw';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const cadastroForm = document.querySelector('form');

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const emailInput = cadastroForm.querySelector('input[type="email"]') || document.getElementById('email');
    const passwordInput = cadastroForm.querySelector('input[type="password"]') || document.getElementById('password');

    if (!emailInput || !passwordInput) {
      alert('Campos de e-mail ou senha não foram encontrados no formulário.');
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
      const { data, error } = await _supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        alert('Erro ao cadastrar: ' + error.message);
      } else {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html';
      }
    } catch (err) {
      alert('Ocorreu um erro inesperado: ' + err.message);
    }
  });
}