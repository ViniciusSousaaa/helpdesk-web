import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  const fetchTickets = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    } catch (error) {
      console.error("Erro ao decodificar token", error);
    }

    try {
      const response = await axios.get('http://localhost:8080/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const loadingToast = toast.loading('Criando chamado...');

    try {
      await axios.post('http://localhost:8080/tickets', {
        title,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTitle('');
      setDescription('');

      toast.success('Chamado criado com sucesso!', { id: loadingToast });
      fetchTickets();
    } catch (error) {
      toast.error('Erro ao criar o chamado.', { id: loadingToast });
    }
  };

  const handleCloseTicket = async (id) => {
    const token = localStorage.getItem('token');
    const loadingToast = toast.loading('Fechando chamado...');
    try {
      await axios.put(`http://localhost:8080/tickets/${id}/close`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Chamado fechado!', { id: loadingToast });
      fetchTickets();
    } catch (error) {
      toast.error('Erro ao fechar o chamado.', { id: loadingToast });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Até logo!');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Meus Chamados</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sair
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl mb-8">
          <h2 className="text-xl font-bold text-sky-400 mb-4">Abrir Novo Chamado</h2>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">Título do Problema</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-2">Descrição Detalhada</label>
              <textarea
                className="w-full p-2 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              Criar Chamado
            </button>
          </form>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold text-sky-400 mb-4">Histórico de Chamados</h2>
          {tickets.length === 0 ? (
            <p className="text-slate-300">Nenhum chamado encontrado.</p>
          ) : (
            <div className="space-y-4">
              {tickets.map(ticket => (
                <div key={ticket.id} className="bg-slate-700 p-4 rounded border border-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{ticket.title}</h3>
                    <div className="flex items-center gap-2">
                      {ticket.status === 'OPEN' && userRole === 'ADMIN' && (
                        <button
                          onClick={() => handleCloseTicket(ticket.id)}
                          className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold py-1 px-3 rounded transition duration-200"
                        >
                          Fechar Chamado
                        </button>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === 'OPEN' ? 'bg-green-500 text-white' : 'bg-slate-500 text-slate-200'}`}>
                        {ticket.status === 'OPEN' ? 'ABERTO' : 'FECHADO'}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-2">{ticket.description}</p>
                  <div className="text-sm text-slate-400 flex justify-between mt-4 border-t border-slate-600 pt-2">
                    <span>Aberto por: <strong className="text-white">{ticket.customerName}</strong></span>
                    <span>{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}