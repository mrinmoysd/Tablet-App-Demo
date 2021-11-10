import React, { useState } from 'react';
import Dialog from 'react-native-dialog';

import {COLORS, SIZES, FONTS} from '../../constants'

export const NewFolderDialog = ({visible,
    createDirectory,
    setFolderDialogVisible}) => {
        const [folderName, setFolderName] = useState('');
        return (
            <Dialog.Container
              contentStyle={{ backgroundColor: COLORS.white }}
              visible={visible}
            >
              <Dialog.Title style={{ color: COLORS.gray }}>
                Add New Folder
              </Dialog.Title>
              <Dialog.Input
                style={{ color: COLORS.black }}
                onChangeText={(text) => setFolderName(text)}
              ></Dialog.Input>
              <Dialog.Button
                label="Cancel"
                onPress={() => setFolderDialogVisible(false)}
              />
              <Dialog.Button
                label="OK"
                onPress={() => {
                  createDirectory(folderName);
                  setFolderName('');
                }}
              />
            </Dialog.Container>
          );
    }