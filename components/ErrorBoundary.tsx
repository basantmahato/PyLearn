import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught error:", error, errorInfo);
  }

  private handleRestart = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-background items-center justify-center p-8">
          <View className="w-20 h-20 rounded-full bg-error/10 items-center justify-center mb-6">
            <MaterialCommunityIcons name="alert-circle" size={40} color="#ba1a1a" />
          </View>
          
          <Text className="text-2xl font-black text-on-surface text-center mb-2">
            Something went wrong
          </Text>
          
          <Text className="text-on-surface-variant text-center mb-8">
            We apologize for the inconvenience. Please restart the app to continue learning.
          </Text>

          <Pressable
            onPress={this.handleRestart}
            className="bg-primary px-8 py-4 rounded-2xl active:opacity-80"
          >
            <Text className="text-white font-bold text-lg">Try Again</Text>
          </Pressable>

          {__DEV__ && this.state.error && (
            <View className="mt-8 p-4 bg-surface-container-low rounded-xl w-full">
              <Text className="text-xs text-error font-mono">
                {this.state.error.message}
              </Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}
