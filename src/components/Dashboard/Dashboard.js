import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import StockWidget from './StockWidget';
import { fetchRealTimeData, fetchCurrencyRates } from '../../services/stockService';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import { NotificationProvider, useNotifications } from '../../contexts/NotificationContext';
import { Picker } from '@react-native-picker/picker';

const Dashboard = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { enableNotifications, toggleNotifications } = useNotifications();
  const [allUpcomingIPOs, setAllUpcomingIPOs] = useState([]);
  const [currencyRates, setCurrencyRates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('companyName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedIPOs, setSelectedIPOs] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ipoData = await fetchRealTimeData();
        const currencyData = await fetchCurrencyRates();

        // Filter out duplicate IPOs based on symbol
        const uniqueIPOs = [...new Set(ipoData.map((ipo) => ipo.symbol))].map((symbol) => {
          return ipoData.find((ipo) => ipo.symbol === symbol);
        });

        setAllUpcomingIPOs(uniqueIPOs);
        setCurrencyRates(currencyData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const filteredIPOs = allUpcomingIPOs.filter(
    (ipo) => ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedIPOs = filteredIPOs.sort((a, b) => {
    const aValue = sortBy === 'shares' ? parseInt(a[sortBy]) : a[sortBy];
    const bValue = sortBy === 'shares' ? parseInt(b[sortBy]) : b[sortBy];
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
  };

  const handleIPOSelection = (symbol) => {
    // Toggle IPO selection
    if (selectedIPOs.includes(symbol)) {
      setSelectedIPOs(selectedIPOs.filter((ipo) => ipo !== symbol));
    } else {
      setSelectedIPOs([...selectedIPOs, symbol]);
    }
  };

  const handleRefresh = async () => {
    try {
      const ipoData = await fetchRealTimeData();
      const currencyData = await fetchCurrencyRates();

      // Filter out duplicate IPOs based on symbol
      const uniqueIPOs = [...new Set(ipoData.map((ipo) => ipo.symbol))].map((symbol) => {
        return ipoData.find((ipo) => ipo.symbol === symbol);
      });

      setAllUpcomingIPOs(uniqueIPOs);
      setCurrencyRates(currencyData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleRemoveIPOs = () => {
    // Filter out selected IPOs from allUpcomingIPOs
    const updatedIPOs = allUpcomingIPOs.filter((ipo) => !selectedIPOs.includes(ipo.symbol));
    setAllUpcomingIPOs(updatedIPOs);
    setSelectedIPOs([]); // Clear selected IPOs after removal
  };

  const renderIPOItem = ({ item, index }) => (
    <StockWidget
      ipo={item}
      index={index}
      handleIPOSelection={handleIPOSelection}
      isSelected={selectedIPOs.includes(item.symbol)}
    />
  );

  return (
    <ThemeProvider>
      <NotificationProvider>
        <FlatList
          contentContainerStyle={styles.scrollContainer}
          data={[{ key: 'dashboard' }]} // Dummy data to make FlatList work
          renderItem={() => (
            <View style={styles.dashboardContainer}>
              <Text style={styles.heading}>Dashboard</Text>

              {/* Theme Selector */}
              <View key="theme-selector" style={styles.section}>
                <Text>Theme:</Text>
                <Picker selectedValue={theme} onValueChange={toggleTheme} style={styles.picker}>
                  <Picker.Item label="Light" value="light" />
                  <Picker.Item label="Dark" value="dark" />
                </Picker>
              </View>

              {/* Notifications Toggle */}
              <View key="notifications-toggle" style={styles.section}>
                <Text>Notifications:</Text>
                <Switch value={enableNotifications} onValueChange={toggleNotifications} />
              </View>

              {/* Display Currency Rates */}
              <View key="currency-rates" style={styles.section}>
                <Text style={styles.heading}>Currency Rates</Text>
                <FlatList
                  data={currencyRates}
                  keyExtractor={(item) => item.symbol}
                  renderItem={({ item }) => (
                    <View key={item.symbol} style={styles.currencyWidget}>
                      <Text style={styles.currencySymbol}>{item.symbol}</Text>
                      <Text style={styles.currencyRate}>Rate: {item.rate}</Text>
                    </View>
                  )}
                />
              </View>

              {/* UPCOMING IPOs */}
              <View key="upcoming-ipos" style={styles.upcomingIPOsContainer}>
                <Text style={styles.heading}>Upcoming IPOs</Text>

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
                    <Picker.Item label="Company Name" value="companyName" />
                    <Picker.Item label="Shares" value="shares" />
                    {/* Add more options as needed */}
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

                {/* Displayed IPOs */}
                <FlatList
                  data={sortedIPOs}
                  keyExtractor={(item) => item.symbol}
                  renderItem={renderIPOItem}
                />
              </View>

              {/* Refresh Button */}
              <TouchableOpacity
                key="refresh-button"
                style={{ ...styles.button, backgroundColor: 'green', marginTop: 10 }}
                onPress={handleRefresh}
                underlayColor="darkgreen"
                onMouseOver={() => setIsButtonHovered(true)}
                onMouseOut={() => setIsButtonHovered(false)}
              >
                <Text style={styles.buttonText}>Refresh Data</Text>
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity
                key="logout-button"
                style={{
                  ...styles.button,
                  backgroundColor: 'red',
                  ...(isButtonHovered && styles.buttonHover),
                }}
                onPress={onLogout}
                underlayColor="#45a049"
                onMouseOver={() => setIsButtonHovered(true)}
                onMouseOut={() => setIsButtonHovered(false)}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>

              {/* Remove Selected IPOs Button */}
              <TouchableOpacity
                key="remove-ipos-button"
                style={{ ...styles.button, backgroundColor: 'blue', marginTop: 10 }}
                onPress={handleRemoveIPOs}
                underlayColor="darkblue"
                onMouseOver={() => setIsButtonHovered(true)}
                onMouseOut={() => setIsButtonHovered(false)}
              >
                <Text style={styles.buttonText}>Remove Selected IPOs</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </NotificationProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  upcomingIPOsContainer: {
    width: '100%',
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
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  },
  currencyWidget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyRate: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default Dashboard;
