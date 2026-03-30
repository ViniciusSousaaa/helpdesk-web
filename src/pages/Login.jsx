import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    if (!email || !password) {
      toast.error('Por favor, preencha seu e-mail e senha.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      return;
    }

    const loadingToast = toast.loading('Autenticando...');
    
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      
      toast.success('Bem-vindo ao Helpdesk!', { id: loadingToast });
      navigate('/dashboard');

    } catch (error) {
      toast.error('E-mail ou senha incorretos.', { id: loadingToast });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Helpdesk Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label className="block text-slate-300 mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-slate-300 mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded transition duration-200 mt-6"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-slate-400">Ainda não tem conta? </span>
          <Link to="/register" className="text-sky-400 hover:text-sky-300 font-bold transition duration-200">
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </div>
  );
}