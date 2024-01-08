import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StockWidget = ({ ipo, isSelected, handleIPOSelection }) => {
  return (
    <View style={styles.widgetContainer}>
      <TouchableOpacity
        style={isSelected ? [styles.widget, styles.selectedWidget] : styles.widget}
        onPress={() => handleIPOSelection(ipo.symbol)}
      >
        <Text style={styles.companyName}>{ipo.companyName}</Text>
        <Text style={styles.shares}>Shares: {ipo.shares}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    marginBottom: 15,
  },
  widget: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectedWidget: {
    backgroundColor: '#e0f7fa',
  },
  companyName: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  shares: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default StockWidget;
