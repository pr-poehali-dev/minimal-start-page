import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const quickLinks = [
    { name: 'YouTube', icon: 'Play', color: 'bg-red-500', url: 'https://youtube.com' },
    { name: 'Gmail', icon: 'Mail', color: 'bg-blue-500', url: 'https://gmail.com' },
    { name: 'GitHub', icon: 'Github', color: 'bg-gray-800', url: 'https://github.com' },
    { name: 'Twitter', icon: 'Twitter', color: 'bg-sky-500', url: 'https://twitter.com' },
    { name: 'Netflix', icon: 'Monitor', color: 'bg-red-600', url: 'https://netflix.com' },
    { name: 'Spotify', icon: 'Music', color: 'bg-green-500', url: 'https://spotify.com' },
    { name: 'Amazon', icon: 'ShoppingCart', color: 'bg-orange-500', url: 'https://amazon.com' },
    { name: 'Reddit', icon: 'MessageCircle', color: 'bg-orange-600', url: 'https://reddit.com' }
  ];

  const newsItems = [
    { title: 'Технологические новости: ИИ достигает новых высот', time: '2 часа назад', category: 'Технологии' },
    { title: 'Экономика: Рост курса криптовалют продолжается', time: '4 часа назад', category: 'Финансы' },
    { title: 'Наука: Открытие новой экзопланеты в обитаемой зоне', time: '6 часов назад', category: 'Наука' },
    { title: 'Спорт: Чемпионат мира по футболу приближается', time: '8 часов назад', category: 'Спорт' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">StartPage</div>
          <div className="text-sm text-gray-600">
            {time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-gray-800 mb-8">Поиск</h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Введите поисковый запрос..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 text-lg px-6 pr-16 rounded-full border-2 border-gray-200 focus:border-blue-400 shadow-lg"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-2 h-10 w-10 rounded-full p-0"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Currency */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Icon name="DollarSign" size={20} className="text-green-600" />
                Курс валют
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">USD/RUB</span>
                <span className="font-bold text-lg">89.45 ₽</span>
                <span className="text-green-600 text-sm">+0.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">EUR/RUB</span>
                <span className="font-bold text-lg">97.23 ₽</span>
                <span className="text-red-600 text-sm">-0.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">BTC/USD</span>
                <span className="font-bold text-lg">$43,250</span>
                <span className="text-green-600 text-sm">+2.1%</span>
              </div>
            </div>
          </Card>

          {/* Weather */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Icon name="Cloud" size={20} className="text-blue-500" />
                Погода в Москве
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-light text-gray-800">+18°C</div>
                <div className="text-gray-600">Облачно</div>
                <div className="text-sm text-gray-500 mt-2">
                  Ощущается как +20°C
                </div>
              </div>
              <div className="text-right">
                <Icon name="CloudRain" size={48} className="text-gray-400 mb-2" />
                <div className="text-sm text-gray-500">
                  Влажность: 65%
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Быстрые ссылки</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className={`h-20 w-full flex flex-col items-center justify-center gap-2 rounded-2xl ${link.color} text-white hover:scale-105 transition-transform shadow-lg`}
                onClick={() => window.open(link.url, '_blank')}
              >
                <Icon name={link.icon as any} size={24} />
                <span className="text-xs font-medium">{link.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Лента новостей</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {newsItems.map((news, index) => (
              <Card key={index} className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.time}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 leading-tight">
                    {news.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;