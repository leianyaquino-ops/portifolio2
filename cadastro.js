const SUPABASE_URL = 'https://fnhuzusppzcolcnpabor.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_AQUI';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
  });
}