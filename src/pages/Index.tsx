import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isLinksDialogOpen, setIsLinksDialogOpen] = useState(false);
  const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
  const [linkForm, setLinkForm] = useState({ name: '', url: '', icon: '', color: '' });
  
  // Load links from localStorage or use defaults
  const [quickLinks, setQuickLinks] = useState(() => {
    const saved = localStorage.getItem('quickLinks');
    return saved ? JSON.parse(saved) : [
      { name: 'YouTube', icon: 'Play', color: 'bg-red-500', url: 'https://youtube.com' },
      { name: 'Gmail', icon: 'Mail', color: 'bg-blue-500', url: 'https://gmail.com' },
      { name: 'GitHub', icon: 'Github', color: 'bg-gray-800', url: 'https://github.com' },
      { name: 'Twitter', icon: 'Twitter', color: 'bg-sky-500', url: 'https://twitter.com' },
      { name: 'Netflix', icon: 'Monitor', color: 'bg-red-600', url: 'https://netflix.com' },
      { name: 'Spotify', icon: 'Music', color: 'bg-green-500', url: 'https://spotify.com' },
      { name: 'Amazon', icon: 'ShoppingCart', color: 'bg-orange-500', url: 'https://amazon.com' },
      { name: 'Reddit', icon: 'MessageCircle', color: 'bg-orange-600', url: 'https://reddit.com' }
    ];
  });

  const [newsItems, setNewsItems] = useState([
    { id: 1, title: 'Технологические новости: ИИ достигает новых высот', time: '2 часа назад', category: 'Технологии' },
    { id: 2, title: 'Экономика: Рост курса криптовалют продолжается', time: '4 часа назад', category: 'Финансы' },
    { id: 3, title: 'Наука: Открытие новой экзопланеты в обитаемой зоне', time: '6 часов назад', category: 'Наука' },
    { id: 4, title: 'Спорт: Чемпионат мира по футболу приближается', time: '8 часов назад', category: 'Спорт' }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Additional news for infinite scroll
  const moreNewsItems = [
    { title: 'Искусство: Новая выставка современных художников', category: 'Культура' },
    { title: 'Медицина: Прорыв в лечении редких заболеваний', category: 'Здоровье' },
    { title: 'Автомобили: Представлен новый электромобиль', category: 'Авто' },
    { title: 'Космос: Планируется новая миссия на Марс', category: 'Космос' },
    { title: 'Образование: Реформа высшего образования', category: 'Образование' },
    { title: 'Экология: Новые методы борьбы с загрязнением', category: 'Экология' },
    { title: 'Кулинария: Тренды здорового питания 2025', category: 'Еда' },
    { title: 'Путешествия: Открытие новых туристических маршрутов', category: 'Туризм' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Save links to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quickLinks', JSON.stringify(quickLinks));
  }, [quickLinks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  // Handle editing links
  const openEditDialog = (index: number) => {
    setEditingLinkIndex(index);
    setLinkForm(quickLinks[index]);
    setIsLinksDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingLinkIndex(null);
    setLinkForm({ name: '', url: '', icon: 'Link', color: 'bg-blue-500' });
    setIsLinksDialogOpen(true);
  };

  const saveLinkChanges = () => {
    if (editingLinkIndex !== null) {
      const updatedLinks = [...quickLinks];
      updatedLinks[editingLinkIndex] = linkForm;
      setQuickLinks(updatedLinks);
    } else {
      setQuickLinks([...quickLinks, linkForm]);
    }
    setIsLinksDialogOpen(false);
  };

  const deleteLink = (index: number) => {
    const updatedLinks = quickLinks.filter((_, i) => i !== index);
    setQuickLinks(updatedLinks);
  };

  // Infinite scroll for news
  const loadMoreNews = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const startIndex = newsItems.length;
      const newItems = moreNewsItems.slice(0, 4).map((item, index) => ({
        id: startIndex + index + 1,
        title: item.title,
        time: `${Math.floor(Math.random() * 12) + 1} часов назад`,
        category: item.category
      }));
      
      setNewsItems(prev => [...prev, ...newItems]);
      setLoading(false);
      
      // Stop loading after 20 items
      if (newsItems.length + newItems.length >= 20) {
        setHasMore(false);
      }
    }, 1000);
  }, [loading, hasMore, newsItems.length, moreNewsItems]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreNews();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreNews]);

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Быстрые ссылки</h2>
            <Button onClick={openAddDialog} variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить
            </Button>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickLinks.map((link, index) => (
              <div key={index} className="relative group">
                <Button
                  variant="ghost"
                  className={`h-20 w-full flex flex-col items-center justify-center gap-2 rounded-2xl ${link.color} text-white hover:scale-105 transition-transform shadow-lg`}
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <Icon name={link.icon as any} size={24} />
                  <span className="text-xs font-medium">{link.name}</span>
                </Button>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-6 w-6 p-0 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(index);
                    }}
                  >
                    <Icon name="Edit2" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link Edit Dialog */}
        <Dialog open={isLinksDialogOpen} onOpenChange={setIsLinksDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingLinkIndex !== null ? 'Редактировать ссылку' : 'Добавить ссылку'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-name">Название</Label>
                <Input
                  id="link-name"
                  value={linkForm.name}
                  onChange={(e) => setLinkForm({...linkForm, name: e.target.value})}
                  placeholder="YouTube"
                />
              </div>
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                  placeholder="https://youtube.com"
                />
              </div>
              <div>
                <Label htmlFor="link-icon">Иконка</Label>
                <Input
                  id="link-icon"
                  value={linkForm.icon}
                  onChange={(e) => setLinkForm({...linkForm, icon: e.target.value})}
                  placeholder="Play"
                />
              </div>
              <div>
                <Label htmlFor="link-color">Цвет</Label>
                <select
                  id="link-color"
                  value={linkForm.color}
                  onChange={(e) => setLinkForm({...linkForm, color: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="bg-red-500">Красный</option>
                  <option value="bg-blue-500">Синий</option>
                  <option value="bg-green-500">Зеленый</option>
                  <option value="bg-yellow-500">Желтый</option>
                  <option value="bg-purple-500">Фиолетовый</option>
                  <option value="bg-pink-500">Розовый</option>
                  <option value="bg-gray-800">Серый</option>
                  <option value="bg-orange-500">Оранжевый</option>
                </select>
              </div>
              <div className="flex justify-between">
                {editingLinkIndex !== null && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      deleteLink(editingLinkIndex);
                      setIsLinksDialogOpen(false);
                    }}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" onClick={() => setIsLinksDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={saveLinkChanges}>
                    Сохранить
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* News Feed */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Лента новостей</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {newsItems.map((news) => (
              <Card key={news.id} className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
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
          
          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                Загружаем новости...
              </div>
            </div>
          )}
          
          {/* End of news message */}
          {!hasMore && (
            <div className="text-center py-8">
              <p className="text-gray-500">Все новости загружены</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;