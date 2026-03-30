import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido (ex: nome@dominio.com).');
      return; 
    }

    const loadingToast = toast.loading('Criando conta...');
    try {
      await axios.post('http://localhost:8080/auth/register', {
        name,
        email,
        password,
        role
      });
      toast.success('Conta criada! Faça o login.', { id: loadingToast });
      navigate('/');
    } catch (error) {
      toast.error('Erro ao criar conta. E-mail já cadastrado!', { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Criar Conta</h1>
        
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <div>
            <label className="block text-slate-300 mb-2">Nome Completo</label>
            <input 
              type="text" 
              className="w-full p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label className="block text-slate-300 mb-2">Tipo de Conta</label>
            <select 
              className="w-full p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="USER">Usuário Padrão</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded transition duration-200 mt-6"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-slate-400">Já tem uma conta? </span>
          <Link to="/" className="text-sky-400 hover:text-sky-300 font-bold transition duration-200">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}