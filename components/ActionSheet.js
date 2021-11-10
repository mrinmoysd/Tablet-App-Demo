import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, SIZES } from '../constants';

const ActionSheet = ({
    visible,
    onClose,
    actionItems,
    title,
    cancelButtonIndex,
    modalStyle,
    itemStyle,
    itemTextStyle,
    titleStyle,
    itemIcons,
    onItemPressed,
  }) => {
    const ActionListItem = ({ item, index }) => {
        // const { colors } = useAppSelector((state) => state.theme.theme);
        return (
          <TouchableOpacity
            style={[styles.itemStyle, itemStyle]}
            onPress={() => {
              onClose(false);
              if (Platform.OS === 'ios') {
                setTimeout(() => {
                  onItemPressed(index);
                }, 1000);
              } else {
                onItemPressed(index);
              }
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={itemIcons[index]}
                size={24}
                color={index === cancelButtonIndex ? '#ff453a' : COLORS.black}
              />
            </View>
            <Text
              style={[
                styles.itemText,
                itemTextStyle,
                cancelButtonIndex &&
                  cancelButtonIndex === index && { color: '#ff453a' },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      };

    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            onClose(false);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              onClose(false);
            }}
          >
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={[styles.modalBody, modalStyle]}>
            {title && (
              <View style={styles.titleContainer}>
                <Text style={[styles.titleText, titleStyle]}>{title}</Text>
              </View>
            )}
            <FlatList
              data={actionItems}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => (
                <ActionListItem item={item} index={index} />
              )}
            />
          </View>
        </Modal>
      );
  }

  export default ActionSheet;

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBody: {
    width: SIZES.width,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: 5,
  },
  titleContainer: {
    width: SIZES.width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Poppins_500Medium',
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
  },
  itemStyle: {
    width: SIZES.width,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    fontFamily: 'Poppins_400Regular',
    color: 'gray',
    fontSize: 15,
  },
  iconContainer: {
    marginLeft: 5,
    marginRight: 10,
  },
});