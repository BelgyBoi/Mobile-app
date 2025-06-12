import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import GlobalContainer from '../globalElements/GlobalContainer.js';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Optional: for dropdown icons

const PreferencesScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system'); // 'system', 'light', 'dark'
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // 'en', 'es', 'fr'

  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const themeOptions = [
    { label: 'System Default', value: 'system' },
    { label: 'Light Mode', value: 'light' },
    { label: 'Dark Mode', value: 'dark' },
  ];

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
  ];

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);

  const handleSelectTheme = (value) => {
    setSelectedTheme(value);
    setThemeDropdownOpen(false);
  };

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    setLanguageDropdownOpen(false);
  };

  return (
    <GlobalContainer>
      <ScrollView style={styles.container}>
        <Text style={[styles.headerTitle, textStyles.heading1]}>Preferences</Text>

        {/* Notification Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, textStyles.heading2]}>Notifications</Text>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, textStyles.defaultText]}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notificationsEnabled ? colors.white : colors.surface}
              ios_backgroundColor={colors.border}
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          </View>
        </View>

        {/* Theme Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, textStyles.heading2]}>Appearance</Text>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, textStyles.defaultText]}>Theme</Text>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                setLanguageDropdownOpen(false); // Close other dropdown
              }}
            >
              <Text style={textStyles.defaultText}>{themeOptions.find(opt => opt.value === selectedTheme)?.label}</Text>
              <Icon name={themeDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {themeDropdownOpen && (
            <View style={styles.dropdownListContainer}>
              {themeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownItem,
                    selectedTheme === option.value && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectTheme(option.value)}
                >
                  <Text style={[
                    textStyles.defaultText,
                    selectedTheme === option.value ? styles.dropdownItemSelectedText : styles.dropdownItemText
                  ]}>
                    {option.label}
                  </Text>
                  {selectedTheme === option.value && <Icon name="check" size={16} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Language Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, textStyles.heading2]}>Language</Text>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, textStyles.defaultText]}>App Language</Text>
            <TouchableOpacity
              style={styles.dropdownHeader}
              onPress={() => {
                setLanguageDropdownOpen(!languageDropdownOpen);
                setThemeDropdownOpen(false); // Close other dropdown
              }}
            >
              <Text style={textStyles.defaultText}>{languageOptions.find(opt => opt.value === selectedLanguage)?.label}</Text>
              <Icon name={languageDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {languageDropdownOpen && (
            <View style={styles.dropdownListContainer}>
              {languageOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownItem,
                    selectedLanguage === option.value && styles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectLanguage(option.value)}
                >
                  <Text style={[
                    textStyles.defaultText,
                    selectedLanguage === option.value ? styles.dropdownItemSelectedText : styles.dropdownItemText
                  ]}>
                    {option.label}
                  </Text>
                  {selectedLanguage === option.value && <Icon name="check" size={16} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: colors.text,
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.primary,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemNoBorder: { // For last item in a section if needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    color: colors.text,
    fontSize: 16,
  },
  // Dropdown styles
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background, // Slightly different from section background
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 150, // Ensure dropdown header has some width
  },
  dropdownListContainer: {
    marginTop: 5,
    backgroundColor: colors.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItemText: {
    color: colors.text,
  },
  dropdownItemSelected: {
    // backgroundColor: colors.primaryMuted, // A light primary color for selection
  },
  dropdownItemSelectedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default PreferencesScreen;
