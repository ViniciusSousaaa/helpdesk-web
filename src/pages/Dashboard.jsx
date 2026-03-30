import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
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
        
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
          <p className="text-slate-300">Em breve, a lista de chamados vai aparecer aqui!</p>
        </div>
      </div>
    </div>
  );
}