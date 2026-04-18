import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HOME_STATS } from '@/constants/home';

export function Header() {
  return (
    <View className="flex-row items-center justify-between px-6 h-16 w-full bg-white/80 border-b border-slate-100">
      <View className="flex-row items-center gap-3">
        <MaterialCommunityIcons name={"terminal" as any} size={24} color="#1d4ed8" />
        <Text className="text-xl font-extrabold text-slate-900 tracking-tight">PyLearn 12</Text>
      </View>
      
      <View className="flex-row items-center gap-4">
        <TouchableOpacity className="p-2 rounded-full hover:bg-blue-50/50">
          <MaterialCommunityIcons name="magnify" size={24} color="#64748b" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
          <Image 
            source={HOME_STATS.user.profilePhoto} 
            className="w-full h-full"
            contentFit="cover"
          />
        </View>
      </View>
    </View>
  );
}
