import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Switch, TouchableOpacity } from 'react-native';
import StockWidget from './StockWidget';
import { fetchRealTimeData } from '../../services/stockService';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { NotificationProvider, useNotifications } from '../../contexts/NotificationContext';
import { Picker } from '@react-native-picker/picker';

const Dashboard = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { enableNotifications, toggleNotifications } = useNotifications();
  const [allRealTimeData, setAllRealTimeData] = useState([]);
  const [displayedWidgets, setDisplayedWidgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('symbol');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRealTimeData();
        setAllRealTimeData(data);
        setDisplayedWidgets(data); // Initially, displayed widgets are the same as all data
      } catch (error) {
        console.error('Error fetching real-time data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters and sorting logic to allRealTimeData
    let filteredStocks = [...allRealTimeData];

    filteredStocks = filteredStocks.filter(
      (stock) => stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredStocks = filteredStocks.sort((a, b) => {
      const aValue = sortBy === 'latestPrice' ? parseFloat(a[sortBy]) : a[sortBy];
      const bValue = sortBy === 'latestPrice' ? parseFloat(b[sortBy]) : b[sortBy];

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    setDisplayedWidgets([...filteredStocks]);
  }, [allRealTimeData, searchTerm, sortBy, sortOrder]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
  };

  const handleWidgetSelection = (symbol) => {
    // Toggle widget selection
    if (selectedWidgets.includes(symbol)) {
      setSelectedWidgets(selectedWidgets.filter((widget) => widget !== symbol));
    } else {
      setSelectedWidgets([...selectedWidgets, symbol]);
    }
  };

  const handleRemoveWidgets = () => {
    // Filter out selected widgets from displayed widgets
    const updatedWidgets = displayedWidgets.filter((stock) => !selectedWidgets.includes(stock.symbol));
    setDisplayedWidgets([...updatedWidgets]);
    setSelectedWidgets([]); // Clear selected widgets after removal
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <View style={styles.dashboardContainer}>
          <Text style={styles.heading}>Dashboard</Text>

          {/* Theme Selector */}
          <View style={styles.section}>
            <Text>Theme:</Text>
            <Picker
              selectedValue={theme}
              onValueChange={toggleTheme}
              style={styles.picker}
            >
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Dark" value="dark" />
            </Picker>
          </View>

          {/* Notifications Toggle */}
          <View style={styles.section}>
            <Text>Notifications:</Text>
            <Switch
              value={enableNotifications}
              onValueChange={toggleNotifications}
            />
          </View>

          {/* Search */}
          <View style={styles.section}>
            <Text>Search: </Text>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>

          {/* Sort By */}
          <View style={styles.section}>
            <Text>Sort By: </Text>
            <Picker
              selectedValue={sortBy}
              onValueChange={(value) => handleSort(value)}
              style={styles.picker}
            >
              <Picker.Item label="Symbol" value="symbol" />
              <Picker.Item label="Latest Price" value="latestPrice" />
            </Picker>
            <Picker
              selectedValue={sortOrder}
              onValueChange={(value) => handleSortOrder(value)}
              style={styles.picker}
            >
              <Picker.Item label="Ascending" value="asc" />
              <Picker.Item label="Descending" value="desc" />
            </Picker>
          </View>

          {/* Displayed Widgets */}
          <FlatList
            data={displayedWidgets}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item, index }) => (
              <StockWidget
                stock={item}
                index={index}
                handleWidgetSelection={handleWidgetSelection}
                isSelected={selectedWidgets.includes(item.symbol)}
              />
            )}
          />

          {/* Logout Button */}
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: 'red', ...(isButtonHovered && styles.buttonHover) }}
            onPress={onLogout}
            underlayColor="#45a049" // Set the color when pressed
            onMouseOver={() => setIsButtonHovered(true)}
            onMouseOut={() => setIsButtonHovered(false)}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          {/* Remove Selected Widgets Button */}
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: 'blue', marginTop: 10 }}
            onPress={handleRemoveWidgets}
            underlayColor="darkblue" // Set the color when pressed
            onMouseOver={() => setIsButtonHovered(true)}
            onMouseOut={() => setIsButtonHovered(false)}
          >
            <Text style={styles.buttonText}>Remove Selected Widgets</Text>
          </TouchableOpacity>
        </View>
      </NotificationProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    width: '100%',
  },
  input: {
    margin: 10,
    padding: 8,
    fontSize: 16,
    borderWidth: 1,
    width: '100%',
  },
  picker: {
    height: 50,
    width: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  button: {
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)', // Lighter red when hovered
  },
});

export default Dashboard;
