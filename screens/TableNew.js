import React , { useState, useRef, useEffect }from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
    BackHandler,
    Text
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from 'react-native-dialog';
import { NewFolderDialog } from '../components/files/NewFolderDialog';
import RNFS from 'react-native-fs'
import { FileItem } from "../components";

// import FileViewer from 'react-native-file-viewer';

import useSelectionChange from '../hooks/useSelectionChange';

const TableNew = ({route}) => {

  const url = 'https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf';
  const localFile = `${RNFS.DocumentDirectoryPath}/testfile.pdf`;

  const options = {
    fromUrl: url,
    toFile: localFile
  };

  const [files, setFiles] = useState([]);
  // const { multiSelect, allSelected } = useSelectionChange(files);
  const { multiSelect, allSelected } = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newFileActionSheet, setNewFileActionSheet] = useState(false);
  const [folderDialogVisible, setFolderDialogVisible] = useState(false);
  const docDir = RNFS.DocumentDirectoryPath || '';
  const [currentDir, setCurrentDir] = useState(
    route?.params?.prevDir !== undefined ? route?.params?.prevDir : docDir
  );
  console.log("current dir is ",currentDir)

  useEffect(() => {
    // RNFS.downloadFile(options).promise
    // .then(() => {
    //   // success
    // })
    // .catch(error => {
    //   // error
    // });
    getFiles();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <FileItem
      item={item}
      currentDir={item.path}
      toggleSelect={toggleSelect}
      multiSelect={multiSelect}
      // setTransferDialog={setDestinationDialogVisible}
      // setMoveOrCopy={setMoveOrCopy}
      // deleteSelectedFiles={deleteSelectedFiles}
      // setRenamingFile={setRenamingFile}
      // setRenameDialogVisible={setRenameDialogVisible}
      // setNewFileName={setNewFileName}
    ></FileItem>
    )
  }

  const toggleSelect = (item) => {
    if (item.selected && selectedFiles.includes(item)) {
      const index = selectedFiles.indexOf(item);
      if (index > -1) {
        selectedFiles.splice(index, 1);
      }
    } else if (!item.selected && !selectedFiles.includes(item)) {
      setSelectedFiles((prev) => [...prev, item]);
    }
    setFiles(
      files.map((i) => {
        if (item === i) {
          i.selected = !i.selected;
        }
        return i;
      })
    );
  };

  const toggleSelectAll = () => {
    if (!allSelected) {
      setFiles(
        files.map((item) => {
          item.selected = true;
          return item;
        })
      );
      setSelectedFiles(files);
    } else {
      setFiles(
        files.map((item) => {
          item.selected = false;
          return item;
        })
      );
      setSelectedFiles([]);
    }
  };

  const getFiles = async () => {
    RNFS.readDir(currentDir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    .then((result) => {
      // console.log('GOT RESULT', result);
      // stat the first file
      // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      return Promise.all(result);
    })
    .then((statResult) => {
      // console.log("temp files is",statResult)
      
      let tempfiles = statResult.map((file) => {
        
        const name = file.isDirectory()
          ? file.path
              .split('/')
              .pop()
          : file.path.split('/').pop();

        return Object({
          ...file,
          name,
          selected: false,
        });
      });
      setFiles(tempfiles);
      // if (statResult.isFile()) {
      //   // if we have a file, read it
      //   return RNFS.readFile(statResult, 'utf8');
      // }
      // if(statResult[0].isDirectory()) {
      //   // console.log('GOT RESULT', statResult);
      // }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  async function createDirectory(name) {

    // let path = RNFS.DocumentDirectoryPath+'/'+currentDir+'/'+name;
    let path = currentDir+'/'+name;
    RNFS.mkdir(path).then((result)=>{
      console.log('Created');
      getFiles();
      setFolderDialogVisible(false);
      }).catch((err) => {
      console.log('err', err)
      });
    // FileSystem.makeDirectoryAsync(currentDir + '/' + name)
    //   .then(() => {
    //     // getFiles();
    //     setFolderDialogVisible(false);
    //   })
    //   .catch(() => {
    //     handleSetSnack({
    //       message: 'Folder could not be created or already exists.',
    //     });
    //   });
  }

  return (
    
    <View style={{ ...styles.container, backgroundColor: COLORS.background }}>
      <NewFolderDialog
        visible={folderDialogVisible}
        createDirectory={createDirectory}
        setFolderDialogVisible={setFolderDialogVisible}
      />
      <View style={styles.topButtons}>
        <View style={styles.topLeft}>
        {/* <TouchableOpacity onPress={() => console.log("add file clicked")}> */}
          <TouchableOpacity onPress={() => setFolderDialogVisible(true)}>
            <MaterialCommunityIcons name="folder-plus" size={30} color={COLORS.primary} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => setNewFileActionSheet(true)}>
            <Feather name="folder-plus" size={30} color={colors.primary} />
          </TouchableOpacity> */}
        </View>
        {multiSelect && (
          <View style={styles.topRight}>
            <TouchableOpacity
              // onPress={() => {
              //   setDestinationDialogVisible(true);
              //   setMoveOrCopy('Move');
              // }}
              onPress={() => {
                console.log("clicked")
              }}
            >
              <MaterialCommunityIcons
                name="file-move-outline"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity 
            // onPress={toggleSelectAll}
            onPress={() => {
              console.log("clicked")
            }}
            >
              <MaterialCommunityIcons
                style={{ marginLeft: 10 }}
                // name={allSelected ? 'check-square' : 'square'}
                name='check-square'
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ ...styles.fileList, borderTopColor: COLORS.primary }}>
        <FlatList
          data={files}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
      {multiSelect && (
        <View
          style={{ ...styles.bottomMenu, backgroundColor: COLORS.background }}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="export-variant"
              size={28}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
const _keyExtractor = (item) => item.name;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
    paddingTop: SIZES.statusBarHeight,
  },
  topButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  topLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '25%',
  },
  topRight: {
    width: '75%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fileList: {
    flex: 1,
    borderTopWidth: 0.5,
    marginTop: 15,
    marginHorizontal: 5,
  },
  bottomMenu: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  contentStyle: {
    width: SIZES.width,
    height: SIZES.height * 0.8,
    padding: 0,
    margin: 0,
  },
  overlayStyle: {
    width: SIZES.width,
    padding: 0,
    margin: 0,
  },
});


export default TableNew