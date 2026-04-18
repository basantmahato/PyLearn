import { TouchableOpacity, Text } from "react-native";

interface TopicPillProps {
  topic: string;
}

export function TopicPill({ topic }: TopicPillProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      className="bg-surface-container-high px-4 py-2 rounded-full mr-2 mb-3"
    >
      <Text className="text-sm font-semibold text-on-secondary-container">
        {topic}
      </Text>
    </TouchableOpacity>
  );
}
