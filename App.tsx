import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import DeviceModal from "./components/DeviceConnectionModal";
import useBLE from "./hooks/useBLE";
import { Heartrate } from "./skia/index";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };
  
  return (
        <Heartrate /> 
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.heartRateTitleWrapper}>
    //     {connectedDevice ? (
    //       <>
    //         {/* <PulseIndicator /> */}
    //         <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
    //         <Text style={styles.heartRateText}>{heartRate} bpm</Text>
    //       </>
    //     ) : (<>
    //       <Text style={styles.heartRateTitleText}>
    //         Heart Rate Monitor
    //       </Text>
    //       <Text style={styles.heartRateSubtitleText}>
    //       Pair your smartwatch to track your heart rate in real-time.
    //       </Text>
    //     </>
    //     )}
    //   </View>
    //   <TouchableOpacity
    //     onPress={connectedDevice ? disconnectFromDevice : openModal}
    //     style={styles.ctaButton}
    //   >
    //     <Text style={styles.ctaButtonText}>
    //       {connectedDevice ? "Disconnect" : "Connect"}
    //     </Text>
    //   </TouchableOpacity>
    //   <DeviceModal
    //     closeModal={hideModal}
    //     visible={isModalVisible}
    //     connectToPeripheral={connectToDevice}
    //     devices={allDevices}
    //   />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
  },
  heartRateSubtitleText: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    color: "#64748b",
    marginTop: 8
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#f43f5e",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;