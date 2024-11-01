import React, { FC, useCallback } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import { Device } from 'react-native-ble-plx';

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={modalStyle.ctaButton}
    >
      <Text style={modalStyle.ctaButtonText}>{item.item.name}</Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      {devices.length === 0 ? (
        <SafeAreaView style={modalStyle.modalTitle}>
          <Text style={modalStyle.modalTitleText}>Searching for devices</Text>
          <View style={modalStyle.modalFlatlistContiner}>
            <ActivityIndicator color="#f43f5e" size={35} />
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={modalStyle.modalTitle}>
          <Text style={modalStyle.modalTitleText}>
            Tap on a device to connect
          </Text>
          <FlatList
            data={devices}
            contentContainerStyle={modalStyle.modalFlatlistContiner}
            renderItem={renderDeviceModalListItem}
          />
        </SafeAreaView>
      )}
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    height: 500,
  },
  modalTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fafafa',
    marginTop: 40,
  },
  ctaButton: {
    backgroundColor: '#f43f5e',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DeviceModal;
