
import React, { useState } from 'react';
import { ArrowLeft, Key, LogOut, Calendar, User, Bell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com'
  });
  
  const [horoscopeData, setHoroscopeData] = useState({
    dateOfBirth: '1992-03-21',
    zodiacSign: 'aries',
    preferredStyle: 'poetic',
    weeklyFocusMode: false
  });
  
  const [notificationData, setNotificationData] = useState({
    pushNotifications: true,
    emailReminders: false,
    deliveryTime: '08:00'
  });

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoroscopeChange = (field: string, value: string | boolean) => {
    setHoroscopeData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: string | boolean) => {
    setNotificationData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      navigate('/');
    }
  };

  return (
    <div className="cosmic-gradient min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="p-2 rounded-xl bg-white/80 glass-effect border border-violet-200 shadow-sm mr-4 hover:bg-white/90"
        >
          <ArrowLeft className="h-5 w-5 text-violet-600" />
        </Button>
        <h1 className="text-xl font-bold text-violet-800 flex-1 text-center mr-12">Settings</h1>
      </header>

      <main className="px-6 pb-8">
        {/* Profile Section */}
        <section className="mb-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-violet-600 mr-2" />
            <h2 className="text-lg font-semibold text-violet-800">Profile</h2>
          </div>
          
          <Card className="bg-white/80 glass-effect border-violet-100 shadow-lg">
            <CardContent className="p-5 space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-violet-700 mb-2">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  className="bg-white/90 border-violet-200 text-violet-800 font-medium focus:ring-violet-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-violet-700 mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="bg-white/90 border-violet-200 text-violet-800 font-medium focus:ring-violet-400 focus:border-transparent"
                />
              </div>
              
              <Button
                variant="outline"
                className="w-full bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200"
              >
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </section>

        <div className="h-px bg-violet-200 mb-6"></div>

        {/* Horoscope Preferences Section */}
        <section className="mb-6">
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-violet-600 mr-2" />
            <h2 className="text-lg font-semibold text-violet-800">Horoscope Preferences</h2>
          </div>
          
          <Card className="bg-white/80 glass-effect border-violet-100 shadow-lg">
            <CardContent className="p-5 space-y-4">
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-medium text-violet-700 mb-2">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={horoscopeData.dateOfBirth}
                  onChange={(e) => handleHoroscopeChange('dateOfBirth', e.target.value)}
                  className="bg-white/90 border-violet-200 text-violet-800 font-medium focus:ring-violet-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-violet-700 mb-2">
                  Zodiac Sign
                </Label>
                <Select value={horoscopeData.zodiacSign} onValueChange={(value) => handleHoroscopeChange('zodiacSign', value)}>
                  <SelectTrigger className="bg-white/90 border-violet-200 text-violet-800 font-medium focus:ring-violet-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {zodiacSigns.map((sign) => (
                      <SelectItem key={sign} value={sign}>
                        {sign.charAt(0).toUpperCase() + sign.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-violet-700 mb-3">
                  Preferred Style
                </Label>
                <RadioGroup
                  value={horoscopeData.preferredStyle}
                  onValueChange={(value) => handleHoroscopeChange('preferredStyle', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poetic" id="poetic" />
                    <Label htmlFor="poetic" className="text-violet-800 font-medium">Poetic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classic" id="classic" />
                    <Label htmlFor="classic" className="text-violet-800 font-medium">Classic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily-tip" id="daily-tip" />
                    <Label htmlFor="daily-tip" className="text-violet-800 font-medium">Daily Tip</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyFocus" className="text-violet-800 font-medium">
                  Enable Weekly Focus Mode
                </Label>
                <Switch
                  id="weeklyFocus"
                  checked={horoscopeData.weeklyFocusMode}
                  onCheckedChange={(checked) => handleHoroscopeChange('weeklyFocusMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="h-px bg-violet-200 mb-6"></div>

        {/* Notifications Section */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-violet-600 mr-2" />
            <h2 className="text-lg font-semibold text-violet-800">Notifications</h2>
          </div>
          
          <Card className="bg-white/80 glass-effect border-violet-100 shadow-lg">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications" className="text-violet-800 font-medium">
                  Daily Push Notifications
                </Label>
                <Switch
                  id="pushNotifications"
                  checked={notificationData.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="emailReminders" className="text-violet-800 font-medium">
                  Daily Email Reminders
                </Label>
                <Switch
                  id="emailReminders"
                  checked={notificationData.emailReminders}
                  onCheckedChange={(checked) => handleNotificationChange('emailReminders', checked)}
                />
              </div>
              
              <div>
                <Label htmlFor="deliveryTime" className="text-sm font-medium text-violet-700 mb-2">
                  Preferred Delivery Time
                </Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={notificationData.deliveryTime}
                  onChange={(e) => handleNotificationChange('deliveryTime', e.target.value)}
                  className="bg-white/90 border-violet-200 text-violet-800 font-medium focus:ring-violet-400 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Actions */}
        <section className="space-y-4">
          <Button
            onClick={handleLogout}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleDeleteAccount}
            className="w-full text-red-500 font-medium text-sm py-2 hover:text-red-600 hover:bg-red-50"
          >
            Delete Account
          </Button>
        </section>
      </main>

      <div className="h-8"></div>
    </div>
  );
};

export default Settings;
