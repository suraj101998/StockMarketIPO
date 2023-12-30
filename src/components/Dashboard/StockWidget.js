import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StockWidget = ({ stock, isSelected, handleWidgetSelection }) => {
  return (
    <View style={styles.widgetContainer}>
      <TouchableOpacity
        style={isSelected ? [styles.widget, styles.selectedWidget] : styles.widget}
        onPress={() => handleWidgetSelection(stock.symbol)}
      >
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.price}>Last Price: ${stock.latestPrice.toFixed(2)}</Text>
        {/* Add more information as needed */}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedWidget: {
    backgroundColor: '#e0f7fa',
  },
  symbol: {
    fontSize: 18,
    marginEnd: 10,
    color: '#333',
  },
  price: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default StockWidget;
