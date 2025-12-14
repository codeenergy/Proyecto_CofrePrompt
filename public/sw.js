// Detectar si estamos en producción (Vercel)
const isProduction = self.location.hostname !== 'localhost' &&
                     self.location.hostname !== '127.0.0.1' &&
                     !self.location.hostname.includes('192.168');

// Solo cargar Monetag en producción
if (isProduction) {
  self.options = {
    "domain": "3nbf4.com",
    "zoneId": 10276969
  }
  self.lary = ""
  importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')
} else {
  console.log('Service Worker: Monetag deshabilitado en desarrollo');

  // Service worker básico para desarrollo
  self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalado (modo desarrollo)');
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activado (modo desarrollo)');
    event.waitUntil(self.clients.claim());
  });
}
