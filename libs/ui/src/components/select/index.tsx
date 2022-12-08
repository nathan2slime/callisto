import React, { FC, ReactElement, useRef, useState } from 'react';
import { ViewProps } from 'react-native';
import { FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {
  ButtonSelect,
  ButtonText,
  DropdownItem,
  DropdownWrapper,
  IconStyles,
} from './styles';

export type ItemSelect = {
  title: string;
  slug: string;
};

type Position = {
  top: number;
  left: number;
};

type UISelectProps = {
  data?: ItemSelect[];
  placeholder?: string;
  style?: ViewProps['style'];
  value?: ItemSelect;
  onChange?: (item: ItemSelect) => void;
};

export const UISelect: FC<UISelectProps> = ({
  data,
  value,
  style,
  placeholder,
  onChange,
}) => {
  const _select: any = useRef();

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [width, setWidth] = useState(0);

  const toggleDropdown = () => (visible ? setVisible(false) : open());

  const open = () => {
    _select.current.measure(
      (_: any, __: any, width: any, height: any, px: any, py: any) => {
        setPosition({
          top: py + height + 10,
          left: px,
        });

        setWidth(width);
      }
    );

    setVisible(true);
  };

  const onSelectItem = (item: ItemSelect) => {
    onChange!(item);
    setVisible(false);
  };

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <DropdownWrapper style={[position, { width }]}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <DropdownItem
                  activeOpacity={1}
                  hasSeparator={index % 2 == 0}
                  onPress={() => onSelectItem(item)}
                >
                  <ButtonText>{item.title}</ButtonText>
                </DropdownItem>
              )}
              keyExtractor={(item, _) => item.slug}
            />
          </DropdownWrapper>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <ButtonSelect
      ref={_select}
      accessibilityState={{ selected: visible }}
      style={style}
      onPress={toggleDropdown}
    >
      {renderDropdown()}

      <ButtonText disabled={!value}>{value?.title || placeholder}</ButtonText>

      <IconStyles size={20} name="md-chevron-down-outline" />
    </ButtonSelect>
  );
};

UISelect.defaultProps = {
  data: [],
  onChange: () => {},
  placeholder: '',
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
});
