// wrapper
import React from 'react';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function ViewPort({ children, scroll = true, keyboardAvoid = false }) {
  const Wrapper = scroll ? ScrollView : React.Fragment;
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  const content = (
    <SafeAreaView style={{ flex: 1 }}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );

  if (keyboardAvoid) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}
