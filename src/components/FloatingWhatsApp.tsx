import React from 'react';
import { MessageCircle } from 'lucide-react';

/** WhatsApp: country code + number, no + or spaces */
const WHATSAPP_NUMBER = '916305680890';
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hello SKIZEN, I would like to book a consultation about a project.'
);

const FloatingWhatsApp: React.FC = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ski-accent md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
    </a>
  );
};

export default FloatingWhatsApp;
