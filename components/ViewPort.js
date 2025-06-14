import { View, ScrollView, SafeAreaView } from 'react-native';
import colors from '../styles/colors.js';

export default function ViewPort({ children, scroll, style }) {
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background,  }, style]}>
      <Wrapper
        style={{ flex: 1 }}
        contentContainerStyle={scroll }
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
}
