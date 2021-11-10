import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ActionSheet from '../ActionSheet';

// import FileItem from '../../components'

import { useNavigation } from '@react-navigation/native';

import * as mime from 'react-native-mime-types';

import moment from 'moment';

import { StackNavigationProp } from '@react-navigation/stack';

import { COLORS, SIZES } from "../../constants";
// import FileViewer from 'react-native-file-viewer';

export default function FileItem({
    item,
    currentDir,
    multiSelect,
    toggleSelect,
    setTransferDialog,
    setMoveOrCopy,
    deleteSelectedFiles,
    setRenamingFile,
    setRenameDialogVisible,
    setNewFileName,
  }) {
    const navigation = useNavigation();
    const [itemActionsOpen, setItemActionsOpen] = useState(false);
    const docDir = currentDir;
    const itemMime = mime.lookup(item.uri) || ' ';
    const itemType = item.isDirectory ? 'dir' : itemMime.split('/')[0];
    const itemFormat = item.isDirectory ? 'dir' : itemMime.split('/')[1];

    const ItemThumbnail = () => {
        switch (itemType) {
          case 'dir':
            return <MaterialCommunityIcons name="folder" size={35} color={COLORS.black} />;
          case 'image':
        //   case 'video':
        //     return <ThumbnailImage uri={item.uri} />;
        //   case 'audio':
        //     return (
        //       <FontAwesome5 name="file-audio" size={35} color={colors.primary} />
        //     );
        //   case 'font':
        //     return <FontAwesome5 name="font" size={35} color={colors.primary} />;
          case 'application':
            return (
              <MaterialCommunityIcons
                name={'file-outline' || 'file-outline'}
                size={35}
                color={COLORS.black}
              />
            );
          case 'text':
            return (
              <MaterialCommunityIcons
                name={'file-outline' || 'file-outline'}
                size={35}
                color={COLORS.primary}
              />
            );
          default:
            return <MaterialCommunityIcons name="file" size={35} color={COLORS.black} />;
        }
      };
    
      const onPressHandler = () => {
        if (!multiSelect) {
          if (item.isFile()) {
            // navigation.push('PdfViewer')
            navigation.push('PdfViewer', {
              folderName: item.name,
              prevDir: docDir,
            });

            // FileViewer.open(item.path, { showOpenWithDialog: true })
            // .then(() => {
            //     console.log("working")
            // })
            // .catch(error => {
            //     // error
            // });
            
        //   } else if (itemType === 'image') {
        //     navigation.push('ImageGalleryView', {
        //       folderName: item.name,
        //       prevDir: docDir,
        //     });
        //   } else {
        //     navigation.push('MiscFileView', {
        //       folderName: item.name,
        //       prevDir: docDir,
        //     });
          }
        else if (item.isDirectory()) {
               navigation.push('FileManager', {
              folderName: item.name,
              prevDir: docDir,
            });
          }
        } else {
          toggleSelect(item);
        }
      };

    return (
        <View style={styles.container}>
          <ActionSheet
            title={
              multiSelect
                ? 'Choose an action for the selected items'
                : decodeURI(item.name)
            }
            visible={itemActionsOpen}
            actionItems={['Rename', 'Move', 'Copy', 'Share', 'Delete', 'Cancel']}
            itemIcons={[
              'pencil',
              'file-move',
              'file-multiple',
              'share',
              'delete',
              'close',
            ]}
            onClose={setItemActionsOpen}
            onItemPressed={(buttonIndex) => {
              if (buttonIndex === 4) {
                setTimeout(() => {
                  Alert.alert(
                    'Confirm Delete',
                    `Are you sure you want to delete ${
                      multiSelect ? 'selected files' : 'this file'
                    }?`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          if (!multiSelect) deleteSelectedFiles(item);
                          else deleteSelectedFiles();
                        },
                      },
                    ]
                  );
                }, 300);
              } else if (buttonIndex === 3) {
                Sharing.isAvailableAsync().then((canShare) => {
                  if (canShare) {
                    Sharing.shareAsync(docDir + '/' + item.name);
                  }
                });
              } else if (buttonIndex === 2) {
                setMoveOrCopy('Copy');
                if (!multiSelect) toggleSelect(item);
                setTransferDialog(true);
              } else if (buttonIndex === 1) {
                setMoveOrCopy('Move');
                if (!multiSelect) toggleSelect(item);
                setTransferDialog(true);
              } else if (buttonIndex === 0) {
                setRenamingFile(item);
                setRenameDialogVisible(true);
                setNewFileName(item.name);
              }
            }}
            cancelButtonIndex={5}
            modalStyle={{ backgroundColor: COLORS.background2 }}
            itemTextStyle={{ color: COLORS.text }}
            titleStyle={{ color: COLORS.secondary }}
          />
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemLeft}
              activeOpacity={0.5}
              onPress={onPressHandler}
              onLongPress={() => {
                if (!multiSelect) {
                  toggleSelect(item);
                }
              }}
            >
              <View style={styles.itemThumbnail}>
                {itemType && <ItemThumbnail />}
              </View>
              <View style={styles.itemDetails}>
                <Text
                  numberOfLines={1}
                  style={{ ...styles.fileName, color: COLORS.primary }}
                >
                  {decodeURI(item.name)}
                </Text>
                {/* <Text style={{ ...styles.fileDetailText, color: COLORS.secondary }}>
                  {humanFileSize(item.size)}
                </Text> */}
                <Text style={{ ...styles.fileDetailText, color: COLORS.secondary }}>
                  {moment(item.mtime * 1000).fromNow()}
                </Text>
              </View>
            </TouchableOpacity>
            {/**Item Action Button */}
            <View
              style={{
                ...styles.itemActionButton,
                backgroundColor: COLORS.background,
              }}
            >
              <TouchableOpacity onPress={() => setItemActionsOpen(true)}>
                <View style={styles.fileMenu}>
                  {!item.selected ? (
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={24}
                      color={COLORS.primary}
                    />
                  ) : (
                    <MaterialCommunityIcons name="check-square" size={24} color={COLORS.primary} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );

  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 75,
    },
    itemContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
    itemLeft: {
      height: '100%',
      width: '83%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemThumbnail: {
      height: '100%',
      marginLeft: 8,
      width: '17%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: '100%',
      width: '83%',
      overflow: 'hidden',
    },
    itemActionButton: {
      width: '8%',
      height: '100%',
    },
    image: {
      margin: 1,
      width: 40,
      height: 50,
      resizeMode: 'cover',
      borderRadius: 5,
    },
    fileMenu: {
      marginRight: 5,
      height: 60,
      display: 'flex',
      justifyContent: 'center',
    },
    fileName: {
      fontSize: 15,
    },
    fileDetailText: {
      fontSize: 10,
    },
  });