// screen
import React, {useEffect, useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import  { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard.js';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import textStyles from '../styles/text.js';
import buttonStyles from '../styles/button.js';
import layoutStyles from '../styles/layout.js';
import colors from '../styles/colors.js';
import CloseButton from '../components/CloseButton.js';
import ViewPort from '../components/ViewPort.js';
import BaselineText from '../components/BaselineText.js';


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

const ProductScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [carTypeDropdownOpen, setCarTypeDropdownOpen] = useState(false);

  // Handler for selecting/deselecting a brand
  const handleBrandSelect = (brandId) => {
    setSelectedBrands(prevSelectedBrands =>
      prevSelectedBrands.includes(brandId)
        ? prevSelectedBrands.filter(id => id !== brandId)
        : [...prevSelectedBrands, brandId]
    );
  };
  
  // Handler for selecting/deselecting a car type
  const handleCarTypeSelect = (typeId) => {
    setSelectedTypes(prevSelectedTypes =>
      prevSelectedTypes.includes(typeId)
        ? prevSelectedTypes.filter(id => id !== typeId)
        : [...prevSelectedTypes, typeId]
    );
    // setBrandDropdownOpen(false); 
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
  };
  
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

    const filteredProducts = useMemo(() => products.filter((p) => {
      const brandMatch = selectedBrands.length === 0 ||
        selectedBrands.some((brand) => p.categories.includes(brand));

      const typeMatch = selectedTypes.length === 0 ||
        selectedTypes.some((type) => p.categories.includes(type));

      const searchMatch = searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());

      return brandMatch && typeMatch && searchMatch;
    }), [products, selectedBrands, selectedTypes, searchQuery]);
  
    // Determine which brands and types have at least one product in the entire dataset
    const allBrandsWithProducts = useMemo(() => {
      const set = new Set();
      products.forEach(product => {
          (product.categories || []).forEach(catId => {
              if (brandNames[catId] !== undefined && catId !== "") {
                  set.add(catId);
              }
          });
      });
      return set;
    }, [products]);

    const allTypesWithProducts = useMemo(() => {
      const set = new Set();
      products.forEach(product => {
          (product.categories || []).forEach(catId => {
              if (carTypeNames[catId] !== undefined && catId !== "") {
                  set.add(catId);
              }
          });
      });
      return set;
    }, [products]);
  
    // Dynamically calculate available brands and types based on current selections
    const availableBrands = useMemo(() => {
      const set = new Set();
      products.forEach((p) => {
        const productCategories = p.categories || [];
        if (selectedTypes.length === 0 || selectedTypes.some(typeId => productCategories.includes(typeId))) {
          productCategories.forEach(catId => {
            if (brandNames[catId] !== undefined && catId !== "") {
              set.add(catId);
            }
          });
        }
      });
      return set;
    }, [products, selectedTypes]);

    const availableTypes = useMemo(() => {
      const set = new Set();
      products.forEach((p) => {
        const productCategories = p.categories || [];
        if (selectedBrands.length === 0 || selectedBrands.some(brandId => productCategories.includes(brandId))) {
          productCategories.forEach(catId => {
            if (carTypeNames[catId] !== undefined && catId !== "") {
              set.add(catId);
            }
          });
        }
      });
      return set;
    }, [products, selectedBrands]);
  
    // Prepare items for the brand selector
    const brandSelectorItems = useMemo(() => Object.entries(brandNames)
        .filter(([id, name]) => {
            if (id === "") return false; 
            return allBrandsWithProducts.has(id) &&
                   (selectedTypes.length === 0 || availableBrands.has(id));
        })
        .map(([id, name]) => ({ id, name })), 
        [allBrandsWithProducts, selectedTypes, availableBrands, brandNames]);
  
    // Prepare items for the car type selector
    const carTypeSelectorItems = useMemo(() => Object.entries(carTypeNames)
        .filter(([id, name]) => {
            if (id === "") return false; 
            return allTypesWithProducts.has(id) &&
                   (selectedBrands.length === 0 || availableTypes.has(id));
        })
        .map(([id, name]) => ({ id, name })),
        [allTypesWithProducts, selectedBrands, availableTypes, carTypeNames]);

    // Effect to auto-deselect incompatible filters
    useEffect(() => {
      if (products.length === 0) return; // Don't run if products aren't loaded

      let changed = false;
      // Check selected brands for compatibility
      if (selectedTypes.length > 0) {
        const newSelectedBrands = selectedBrands.filter(brandId => availableBrands.has(brandId));
        if (newSelectedBrands.length !== selectedBrands.length) {
          setSelectedBrands(newSelectedBrands);
          changed = true;
        }
      }

      // Check selected types for compatibility
      if (selectedBrands.length > 0) {
        const newSelectedTypes = selectedTypes.filter(typeId => availableTypes.has(typeId));
        if (newSelectedTypes.length !== selectedTypes.length) {
          setSelectedTypes(newSelectedTypes);
          changed = true;
        }
      }

      if (selectedTypes.length === 0 && selectedBrands.length > 0) {
        const generallyAvailableBrands = new Set();
        products.forEach(p => {
          (p.categories || []).forEach(catId => {
            if (brandNames[catId] !== undefined && catId !== "") generallyAvailableBrands.add(catId);
          });
        });
        const newSelectedBrands = selectedBrands.filter(brandId => generallyAvailableBrands.has(brandId));
        if (newSelectedBrands.length !== selectedBrands.length) {
          setSelectedBrands(newSelectedBrands);
          changed = true;
        }
      }

      if (selectedBrands.length === 0 && selectedTypes.length > 0) {
        const generallyAvailableTypes = new Set();
        products.forEach(p => {
          (p.categories || []).forEach(catId => {
            if (carTypeNames[catId] !== undefined && catId !== "") generallyAvailableTypes.add(catId);
          });
        });
        const newSelectedTypes = selectedTypes.filter(typeId => generallyAvailableTypes.has(typeId));
        if (newSelectedTypes.length !== selectedTypes.length) {
          setSelectedTypes(newSelectedTypes);
          changed = true;
        }
      }

    }, [products, selectedBrands, selectedTypes, availableBrands, availableTypes, brandNames, carTypeNames]);
    

{/* render view */}
  return (
    <ViewPort>
      <Modal
        visible={filtersVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFiltersVisible(false)}
      >
        <View style={layoutStyles.overlayBackdrop}>
          <View style={layoutStyles.FullWindowOverlay}>
            <CloseButton
              onPress={() => setFiltersVisible(false)}
              size={30}
              style={{ position: 'absolute', top: 4, right: 10, zIndex: 999 }}
            />
            <BaselineText style={textStyles.modalTitle}>
              Filters
            </BaselineText>

            {(selectedBrands.length > 0 || selectedTypes.length > 0) && (
              <View style={layoutStyles.selectedFiltersSection}>
                <View style={layoutStyles.selectedFiltersHeader}>
                  <BaselineText style={textStyles.selectedFiltersTitle}>
                    Active Filters:
                  </BaselineText>
                  <TouchableOpacity
                    onPress={clearAllFilters}
                    style={buttonStyles.clearAllChip}
                  >
                    <BaselineText style={textStyles.clearAllChipButtonText}>
                      Clear all
                    </BaselineText>
                  </TouchableOpacity>
                </View>
                <View style={layoutStyles.selectedFiltersContainer}>
                  {selectedBrands.map(id => (
                    <TouchableOpacity
                      key={id}
                      onPress={() => handleBrandSelect(id)}
                      style={buttonStyles.chip}
                    >
                      <BaselineText style={textStyles.chipText}>
                        {brandNames[id]}
                      </BaselineText>
                      <Ionicons
                        name="close-circle"
                        size={16}
                        style={textStyles.filterChipRemove}
                      />
                    </TouchableOpacity>
                  ))}
                  {selectedTypes.map(id => (
                    <TouchableOpacity
                      key={id}
                      onPress={() => handleCarTypeSelect(id)}
                      style={buttonStyles.chip}
                    >
                      <BaselineText style={textStyles.chipText}>
                        {carTypeNames[id]}
                      </BaselineText>
                      <Ionicons
                        name="close-circle"
                        size={16}
                        style={textStyles.filterChipRemove}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Brands dropdown */}
            <View style={{ marginBottom: 0.4, zIndex: 20 }}>
              <TouchableOpacity
                onPress={() => { setBrandDropdownOpen(!brandDropdownOpen); setCarTypeDropdownOpen(false); }}
                style={layoutStyles.dropdownHeader}
              >
                <BaselineText style={[layoutStyles.flex1, textStyles.defaultText]}>
                  Brands
                </BaselineText>
                <Icon
                  name={brandDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                  size={24}
                  color={colors.ghosted}
                />
              </TouchableOpacity>
              {brandDropdownOpen && (
                <ScrollView style={layoutStyles.dropdownList}>
                  {brandSelectorItems.map(brand => {
                    const selected = selectedBrands.includes(brand.id);
                    return (
                      <TouchableOpacity
                        key={brand.id}
                        onPress={() => handleBrandSelect(brand.id)}
                        style={[
                          layoutStyles.dropdownItem,
                          selected && layoutStyles.dropdownItemSelected,
                        ]}
                      >
                        <BaselineText
                          style={selected ? textStyles.dropdownItemSelectedText : textStyles.defaultText}
                        >
                          {brand.name}
                        </BaselineText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
            
            {/* Car Types dropdown (same deal) */}
            <View style={{ marginBottom: 15, zIndex: 10 }}>
              <TouchableOpacity
                onPress={() => { setCarTypeDropdownOpen(!carTypeDropdownOpen); setBrandDropdownOpen(false); }}
                style={layoutStyles.dropdownHeader}
              >
                <BaselineText style={[layoutStyles.flex1, textStyles.defaultText]}>
                  Car Types
                </BaselineText>
                <Icon
                  name={carTypeDropdownOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
                  size={24}
                  color={colors.ghosted}
                />
              </TouchableOpacity>
              {carTypeDropdownOpen && (
                <ScrollView style={layoutStyles.dropdownList}>
                  {carTypeSelectorItems.map(type => {
                    const selected = selectedTypes.includes(type.id);
                    return (
                      <TouchableOpacity
                        key={type.id}
                        onPress={() => handleCarTypeSelect(type.id)}
                        style={[
                          layoutStyles.dropdownItem,
                          selected && layoutStyles.dropdownItemSelected,
                        ]}
                      >
                        <BaselineText
                          style={selected ? textStyles.dropdownItemSelectedText : textStyles.defaultText}
                        >
                          {type.name}
                        </BaselineText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>

            </View>
          </View>
      </Modal>

      {/* Top bar */}
      <ScrollView style={layoutStyles.cardContainer}>
      <View style={layoutStyles.topContainer}>
        <TouchableOpacity
          onPress={() => setFiltersVisible(true)}
          style={layoutStyles.filterButton}
        >
          <Icon name="filter-list" size={30} color={colors.secondary} />
        </TouchableOpacity>

        <View style={layoutStyles.SearchBar}>
          <ScrollView horizontal>
            <TextInput
              style={[textStyles.defaultText, layoutStyles.inputFullWidth]}
              placeholder="Search for a model..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ScrollView>
          {searchQuery.length > 0 && <CloseButton onPress={() => setSearchQuery('')} />}
        </View>
      </View>

      {/* Products list */}
        <View style={layoutStyles.card}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onPress={() => navigation.navigate('ProductDetail', product)}
            />
          ))}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </ViewPort>
  );
};
export default ProductScreen;