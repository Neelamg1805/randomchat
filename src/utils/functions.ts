import { Platform } from 'react-native';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  AndroidUpdateType,
  IAUInstallStatus
} from 'sp-react-native-in-app-updates';
export const checkForUpdates = async () => {
  const inAppUpdates = new SpInAppUpdates(
    false
  );
  try {
    await inAppUpdates.checkNeedsUpdate().then((result :any) => {
      try {
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === "android") {
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          if (Platform.OS === "ios") {
            updateOptions = {
              title: "Update available",
              message:
                "There is a new version of the app available on the App Store, do you want to update it?",
              buttonUpgradeText: "Update",
              buttonCancelText: "Cancel",
            };
          }
          inAppUpdates.addStatusUpdateListener((downloadStatus :any) => {
            console.log("download status", downloadStatus);
            if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
              console.log("downloaded");
              inAppUpdates.installUpdate();
              inAppUpdates.removeStatusUpdateListener((finalStatus:any) => {
                console.log("final status", finalStatus);
              });
            }
          });
          inAppUpdates.startUpdate(updateOptions);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};