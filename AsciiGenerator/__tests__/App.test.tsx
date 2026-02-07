/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import App from '../App';
import figlet from 'figlet';
import { useColorScheme } from 'react-native';

// Mock figlet
jest.mock('figlet', () => ({
  text: jest.fn((input, options, callback) => {
    // Simulate figlet's behavior
    if (input === 'test') {
      callback(null, ' _____\n|  _  |\n| | | |\n| |_| |\n|_____|');
    } else {
      callback(null, `ASCII for: ${input}`);
    }
  }),
  fonts: [], // Mock fonts array, as it's accessed by the component
}));

// Mock @react-native-clipboard/clipboard
jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

// Mock useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  ...jest.requireActual('react-native/Libraries/Utilities/useColorScheme'),
  default: jest.fn(),
}));


describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (useColorScheme as jest.Mock).mockReturnValue('light');
  });

  it('renders correctly', async () => {
    let tree;
    await act(async () => {
      tree = ReactTestRenderer.create(<App />).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('generates ASCII art when text input changes', async () => {
    let root;
    await act(async () => {
      root = ReactTestRenderer.create(<App />);
    });
    const textInput = root.root.findByProps({ placeholder: 'Enter text here' });

    // Simulate text input change
    await act(async () => {
      textInput.props.onChangeText('Hello');
    });

    // Check if figlet.text was called
    expect(figlet.text).toHaveBeenCalledWith(
      'Hello',
      expect.any(Object), // We can refine this to check options if needed
      expect.any(Function),
    );
  });

  it('generates ASCII art when font selection changes', async () => {
    let root;
    await act(async () => {
      root = ReactTestRenderer.create(<App />);
    });
    const textInput = root.root.findByProps({ placeholder: 'Enter text here' });

    await act(async () => {
      textInput.props.onChangeText('World');
    });

    const fontButton = root.root.findAllByType('TouchableOpacity').find(node =>
      node.props.children[0]?.props.children === 'Big'
    );

    if (fontButton) {
        await act(async () => {
            fontButton.props.onPress();
        });
    }

    // Manually trigger the generation
    await act(async () => {
      root.root.instance.generateAsciiArt();
    });

    // Check if figlet.text was called with the new font
    expect(figlet.text).toHaveBeenLastCalledWith(
      'World',
      expect.objectContaining({ font: 'Big' }),
      expect.any(Function),
    );
  });

  it('copies ASCII art to clipboard', async () => {
    let root;
    await act(async () => {
      root = ReactTestRenderer.create(<App />);
    });
    const textInput = root.root.findByProps({ placeholder: 'Enter text here' });

    await act(async () => {
      textInput.props.onChangeText('ClipboardTest');
    });

    // Manually trigger the generation
    await act(async () => {
      root.root.instance.generateAsciiArt();
    });

    const copyButton = root.root.findAllByType('TouchableOpacity').find(node =>
      node.props.children[0]?.props.children === 'Copy to Clipboard'
    );

    if (copyButton) {
        await act(async () => {
            copyButton.props.onPress();
        });
    }

    expect(require('@react-native-clipboard/clipboard').setString).toHaveBeenCalledWith('ASCII for: ClipboardTest');
  });
});
