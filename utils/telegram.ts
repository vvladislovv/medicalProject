// Утилиты для работы с Telegram Mini App
// Используйте этот файл для интеграции с Telegram Web App API

export const initTelegram = () => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    const tg = (window as any).Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Настройка темы
    tg.setHeaderColor('#2196F3');
    tg.setBackgroundColor('#F5F9FC');
    
    return tg;
  }
  return null;
};

export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    const tg = (window as any).Telegram.WebApp;
    return tg.initDataUnsafe?.user || null;
  }
  return null;
};

export const sendTelegramData = (data: any) => {
  if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
    const tg = (window as any).Telegram.WebApp;
    tg.sendData(JSON.stringify(data));
  }
};

