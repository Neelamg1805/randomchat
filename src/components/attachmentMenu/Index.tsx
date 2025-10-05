import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../../utils/colors';

interface AttachmentMenuProps {
  onClose: () => void;
}

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({ onClose }) => {
  const attachmentOptions = [
    { id: 'picture', label: 'Picture', icon: '📷' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'audio', label: 'Audio Message', icon: '🎤' },
  ];
  const handleOptionPress = (optionId: string) => {
    onClose();
  };
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          {attachmentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleOptionPress(option.id)}>
              <View style={styles.optionIcon}>
                <Text style={styles.optionIconText}>{option.icon}</Text>
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  menu: {
    backgroundColor: colors.PURPLE_PRIMARY,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIconText: {
    fontSize: 24,
  },
  optionLabel: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AttachmentMenu;
