import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system'
import { Asset } from "expo-asset"

async function openLocalDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../asset/init.db")).uri,
    FileSystem.documentDirectory + 'SQLite/init.db'
  );
  return SQLite.openDatabase('init.db');
}

export default openLocalDatabase