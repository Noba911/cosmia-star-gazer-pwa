
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Key, LogOut, Calendar, User, Bell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, loading, updating, updateProfile } = useUserProfile();
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: ''
  });
  
  const [horoscopeData, setHoroscopeData] = useState({
    dateOfBirth: '',
    zodiacSign: 'aries',
    preferredStyle: 'poetic',
    weeklyFocusMode: false
  });
  
  const [notificationData, setNotificationData] = useState({
    pushNotifications: true,
    emailReminders: false,
    deliveryTime: '08:00'
  });

  // Update local state when profile data loads
  useEffect(() => {
    if (profile) {
      console.log('Setting form data from profile:', profile);
      setProfileData({
        fullName: profile.full_name || '',
        email: '' // We'll get this from auth
      });
      
      setHoroscopeData({
        dateOfBirth: profile.date_of_birth || '',
        zodiacSign: profile.zodiac_sign || 'aries',
        preferredStyle: profile.style_preference || 'poetic',
        weeklyFocusMode: false // This field doesn't exist in DB yet
      });
    }
  }, [profile]);

  // Get user email from auth
  useEffect(() => {
    const getAuthData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setProfileData(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }
    };
    getAuthData();
  }, []);

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

  const handleSaveProfile = async () => {
    console.log('Saving profile changes...');
    const success = await updateProfile({
      full_name: profileData.fullName,
    });
    
    if (success) {
      console.log('Profile saved successfully');
    }
  };

  const handleSaveHoroscope = async () => {
    console.log('Saving horoscope preferences...');
    const success = await updateProfile({
      date_of_birth: horoscopeData.dateOfBirth,
      zodiac_sign: horoscopeData.zodiacSign as any,
      style_preference: horoscopeData.preferredStyle as any,
    });
    
    if (success) {
      console.log('Horoscope preferences saved successfully');
    }
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    } else {
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      // TODO: Implement account deletion
      toast({
        title: "Info",
        description: "Account deletion is not yet implemented",
      });
    }
  };

  if (loading) {
    return (
      <div className="cosmic-gradient min-h-screen flex items-center justify-center">
        <div className="text-violet-800">Loading profile...</div>
      </div>
    );
  }

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
                  disabled
                  className="bg-gray-100 border-violet-200 text-violet-600 font-medium cursor-not-allowed"
                />
                <p className="text-xs text-violet-600 mt-1">Email cannot be changed here</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveProfile}
                  disabled={updating}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {updating ? 'Saving...' : 'Save Profile'}
                </Button>
                <Button
                  variant="outline"
                  className="bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
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

              <Button
                onClick={handleSaveHoroscope}
                disabled={updating}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              >
                {updating ? 'Saving...' : 'Save Horoscope Preferences'}
              </Button>
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
              
              <p className="text-sm text-violet-600">
                Note: Notification preferences are not yet saved to the database
              </p>
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
