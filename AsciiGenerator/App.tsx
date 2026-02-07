import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import figlet from 'figlet';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputText, setInputText] = useState('');
  const [asciiArt, setAsciiArt] = useState('');
  const [selectedFont, setSelectedFont] = useState('Standard'); // Placeholder for font selection, default to Standard

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1C1C1C' : '#F3F3F3',
  };

  const generateAsciiArt = () => {
    if (inputText.trim() === '') {
      setAsciiArt('');
      return;
    }

    figlet.text(
      inputText,
      {
        font: selectedFont as figlet.Fonts, // Cast to figlet.Fonts
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          console.error('Something went wrong...', err);
          return;
        }
        setAsciiArt(data || '');
      },
    );
  };

  useEffect(() => {
    // Regenerate ASCII art whenever inputText or selectedFont changes
    generateAsciiArt();
  }, [inputText, selectedFont]);

  const copyToClipboard = () => {
    Clipboard.setString(asciiArt);
    alert('ASCII art copied to clipboard!');
  };

  // Font options - for now, just a few hardcoded ones.
  // In a real app, you'd fetch these or have a more robust selection UI.
  const fontOptions = ['Standard', 'Big', 'Block', 'Slant', 'Ghost'];

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        keyboardShouldPersistTaps="handled">
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            ASCII Art Generator
          </Text>

          <TextInput
            style={[styles.textInput, {
              color: isDarkMode ? '#FFFFFF' : '#000000',
              backgroundColor: isDarkMode ? '#1C1C1C' : '#F3F3F3',
              borderColor: isDarkMode ? '#333333' : '#CCCCCC',
            }]}
            placeholder="Enter text here"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            onChangeText={setInputText}
            value={inputText}
            multiline
          />

          {/* Font Selection */}
          <View style={styles.fontSelectorContainer}>
            <Text style={[styles.sectionDescription, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
              Select Font:
            </Text>
            <View style={styles.fontButtonsContainer}>
              {fontOptions.map(font => (
                <TouchableOpacity
                  key={font}
                  style={[
                    styles.fontButton,
                    selectedFont === font && styles.selectedFontButton,
                  ]}
                  onPress={() => setSelectedFont(font)}>
                  <Text
                    style={[
                      styles.fontButtonText,
                      selectedFont === font && styles.selectedFontButtonText,
                    ]}>
                    {font}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {asciiArt ? (
            <View style={styles.asciiOutputContainer}>
              <Text
                selectable={true}
                style={[
                  styles.asciiOutputText,
                  { color: isDarkMode ? '#FFFFFF' : '#000000' },
                ]}>
                {asciiArt}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  fontSelectorContainer: {
    marginBottom: 20,
  },
  fontButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  fontButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedFontButton: {
    backgroundColor: '#007AFF', // Highlight color
    borderColor: '#007AFF',
  },
  fontButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedFontButtonText: {
    color: '#fff',
  },
  asciiOutputContainer: {
    marginTop: 30,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  asciiOutputText: {
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }), // Use monospace font for ASCII art
    fontSize: 12,
    lineHeight: 14,
    color: '#000',
  },
  copyButton: {
    marginTop: 15,
    backgroundColor: '#28a745', // Green copy button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
