import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type ScreenName = keyof RootStackParamList;

type BottomNavProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  active: ScreenName;
};

type NavItemProps = {
  label: ScreenName;
  icon: string;
  navigation: StackNavigationProp<RootStackParamList>;
  active: ScreenName;
};

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  navigation,
  active,
}) => {
  const isActive = active === label;

  const handlePress = () => {
    if (!isActive) {
      navigation.navigate(label as any);
    }
  };

  return (
    <TouchableOpacity style={styles.navItem} onPress={handlePress}>
      <Text style={isActive ? styles.navIconActive : styles.navIcon}>
        {icon}
      </Text>
      <Text style={isActive ? styles.navLabelActive : styles.navLabel}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export const BottomNav: React.FC<BottomNavProps> = ({
  navigation,
  active,
}) => {
  return (
    <View style={styles.bottomNav}>
      <NavItem label="Home" icon="🏠" navigation={navigation} active={active} />
      <NavItem label="Practice" icon="💬" navigation={navigation} active={active} />
      <NavItem label="Progress" icon="📈" navigation={navigation} active={active} />
      <NavItem label="Ranking" icon="🏆" navigation={navigation} active={active} />
      <NavItem label="Profile" icon="👤" navigation={navigation} active={active} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: StatusBar.currentHeight || 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#2F5FED',
    fontWeight: '600',
  },
});
