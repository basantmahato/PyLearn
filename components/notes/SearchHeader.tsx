import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function SearchHeader() {
  return (
    <View className="mb-12">
      <Text className="text-5xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
        Chapter Notes
      </Text>
      
      <View className="relative">
        <View className="absolute left-4 top-0 bottom-0 flex justify-center z-10 p-4">
          <MaterialCommunityIcons name="magnify" size={24} color="#717785" />
        </View>
        <TextInput 
          className="w-full bg-surface-container-low rounded-2xl py-4 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant"
          placeholder="Search syllabus, concepts, or chapters..."
          placeholderTextColor="#414753"
        />
      </View>
    </View>
  );
}
