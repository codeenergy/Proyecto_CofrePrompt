import React from 'react';
import { X } from 'lucide-react';

type LegalView = 'PRIVACY' | 'TERMS' | 'COOKIES' | 'CONTACT';

interface LegalModalProps {
  view: LegalView | null;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ view, onClose }) => {
  if (!view) return null;

  const renderContent = () => {
    switch (view) {
      case 'PRIVACY':
        return (
          <>
            <h1 className="text-2xl font-bold text-white mb-6">Política de Privacidad</h1>
            <p className="mb-4">En CofrePrompt, accesible desde cofreprompt.com, una de nuestras principales prioridades es la privacidad de nuestros visitantes.</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Información que recopilamos</h3>
            <p className="mb-4">Cuando se registra en una cuenta, podemos solicitarle su información de contacto, incluidos elementos como nombre, nombre de la empresa, dirección, dirección de correo electrónico y número de teléfono.</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cómo utilizamos su información</h3>
            <p className="mb-4">Utilizamos la información que recopilamos de varias formas, entre ellas para:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Proporcionar, operar y mantener nuestro sitio web.</li>
              <li>Mejorar, personalizar y ampliar nuestro sitio web.</li>
              <li>Comprender y analizar cómo utiliza nuestro sitio web.</li>
              <li>Desarrollar nuevos productos, servicios, características y funcionalidades.</li>
            </ul>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Google DoubleClick DART Cookie</h3>
            <p className="mb-4">Google es uno de los proveedores externos de nuestro sitio. También utiliza cookies, conocidas como cookies DART, para publicar anuncios a los visitantes de nuestro sitio.</p>
          </>
        );
      case 'TERMS':
        return (
          <>
            <h1 className="text-2xl font-bold text-white mb-6">Términos y Condiciones</h1>
            <p className="mb-4">¡Bienvenido a CofrePrompt!</p>
            <p className="mb-4">Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de CofrePrompt.</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Cookies</h3>
            <p className="mb-4">Empleamos el uso de cookies. Al acceder a CofrePrompt, usted aceptó utilizar cookies de acuerdo con la Política de Privacidad de CofrePrompt.</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Licencia</h3>
            <p className="mb-4">A menos que se indique lo contrario, CofrePrompt y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en CofrePrompt. Todos los derechos de propiedad intelectual están reservados.</p>
          </>
        );
      case 'COOKIES':
        return (
          <>
            <h1 className="text-2xl font-bold text-white mb-6">Política de Cookies</h1>
            <p className="mb-4">Esta es la Política de Cookies de CofrePrompt.</p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-3">¿Qué son las cookies?</h3>
            <p className="mb-4">Como es práctica común en casi todos los sitios web profesionales, este sitio utiliza cookies, que son pequeños archivos que se descargan en su computadora, para mejorar su experiencia.</p>
          </>
        );
      case 'CONTACT':
        return (
          <>
            <h1 className="text-2xl font-bold text-white mb-6">Contacto</h1>
            <p className="mb-4">Si tiene preguntas sobre nuestros servicios, publicidad o cualquier otro tema, no dude en contactarnos.</p>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-6">
               <p className="text-slate-300 mb-2"><strong>Email:</strong> soporte@cofreprompt.com</p>
               <p className="text-slate-300"><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 5:00 PM</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'PRIVACY': return 'Privacidad';
      case 'TERMS': return 'Términos';
      case 'COOKIES': return 'Cookies';
      case 'CONTACT': return 'Contacto';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-surface border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200 max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/50 shrink-0">
          <h2 className="text-lg font-bold text-white">{getTitle()}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-slate-300 text-sm leading-relaxed">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default LegalModal;
