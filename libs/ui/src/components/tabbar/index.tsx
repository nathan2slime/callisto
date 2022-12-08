import React, { FC } from 'react';

import { TabBarButton, TabBarIcon, TabBarWrapper } from './styles';

type UITabBarRoute = {
  [key: string]: {
    active: string;
    inactive: string;
  };
};

type UITabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
  icons: UITabBarRoute;
};

export const UITabBar: FC<UITabBarProps> = ({
  state,
  descriptors,
  navigation,
  icons,
}) => {
  return (
    <TabBarWrapper>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];

        const selected = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!selected && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          const icon = icons[route.name];

          if (!icon) return;

          return (
            <TabBarIcon
              name={selected ? icon.active : icon.inactive}
              size={24}
              accessibilityState={{ selected }}
            />
          );
        };

        const icon = getIcon();

        if (icon) {
          return (
            <TabBarButton
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={Math.random()}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              {icon}
            </TabBarButton>
          );
        }
      })}
    </TabBarWrapper>
  );
};
