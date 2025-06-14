import { View, ScrollView, SafeAreaView } from 'react-native';

export default function ViewPort({ children, scroll, style }) {
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Wrapper
        style={[{ flex: 1, paddingHorizontal: 16 }, style]}
        contentContainerStyle={scroll && { paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}
