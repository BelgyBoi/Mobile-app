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
        transparent={true}
        onRequestClose={() => setFiltersVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <CloseButton 
              onPress={() => setFiltersVisible(false)}
              size={30}
              style={styles.filterCloseBtn}
            />
            <BaselineText style={[textStyles.header, styles.modalTitle]}>Filters</BaselineText>

            {(selectedBrands.length > 0 || selectedTypes.length > 0) && (
              <View style={styles.selectedFiltersSection}>
                <View style={styles.selectedFiltersHeader}>
                  <BaselineText style={[textStyles.subtitle, styles.selectedFiltersTitle]}>Active Filters:</BaselineText>
                  <TouchableOpacity onPress={clearAllFilters} style={buttonStyles.chip}>
                    <BaselineText style={textStyles.chipText}>Clear all</BaselineText>
                  </TouchableOpacity>
                </View>
                <View style={styles.selectedFiltersContainerChips}>
                  {selectedBrands.map(brandId => (
                    <TouchableOpacity key={brandId} onPress={() => handleBrandSelect(brandId)} style={buttonStyles.chip}>
                      <BaselineText style={textStyles.chipText}>{brandNames[brandId]}</BaselineText>
                      <Ionicons 
                        name="close-circle"
                        size={16}
                        color={colors.ghosted}
                        style={styles.filterChipRemove}
                      />
                    </TouchableOpacity>
                  ))}
                  {selectedTypes.map(typeId => (
                    <TouchableOpacity key={typeId} onPress={() => handleCarTypeSelect(typeId)} style={buttonStyles.chip}>
                      <BaselineText style={textStyles.chipText}>{carTypeNames[typeId]}</BaselineText>
                      <Ionicons 
                        name="close-circle"
                        size={16}
                        color={colors.ghosted}
                        style={styles.filterChipRemove}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={[styles.dropdownContainer, styles.brandDropdown]}>              
              <TouchableOpacity onPress={() => { setBrandDropdownOpen(!brandDropdownOpen); setCarTypeDropdownOpen(false); }} style={styles.dropdownHeader}>
                <BaselineText style={[textStyles.defaultText]}>Brands</BaselineText>
                <Icon name={brandDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={colors.ghosted} />
              </TouchableOpacity>
              {brandDropdownOpen && (
                <ScrollView style={styles.dropdownListContainer}>
                   {brandSelectorItems.map(brand => (
                    <TouchableOpacity
                      key={brand.id}
                      onPress={() => handleBrandSelect(brand.id)}
                      style={[
                        styles.dropdownItem,
                        selectedBrands.includes(brand.id) && styles.dropdownItemSelected
                      ]}
                    >
                      <BaselineText style={[textStyles.defaultText, selectedBrands.includes(brand.id) ? styles.dropdownItemSelectedText : styles.dropdownItemText]}>
                        {brand.name}
                      </BaselineText>
                      {selectedBrands.includes(brand.id) && <Icon name="check" size={16} color="#007bff" />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View style={[styles.dropdownContainer, styles.typeDropdown]}>              
              <TouchableOpacity onPress={() => { setCarTypeDropdownOpen(!carTypeDropdownOpen); setBrandDropdownOpen(false); }} style={styles.dropdownHeader}>
                <BaselineText style={[textStyles.defaultText]}>Car Types</BaselineText>
                <Icon name={carTypeDropdownOpen ? "arrow-drop-up" : "arrow-drop-down"} size={24} color={colors.ghosted} />
              </TouchableOpacity>
              {carTypeDropdownOpen && (
                <ScrollView style={styles.dropdownListContainer}>
                  {carTypeSelectorItems.map(type => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => handleCarTypeSelect(type.id)}
                      style={[
                        styles.dropdownItem,
                        selectedTypes.includes(type.id) && styles.dropdownItemSelected
                      ]}
                    >
                      <BaselineText style={[textStyles.defaultText, selectedTypes.includes(type.id) ? styles.dropdownItemSelectedText : styles.dropdownItemText]}>
                        {type.name}
                      </BaselineText>
                      {selectedTypes.includes(type.id) && <Icon name="check" size={16} color="#007bff" />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

          </View>
        </View>
      </Modal>

      
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => setFiltersVisible(true)}
            style={styles.filterIcon}
          >
            <Icon name="filter-list" size={30} color={colors.secondary} />
          </TouchableOpacity>

          <View style={layoutStyles.SearchBar}>
            <ScrollView horizontal>
              <TextInput
                style={[textStyles.defaultText, styles.searchInput]}
                placeholder="Search for a model..."
                placeholderTextColor={colors.ghosted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </ScrollView>
            {searchQuery.length > 0 &&  
              <CloseButton onPress={() => setSearchQuery('')} style={buttonStyles.closeButton} />
            }
          </View>
        </View>

        <ScrollView style={styles.cardContainer} contentContainerStyle={layoutStyles.scrollContainer}>
          <View style={styles.card}>
            {filteredProducts.map((product) => (
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    ...layoutStyles.FullWindowOverlay,
  },
  filterCloseBtn: {
    ...buttonStyles.closeButton,
    top: 4,
    right: 10,
    zIndex: 999,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedFiltersSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.ghosted,
  },
  selectedFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedFiltersContainerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChipRemove: {
    marginLeft: 5,
  },
  brandDropdown: {
    zIndex: 20,
  },
  typeDropdown: {
    zIndex: 10,
  },
  dropdownHeader: {
    ...layoutStyles.closeIcon,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.ghosted,
    borderRadius: 5,
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  dropdownListContainer: {
      borderWidth: 1,
      borderColor: colors.ghosted,
      borderTopWidth: 0,
      borderRadius: 5,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
  },
  filterIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 16,
    minWidth: '100%',
  },
  cardContainer: {
    width: '100%',
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
  },
});
  

export default ProductScreen;