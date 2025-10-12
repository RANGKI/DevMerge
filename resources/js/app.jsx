import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { configureEcho } from '@laravel/echo-react';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);

    configureEcho({
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
      wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
      wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
    });
  },
});
