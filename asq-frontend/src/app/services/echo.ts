import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;

let echo: Echo<any> | null = null;

export const getEcho = () => {
  if (!echo) {
    echo = new Echo({
      broadcaster: 'reverb',
      key: 'local',
      wsHost: 'localhost',
      wsPort: 80, // Ensure this matches your Nginx port
      forceTLS: false,
      disableStats: true,
      enabledTransports: ['ws'],
    });
  }

  return echo;
};