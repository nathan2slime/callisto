import themes, { Theme } from '@cars/themes';
import { ItemSelect, UIButton, UICard, UISelect } from '@cars/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { ModalFooter, Modal, ModalContent } from 'react-native-modals';
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux';

import {
  FilterCar,
  getAllCars,
  ItemCar,
  removeCarService,
} from '../../services/cars';
import { APP_STATE } from '../../store';

import { AlertRemoveTitle, IndexWrapper, ItemWrapper } from './styles';

const Index: FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const theme = themes[useColorScheme() || 'dark'];
  const [filter, setFilter] = useState<FilterCar>();
  const [cars, setCars] = useState<ItemCar[]>([]);
  const [openManageCar, setOpenManageCar] = useState(false);
  const [openRemoveCar, setOpenRemoveCar] = useState(false);

  const [currentCar, setCurrentCar] = useState<ItemCar>();

  const user = useSelector((state: APP_STATE) => state.user);
  const isAdmin = user.data?.admin;

  const filters = [
    {
      slug: 'recent',
      title: 'Recent',
    },
    {
      slug: 'old',
      title: 'Old',
    },
  ];

  useEffect(() => {
    onGetAllCars();
  }, [filter]);

  const onGetAllCars = async () => {
    const { data } = (await getAllCars(filter)) as any;

    if (data.error) {
      Snackbar.show({
        text: data.message.toUpperCase(),
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: theme.foregroundColorLight,
        textColor: theme.errorColorDark,
        fontFamily: theme.fontFamily,
      });
    } else {
      setCars(data.data);
    }
  };

  const modalStyles = getModalStyles(theme);

  const onManageCar = (item: ItemCar) => {
    if (isAdmin) {
      setCurrentCar(item);

      setOpenManageCar(true);
    }
  };

  const onChangeFilter = (item: ItemSelect) => {
    setFilter(item);
  };

  const onCloseModalManageCar = () => {
    setOpenManageCar(false);
    setCurrentCar(undefined);
  };

  const onCloseModalRemoveCar = () => {
    setOpenRemoveCar(false);
    setCurrentCar(undefined);
  };

  const onRemoveCar = async () => {
    const id = currentCar?.id;
    const token = `${user?.token}`;

    setOpenRemoveCar(false);
    setCurrentCar(undefined);

    const data = await removeCarService(token, id);

    Snackbar.show({
      text: data.message.toUpperCase(),
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: theme.foregroundColorLight,
      textColor: data.error ? theme.errorColorDark : theme.primaryColorLight,
      fontFamily: theme.fontFamily,
    });

    if (!data.error) {
      onGetAllCars();
    }
  };

  const onGoEditCar = () => {
    const id = currentCar?.id;

    setOpenManageCar(false);
    setCurrentCar(undefined);

    navigation.navigate('CreateCar', { id });
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView
        nestedScrollEnabled
        style={styles.area}
        contentContainerStyle={styles.scroll}
      >
        <StatusBar
          backgroundColor={theme.primaryColorDark}
          barStyle="dark-content"
        />

        <Modal
          visible={openManageCar}
          modalStyle={modalStyles.editModal}
          animationDuration={0}
          onTouchOutside={() => onCloseModalManageCar()}
          footer={
            <ModalFooter bordered={false}>
              <View style={modalStyles.removeModalFooter}>
                <UIButton
                  onPress={onGoEditCar}
                  style={modalStyles.button}
                  title="Edit"
                />

                <UIButton
                  style={modalStyles.button}
                  onPress={() => {
                    setOpenManageCar(false);
                    setOpenRemoveCar(true);
                  }}
                  color="error"
                  title="Remove"
                />
              </View>
            </ModalFooter>
          }
        >
          <ModalContent>
            <AlertRemoveTitle style={modalStyles.editTitle}>
              {currentCar?.brand} {currentCar?.name} {currentCar?.model}
            </AlertRemoveTitle>
          </ModalContent>
        </Modal>

        <Modal
          animationDuration={0}
          modalStyle={modalStyles.removeModal}
          visible={openRemoveCar}
          onTouchOutside={() => onCloseModalRemoveCar()}
          footer={
            <ModalFooter bordered={false}>
              <View style={modalStyles.removeModalFooter}>
                <UIButton
                  style={modalStyles.button}
                  color="error"
                  title="Remove"
                  onPress={onRemoveCar}
                />
                <UIButton
                  style={modalStyles.button}
                  type="outline"
                  title="Cancel"
                  onPress={() => {
                    setOpenRemoveCar(false);
                    setCurrentCar(undefined);
                  }}
                />
              </View>
            </ModalFooter>
          }
        >
          <ModalContent>
            <AlertRemoveTitle>
              Do you really want to delete the car?
            </AlertRemoveTitle>
          </ModalContent>
        </Modal>

        <IndexWrapper>
          <UISelect
            placeholder="Filter"
            value={filter}
            style={styles.filter}
            data={filters}
            onChange={onChangeFilter}
          />

          <ItemWrapper>
            {cars.map(item => (
              <UICard
                {...item}
                key={item.id}
                onPress={() => onManageCar(item)}
                style={styles.itemCar}
                price={item.price.toLocaleString('en-US', {
                  currency: item.currency,
                  style: 'currency',
                })}
              />
            ))}
          </ItemWrapper>
        </IndexWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  filter: {
    maxWidth: 400,
  },
  itemCar: {
    marginTop: 20,
  },
});

const getModalStyles = (theme: Theme) =>
  StyleSheet.create({
    editModal: {
      width: 300,
      minHeight: 230,
      backgroundColor: theme.foregroundColorLight,
    },
    removeModal: {
      width: 300,
      minHeight: 270,
      backgroundColor: theme.foregroundColorLight,
    },
    removeModalFooter: {
      width: '100%',
      flex: 1,
      flexDirection: 'column',
      padding: 20,
    },
    button: {
      width: '100%',
      marginTop: 12,
    },
    editTitle: {
      textAlign: 'center',
    },
  });
