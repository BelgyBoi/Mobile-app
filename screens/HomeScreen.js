import React, {useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'; 
import ProductCard from '../components/ProductCard.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import SectionedMultiSelect from 'react-native-sectioned-multi-select'; 
import GlobalContainer from '../components/GlobalContainer.js'; // Added this import
import layout from '../styles/layout.js';
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';


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
  const [filtersVisible, setFiltersVisible] = useState(false);
  
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
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
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
  
    // Determine which brands and types have at least one product in the entire dataset
    const allBrandsWithProducts = new Set();
    const allTypesWithProducts = new Set();
    products.forEach(product => {
        (product.categories || []).forEach(catId => {
            if (brandNames[catId] !== undefined && catId !== "") { // Ensure it's a defined brand and not the "All" placeholder
                allBrandsWithProducts.add(catId);
            }
            if (carTypeNames[catId] !== undefined && catId !== "") { // Ensure it's a defined type and not the "All" placeholder
                allTypesWithProducts.add(catId);
            }
        });
    });
  
    // Dynamically calculate available brands and types based on current selections
    const availableBrands = new Set(); // Brands available given selectedTypes
    const availableTypes = new Set();  // Types available given selectedBrands
  
    products.forEach((p) => {
      const productCategories = p.categories || [];
      // Determine if this product's brands should be added to the available set
      if (selectedTypes.length === 0 || selectedTypes.some(typeId => productCategories.includes(typeId))) {
        productCategories.forEach(catId => {
          if (brandNames[catId] !== undefined && catId !== "") { // Is a known brand and not the "All" ID
            availableBrands.add(catId);
          }
        });
      }
      // Determine if this product's types should be added to the available set
      if (selectedBrands.length === 0 || selectedBrands.some(brandId => productCategories.includes(brandId))) {
        productCategories.forEach(catId => {
          if (carTypeNames[catId] !== undefined && catId !== "") { // Is a known type and not the "All" ID
            availableTypes.add(catId);
          }
        });
      }
    });
  
    // Prepare items for the brand selector
    const brandSelectorItems = Object.entries(brandNames)
        .filter(([id, name]) => {
            if (id === "") return false; // Exclude "All categories" from selectable items here
            // Show brand if it generally has products AND (no types are selected OR it's available with selected types)
            return allBrandsWithProducts.has(id) &&
                   (selectedTypes.length === 0 || availableBrands.has(id));
        })
        .map(([id, name]) => ({ id, name }));
  
    // Prepare items for the car type selector
    const carTypeSelectorItems = Object.entries(carTypeNames)
        .filter(([id, name]) => {
            if (id === "") return false; // Exclude "All car types" from selectable items here
            // Show type if it generally has products AND (no brands are selected OR it's available with selected brands)
            return allTypesWithProducts.has(id) &&
                   (selectedBrands.length === 0 || availableTypes.has(id));
        })
        .map(([id, name]) => ({ id, name }));
    
  return (
    <>
    <Modal
      visible={filtersVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setFiltersVisible(false)}
      >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          width: '90%',
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 20
        }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setFiltersVisible(false)}
            style={{ position: 'absolute', top: 10, right: 10 }}>
            <Text style={{ fontSize: 22 }}>✖</Text>
          </TouchableOpacity>
          {/* --- FILTERS GO HERE --- */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Filters</Text>
      
            {/* Example: Brands Dropdown */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 5 }}>Brands</Text>
              <SectionedMultiSelect
                items={brandSelectorItems}
                IconRenderer={Icon}
                uniqueKey='id'
                selectText='Select brands'
                onSelectedItemsChange={setSelectedBrands}
                selectedItems={selectedBrands}
                showDropDowns={true}
                showChips={false}
              />
            </View>
      
            {/* Example: Car Types Dropdown */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ marginBottom: 5 }}>Car types</Text>
              <SectionedMultiSelect
                items={carTypeSelectorItems}
                IconRenderer={Icon}
                uniqueKey='id'
                selectText='Select car types'
                onSelectedItemsChange={setSelectedTypes}
                selectedItems={selectedTypes}
                showDropDowns={true}
                showChips={false}
              />
            </View>
      
            {/* You can add more dropdowns or filters here if needed */}
      
            {/* Optionally: Add a "Clear all filters" button here */}
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: '#e6e6e6',
                padding: 10,
                borderRadius: 10,
                alignItems: 'center'
              }}
              onPress={() => {
                setSelectedBrands([]);
                setSelectedTypes([]);
              setSearchQuery('');
            }}>
            <Text>Clear all filters</Text>
          </TouchableOpacity>
          
          {/* Optionally: Add an "Apply" button if you want to only filter after closing */}
        </View>
      </View>
    </Modal>

    <GlobalContainer>
      <Text style={[styles.text, styles.heading]}>Discover excellence</Text>

      <TouchableOpacity
        onPress={() => setFiltersVisible(true)}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
        <Icon name="filter-list" size={30} color="#ACACAC" />
        </TouchableOpacity>
        
        {/*search bar with clear button*/}
      <View style={styles.searchContainer}>
        <ScrollView horizontal>
          <TextInput
            style={[styles.text, styles.searchInput]}
            placeholder="Search for a model..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          </ScrollView>  
          <TouchableOpacity
          style={styles.clearInputButton}
          onPress={() => setSearchQuery("")}
          >
          <Text style={[styles.text, styles.closeIcon]}>✖</Text>
          </TouchableOpacity>
      </View>

        {/* section with selected filters and clear button */}
        <View style={styles.filterList}>
          {/* Selected filters shown with x to remove*/}
        <ScrollView horizontal style={styles.selectedFiltersContainer}>
            {selectedBrands.map((brandId) => ( 
            <TouchableOpacity
              key={brandId}
              style={styles.selectedFilter}
              onPress={() => setSelectedBrands(selectedBrands.filter((id) => id !== brandId))}
            > 
              <Text style={styles.text}>{brandNames[brandId]} ✖</Text>
            </TouchableOpacity>
            ))}

          {selectedTypes.map((typeId) => (
            <TouchableOpacity
              key={typeId}
              style={styles.selectedFilter}
              onPress={() => setSelectedTypes(selectedTypes.filter((id) => id !== typeId))}
            >
              <Text style={styles.text} >{carTypeNames[typeId]} ✖</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>

         {/* Clear all filters button */}
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => {
            setSelectedBrands([]);
            setSelectedTypes([]);
            setSearchQuery("");
          }}
        >
         <Text style={styles.text} >Clear all</Text>
        </TouchableOpacity>
        </View>
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
    </GlobalContainer>
    </>
  );
};


const styles = StyleSheet.create({
    text: {
      ...textStyles.defaultText,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
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
    filterList: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      borderWidth: 1,
      borderColor: '#ACACAC',
      borderRadius: 5,
      minHeight: 50,
      maxWidth: '100%',
      alignItems: 'center',
      alignContent: 'center',
    },
    selectedFiltersContainer: {
      flexWrap: 'wrap',
      maxWidth: '80%',
    },
    selectedFilter: {
      borderWidth: 1,
      borderColor: '#ACACAC',
      borderRadius: 5,
      justifyContent: 'center',
      padding: 5,
      marginRight: 5,
    },
    searchContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ACACAC',
      maxWidth: '100%',
      padding: 5,
      alignItems: 'center',
      maxHeight: 50,
      justifyContent: 'space-between',
      borderRadius: 5,
    },
    searchInput: {
      fontSize: 16,
      // color: '#ACACAC',
    },
    clearInputButton: {
      width: '7%',
      alignContent: 'center',
    },
    closeIcon: {
      fontSize: 20,
      // color: '#ACACAC',
    },

  });
  

export default HomeScreen;