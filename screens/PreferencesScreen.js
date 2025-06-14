// screen
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import layoutStyles from '../styles/layout.js';
import colors from '../styles/colors.js';
import textStyles from '../styles/text.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ViewPort from '../components/ViewPort.js'; 
import BaselineText from '../components/BaselineText.js';

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

  // PreferencesScreen.js (inside your component)
  return (
    <ViewPort scroll>
      <View style={layoutStyles.screen}>
        {/* Notifications */}
        <View>
          <BaselineText style={textStyles.highlight}>
            Notifications
          </BaselineText>
          <View style={layoutStyles.settingRow}>
            <BaselineText style={textStyles.defaultText}>
              Enable Notifications
            </BaselineText>
            <Switch
              trackColor={{ false: colors.ghosted, true: colors.secondaryDark }}
              thumbColor={notificationsEnabled ? colors.secondary : colors.primary}
              ios_backgroundColor={colors.border}
              onValueChange={toggleNotifications}
              value={notificationsEnabled}
            />
          </View>
        </View>

        {/* Appearance */}
        <View>
          <BaselineText style={textStyles.highlight}>
            Appearance
          </BaselineText>
          <View style={layoutStyles.settingRow}>
            <BaselineText style={textStyles.defaultText}>
              Theme
            </BaselineText>
            <TouchableOpacity
              style={layoutStyles.dropdownHeader}
              onPress={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                setLanguageDropdownOpen(false);
              }}
            >
              <BaselineText style={textStyles.defaultText}>
                {themeOptions.find(o => o.value === selectedTheme).label}
              </BaselineText>
              <Icon
                name={themeDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {themeDropdownOpen && (
            <View style={layoutStyles.dropdownListContainer}>
              {themeOptions.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    layoutStyles.dropdownItem,
                    selectedTheme === opt.value && layoutStyles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectTheme(opt.value)}
                >
                  <BaselineText
                    style={[
                      textStyles.defaultText,
                      selectedTheme === opt.value
                        ? layoutStyles.dropdownItemSelectedText
                        : textStyles.defaultText
                    ]}
                  >
                    {opt.label}
                  </BaselineText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Language */}
        <View >
          <BaselineText style={textStyles.highlight}>
            Language
          </BaselineText>
          <View style={layoutStyles.settingRow}>
            <BaselineText style={textStyles.defaultText}>
              App Language
            </BaselineText>
            <TouchableOpacity
              style={layoutStyles.dropdownHeader}
              onPress={() => {
                setLanguageDropdownOpen(!languageDropdownOpen);
                setThemeDropdownOpen(false);
              }}
            >
              <BaselineText style={textStyles.defaultText}>
                {languageOptions.find(o => o.value === selectedLanguage).label}
              </BaselineText>
              <Icon
                name={languageDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {languageDropdownOpen && (
            <View style={layoutStyles.dropdownListContainer}>
              {languageOptions.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    layoutStyles.dropdownItem,
                    selectedLanguage === opt.value && layoutStyles.dropdownItemSelected
                  ]}
                  onPress={() => handleSelectLanguage(opt.value)}
                >
                  <BaselineText
                    style={[
                      textStyles.defaultText,
                      selectedLanguage === opt.value
                        ? layoutStyles.dropdownItemSelectedText
                        : textStyles.defaultText
                    ]}
                  >
                    {opt.label}
                  </BaselineText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </ViewPort>
  );
};


export default PreferencesScreen;
