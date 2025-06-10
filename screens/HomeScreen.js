import React, {useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'; 
import ProductCard from '../components/ProductCard.js';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


const brandNames = {
  "": "All categories",
  "68444c55b0c0076e8699b94e": "Audi",
  "6845cf83214ed46f963b299a": "Bently",
  "6845cfb56707be14e0048647": "Cupra",
  "6845cf606707be14e004627b": "Ducati",
  "6845cf8d7fe53dfc9ac0e423": "Sköda",
  "6845cf6a2ef9aa29163be295": "Lamborghini",
  "684450e31cb96c5fd34c6ca9": "Porsche",
  "6845cf7b44fc80bc6be23273": "Seat",
  "68445226758959fc72631e5f": "Volkswagen",
};

const carTypeNames = {
  "": "All car types",
  "684885acb2bae49aef2a0d82": "Convertible",
  "6848860a217e818993eb18f4": "Coupé",
  "684885eb33221d2e93272ee7": "Crossover",
  "6848866c5c41b9d8b4cb91f6": "Electric",
  "6844533ed9772c95bf18c4cb": "Hatchback",
  "68488678d81cc4f740d765ec": "Hybrid",
  "684887ae8d35fc4edbdec587": "Hypercar",
  "684887e901dce25da4936409": "Limousine",
  "6848881d3587e1b1bd86d336": "Microcar",
  "684885bbd14eacd38c52712b": "Minivan",
  "68488656dac2dd8efb386bee": "Pickup truck",
  "68444cadf97a1e1680e8ab5f": "Sedan",
  "684454dac8bb2cf6f45c1fd3": "Sport",
  "684886342916de2735bf5ef5": "Station wagon",
  "684887a7970d714e23007c90": "Supercar",
  "684450c1261a970eef94cf4b": "SUV",
  "684886b43587e1b1bd85e632": "Van",
};

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/67ac9ae63a5b794c54acd2f7/products",
      {
        headers: {
          Authorization:
          "Bearer 87929257d6887767501086aeed11c32ac4e586deadfd3dbf091789544ce74153",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100, // Convert cents to dollars
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            categories: item.product.fieldData.category || [],
          }))  
        );
      })  
      .catch(console.error);
    }, []);

    const filteredProducts = products.filter((p) => {
      const brandMatch = selectedBrands.length === 0 ||
        selectedBrands.some((brand) => p.categories.includes(brand));

      const typeMatch = selectedTypes.length === 0 ||
        selectedTypes.some((type) => p.categories.includes(type));

      const searchMatch = searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());

      return brandMatch && typeMatch && searchMatch;
    });

    const availableBrands = new Set();
    const availableTypes = new Set();

    products.forEach((p) => {
      if (selectedTypes.length === 0 || selectedTypes.some((type) => p.categories.includes(type))){
        p.categories.forEach((c) => availableBrands.add(c));
      }
      if (selectedBrands.length ===0 || selectedBrands.some((brand) => p.categories.includes(brand))) {
        p.categories.forEach((c) => availableTypes.add(c));
      }
    });
    
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Discover excellence</Text>
        
        {/*search bar with clear button*/}
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a model..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity
            style={{ width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setSearchQuery("")}
            >
              <Text style={{ fontSize: 18 }}>✖</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Multi-select for brands*/}
        <SectionedMultiSelect
          items={Object.entries(brandNames).map(([id, name]) => ({
            id,
            name,
            disabled: !availableBrands.has(id),
          }))}
          IconRenderer={Icon}
          uniqueKey='id'
          selectText='Selct brands'
          onSelectedItemsChange={setSelectedBrands}
          selectedItems={selectedBrands}
          showDropDowns={true}   
        />
          
          {/* Multi-select for car types*/}
        <SectionedMultiSelect
          items={Object.entries(carTypeNames).map(([id, name]) => ({
            id,
            name,
            disabled: !availableTypes.has(id),
          }))}
          IconRenderer={Icon}
          uniqueKey='id'
          selectText='Select car types'
          onSelectedItemsChange={setSelectedTypes}
          selectedItems={selectedTypes}
          showDropDowns={true}
          />

          {/* Selected filters shown with x to remove*/}
          <View style={styles.selectedFiltersContainer}>
            {selectedBrands.map((brandId) => ( 
            <TouchableOpacity
              key={brandId}
              style={styles.selectedFilter}
              onPress={() => setSelectedBrands(selectedBrands.filter((id) => id !== brandId))}
            > 
              <Text>{brandNames[brandId]} ✖</Text>
            </TouchableOpacity>
            ))}

          {selectedTypes.map((typeId) => (
            <TouchableOpacity
              key={typeId}
              style={styles.selectedFilter}
              onPress={() => setSelectedTypes(selectedTypes.filter((id) => id !== typeId))}
            >
              <Text>{carTypeNames[typeId]} ✖</Text>
            </TouchableOpacity>
          ))}
          </View>

        {/* Clear all filters button */}
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => {
            setSelectedBrands([]);
            setSelectedTypes([]);
            setSearchQuery("");
          }}
        >
         <Text>Clear all</Text>
        </TouchableOpacity>

        {/* Product cards */}
        <ScrollView style={styles.cardContainer}>
            <View style={styles.row}>   
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onPress={() => navigation.navigate('Details', product)}
                />
              ))}   
            </View>
          </ScrollView>
        <StatusBar style="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      justifyContent: 'center', // Vertically center
      alignItems: 'center', // Horizontally center
      maxWidth: '95%',
      maxHeight: '95%',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
    },
    pickerContainer: {
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    cardContainer: {
      width: '100%',
      marginTop: 20,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  });
  

export default HomeScreen;