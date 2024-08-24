import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserByToken } from '../../services/loginService';

const Sidebar = ({ onProfilePress }: { onProfilePress: () => void }) => {
  const navigation = useNavigation();
  const [privLvl, setPrivLvl] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserByToken();
        setPrivLvl(user.privLvl);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Stupid hack to get the text centered >:(
  const labMonitors = "   Add/Edit\nLab Monitors" 

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Main')}>
        <Image source={require('../../assets/logo.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onProfilePress}>
        <Image source={require('../../assets/user-icon.png')} style={styles.icon} />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      {(privLvl > 4) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Labs')}>
          <Image source={require('../../assets/labs-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>{labMonitors}</Text>
        </TouchableOpacity>
      )}
      {( privLvl >= 1 && privLvl <= 3) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LabSchedules')}>
          <Image source={require('../../assets/schedule-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Schedule</Text>
        </TouchableOpacity>
      )}
      {(privLvl <= 3 ) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Chat')}>
          <Image source={require('../../assets/chat-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>
      )}
      {(privLvl >= 1 && privLvl <= 3) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ScanItem')}>
          <Image source={require('../../assets/scan-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Scanner</Text>
        </TouchableOpacity>
      )}
      {(privLvl >= 1) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LogHistory')}>
          <Image source={require('../../assets/logs-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>View Logs</Text>
        </TouchableOpacity>
      )}
      {(privLvl >= 4) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Reports')}>
          <Image source={require('../../assets/reports-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Reports</Text>
        </TouchableOpacity>
      )}
      {(privLvl === 5) && (
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Admin')}>
          <Image source={require('../../assets/admin-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Admin</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
          <Image source={require('../../assets/help-icon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Sample')}>
          <Image source={require('../../assets/favicon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Sample</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Example')}>
          <Image source={require('../../assets/favicon.png')} style={styles.icon} />
          <Text style={styles.menuText}>Example</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    backgroundColor: '#002147', // Initial color before gradient
    alignItems: 'center',
    paddingVertical: 20,
    height: '100%', // Ensure the sidebar covers the full height
    backgroundImage: 'linear-gradient(to bottom, #002147, #000000)', // Blue to black gradient
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Sidebar;
