import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Calendar,
  Building2,
  Phone,
  User,
  MapPin,
  XCircle,
  Sparkles,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

// Mapeo de los números (0 al 10) con sus respectivas fechas
const DATES_MAP = {
  0: "5 de Marzo",
  1: "20 de Marzo",
  2: "5 de Abril",
  3: "20 de Abril",
  4: "5 de Mayo",
  5: "20 de Mayo",
  6: "5 de Junio",
  7: "20 de Junio",
  8: "5 de Julio",
  9: "20 de Julio",
  10: "5 de Agosto"
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('preload');
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: ''
  });
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (currentScreen === 'preload') {
      const timer = setTimeout(() => {
        setCurrentScreen('form');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim().length > 0);

  const handleElegirNumero = () => {
    if (hasRolled || isRolling) return; 
    
    setIsRolling(true);
    let counter = 0;
    
    const interval = setInterval(() => {
      setSelectedNumber(Math.floor(Math.random() * 11));
      counter++;
      if (counter > 20) { 
        clearInterval(interval);
        const finalNumber = Math.floor(Math.random() * 11);
        setSelectedNumber(finalNumber);
        setHasRolled(true);
        setIsRolling(false);
        setTimeout(() => setShowModal(true), 800); 
      }
    }, 60);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  if (currentScreen === 'preload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center animate-pulse">
          <div className="bg-white p-6 rounded-3xl shadow-2xl mb-6 relative">
             <Users className="w-16 h-16 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Tanda Segura</h1>
          <Loader2 className="w-8 h-8 text-white/50 animate-spin mt-10" />
        </div>
      </div>
    );
  }

  if (currentScreen === 'rejected') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-xl border border-slate-100">
          <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-slate-800 mb-4">Proceso Cancelado</h2>
          <p className="text-slate-500 mb-8">Has rechazado el turno. Por seguridad, no se puede reintentar en la misma sesión.</p>
          <button onClick={() => window.location.reload()} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold">Reiniciar App</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden transition-all duration-500">
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white text-center rounded-b-[2.5rem] relative">
          <div className="relative z-10">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-90" />
            <h1 className="text-3xl font-black tracking-tight">Tanda Segura</h1>
            <p className="text-emerald-50 text-sm font-medium mt-1">Ahorro Grupal Inteligente</p>
          </div>
        </div>

        <div className="p-7">
          {currentScreen === 'form' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Registro de Participante</h2>
              <div className="space-y-3">
                {[
                  { name: 'nombre', icon: User, placeholder: 'Nombre Completo' },
                  { name: 'cedula', icon: CreditCard, placeholder: 'Cédula de Identidad' },
                  { name: 'direccion', icon: MapPin, placeholder: 'Dirección' },
                  { name: 'telefono', icon: Phone, placeholder: 'Teléfono' }
                ].map((input) => (
                  <div key={input.name} className="relative">
                    <input.icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" name={input.name} placeholder={input.placeholder} 
                      value={formData[input.name]} onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
              <button 
                disabled={!isFormValid} onClick={() => setCurrentScreen('selection')}
                className={`w-full py-4 mt-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-2
                ${isFormValid ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}
              >
                Ingresar Turno <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {currentScreen === 'selection' && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">Descubre tu Turno</h2>
              <div className="relative mb-10">
                <div className={`absolute inset-0 rounded-full blur-2xl ${isRolling ? 'bg-emerald-400/40 animate-pulse' : 'bg-slate-100'}`}></div>
                <div className={`relative z-10 w-40 h-40 flex items-center justify-center rounded-full font-black text-7xl shadow-2xl border-8
                  ${selectedNumber === null ? 'bg-white text-slate-200 border-slate-50' : 'bg-emerald-600 text-white border-emerald-100'}`}>
                  {selectedNumber === null ? '?' : selectedNumber}
                </div>
              </div>
              <div className="w-full bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-1" />
                <p className="text-amber-800 text-sm font-medium leading-tight">Recuerda: El sorteo es aleatorio y solo se puede realizar una única vez.</p>
              </div>
              <button 
                onClick={handleElegirNumero} disabled={hasRolled || isRolling}
                className={`w-full py-4.5 rounded-2xl font-black text-lg shadow-xl transition-all
                ${(hasRolled || isRolling) ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-white hover:scale-[1.02]'}`}
              >
                {isRolling ? 'Sorteando...' : '¡Girar Ruleta!'}
              </button>
            </div>
          )}

          {currentScreen === 'thankyou' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">¡Confirmado!</h2>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-emerald-50 flex items-center justify-center text-3xl font-black text-emerald-600">{selectedNumber}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Turno Asignado</p>
                    <p className="text-slate-800 font-bold text-xl">{DATES_MAP[selectedNumber]}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="text-xs font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest"><Building2 className="w-4 h-4" /> Datos de Pago</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Banco', val: 'Pichincha' },
                      { label: 'Cuenta', val: '2200334455', copy: true },
                      { label: 'Titular', val: 'Admin Tanda' },
                      { label: 'CI', val: '0912345678', copy: true }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">{row.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 font-bold">{row.val}</span>
                          {row.copy && (
                            <button onClick={() => copyToClipboard(row.val, row.label)} className="p-1 hover:bg-emerald-100 rounded transition-colors">
                              {copiedField === row.label ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-90 duration-300">
            <div className="bg-emerald-600 p-10 text-center text-white">
              <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-2">Tu número es</p>
              <div className="text-8xl font-black drop-shadow-lg">{selectedNumber}</div>
            </div>
            <div className="p-8 text-center">
              <p className="text-slate-400 text-sm mb-1">Cobro programado:</p>
              <p className="text-2xl font-black text-slate-800 mb-8 flex items-center justify-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-500" /> {DATES_MAP[selectedNumber]}
              </p>
              <div className="space-y-3">
                <button onClick={() => { setShowModal(false); setCurrentScreen('thankyou'); }} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-emerald-700 transition-all">Confirmar Participación</button>
                <button onClick={() => { setShowModal(false); setCurrentScreen('rejected'); }} className="w-full bg-white border-2 border-slate-100 text-slate-400 font-bold py-4 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">Rechazar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}