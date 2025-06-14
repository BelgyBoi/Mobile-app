import { StyleSheet } from 'react-native';
import colors from './colors.js';
import spacing from './spacing.js';

const layoutStyles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FullWindowOverlay: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    height: '95%',
    width: '95%',
  },
  closeIcon: {
    padding: 5,
    borderRadius: 15,
  },
  SearchBar: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.ghosted,
    width: '85%',
    alignItems: 'center',
    maxHeight: 44,
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  overlayBackdrop: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.ghosted,
    borderRadius: 5,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.ghosted,
    borderTopWidth: 0,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  topContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: '5%',
  },
  filterButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  inputFullWidth: {
    minWidth: '100%',
  },
  cardContainer: {
    width: '100%',
    paddingTop: 10,
  },
  card: {
    marginBottom: 20,
  },
  selectedFiltersSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedFiltersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownItemSelected: {
    backgroundColor: colors.secondary,
  },
  selectedFiltersContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  },
  quantity:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing.card,
  },
  screen: {
    flex: 1,
    padding: spacing.screen,
    backgroundColor: colors.background,
  },
  section: {
    marginBottom: spacing.section,
    padding: spacing.text,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionLast: {
    marginBottom: 0,
    padding: spacing.text,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.text / 2,
  },


});

export default layoutStyles;
