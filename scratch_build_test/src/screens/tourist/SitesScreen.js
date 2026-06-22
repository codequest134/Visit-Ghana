'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _componentsBottomNav = require('../../components/BottomNav');

var _componentsBottomNav2 = _interopRequireDefault(_componentsBottomNav);

var BASE_URL = 'http://192.168.100.4:8081/api';

var FILTERS = ['All', 'Historical', 'Wildlife', 'Beach', 'Cultural', 'Religious', 'Nature'];

var SitesScreen = function SitesScreen(_ref) {
  var navigation = _ref.navigation;

  var _useState = (0, _react.useState)('');

  var _useState2 = _slicedToArray(_useState, 2);

  var searchText = _useState2[0];
  var setSearchText = _useState2[1];

  var _useState3 = (0, _react.useState)('All');

  var _useState32 = _slicedToArray(_useState3, 2);

  var activeFilter = _useState32[0];
  var setActiveFilter = _useState32[1];

  var _useState4 = (0, _react.useState)([]);

  var _useState42 = _slicedToArray(_useState4, 2);

  var sites = _useState42[0];
  var setSites = _useState42[1];

  var _useState5 = (0, _react.useState)(true);

  var _useState52 = _slicedToArray(_useState5, 2);

  var loading = _useState52[0];
  var setLoading = _useState52[1];

  var _useState6 = (0, _react.useState)(null);

  var _useState62 = _slicedToArray(_useState6, 2);

  var error = _useState62[0];
  var setError = _useState62[1];

  (0, _react.useEffect)(function () {
    loadSites();
  }, []);

  var loadSites = function loadSites() {
    var response, data;
    return regeneratorRuntime.async(function loadSites$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;

          setLoading(true);
          context$2$0.next = 4;
          return regeneratorRuntime.awrap(fetch(BASE_URL + '/sites'));

        case 4:
          response = context$2$0.sent;

          if (response.ok) {
            context$2$0.next = 7;
            break;
          }

          throw new Error('Failed to fetch');

        case 7:
          context$2$0.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          data = context$2$0.sent;

          setSites(data);
          setError(null);
          context$2$0.next = 17;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](0);

          setError('Could not load sites. Check your connection and make sure the backend is running.');

        case 17:
          context$2$0.prev = 17;

          setLoading(false);
          return context$2$0.finish(17);

        case 20:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 14, 17, 20]]);
  };

  var filteredSites = sites.filter(function (site) {
    var matchesSearch = site.name.toLowerCase().includes(searchText.toLowerCase()) || site.region && site.region.toLowerCase().includes(searchText.toLowerCase());
    var matchesFilter = activeFilter === 'All' || site.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  var renderSiteCard = function renderSiteCard(_ref2) {
    var item = _ref2.item;
    return _react2['default'].createElement(
      _reactNative.TouchableOpacity,
      {
        style: styles.siteCard,
        onPress: function () {
          return navigation.navigate('SiteDetail', { site: item });
        }
      },
      _react2['default'].createElement(
        _reactNative.View,
        { style: [styles.cardBanner, { backgroundColor: item.color || '#1A4A6B' }] },
        item.isVerified && _react2['default'].createElement(
          _reactNative.View,
          { style: styles.verifiedBadge },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.verifiedText },
            '✓ Verified'
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.categoryBadge },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.categoryBadgeText },
            item.category
          )
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.cardContent },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.siteName },
          item.name
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.siteRegion },
          '📍 ',
          item.region
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.siteDescription, numberOfLines: 2 },
          item.description
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.cardFooter },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.ratingRow },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.starIcon },
              '★'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.ratingText },
              item.rating
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.reviewCount },
              '(',
              item.reviewCount,
              ' reviews)'
            )
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            {
              style: styles.viewButton,
              onPress: function () {
                return navigation.navigate('SiteDetail', { site: item });
              }
            },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.viewButtonText },
              'View →'
            )
          )
        )
      )
    );
  };

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'light-content' }),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.header },
      navigation.canGoBack() ? _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        { onPress: function () {
            return navigation.goBack();
          } },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.backArrow },
          '←'
        )
      ) : _react2['default'].createElement(_reactNative.View, { style: { width: 24 } }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.headerTitle },
        'Tourist Sites'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.siteCount },
        filteredSites.length,
        ' sites'
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.searchContainer },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.searchBar },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.searchIcon },
          '🔍'
        ),
        _react2['default'].createElement(_reactNative.TextInput, {
          style: styles.searchInput,
          placeholder: 'Search sites or regions...',
          placeholderTextColor: '#aaaaaa',
          value: searchText,
          onChangeText: setSearchText
        }),
        searchText.length > 0 && _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { onPress: function () {
              return setSearchText('');
            } },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.clearText },
            '✕'
          )
        )
      )
    ),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.filterContainer },
      _react2['default'].createElement(_reactNative.FlatList, {
        data: FILTERS,
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        keyExtractor: function (item) {
          return item;
        },
        renderItem: function (_ref3) {
          var item = _ref3.item;
          return _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            {
              style: [styles.filterChip, activeFilter === item && styles.filterChipActive],
              onPress: function () {
                return setActiveFilter(item);
              }
            },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: [styles.filterText, activeFilter === item && styles.filterTextActive] },
              item
            )
          );
        }
      })
    ),
    loading ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.centerContainer },
      _react2['default'].createElement(_reactNative.ActivityIndicator, { size: 'large', color: '#006B3F' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.loadingText },
        'Loading sites from server...'
      )
    ) : error ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.centerContainer },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.errorIcon },
        '⚠️'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.errorText },
        error
      ),
      _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        {
          style: styles.retryButton,
          onPress: loadSites
        },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.retryText },
          'Try Again'
        )
      )
    ) : filteredSites.length === 0 ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.centerContainer },
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptyIcon },
        '🔍'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptyTitle },
        'No sites found'
      ),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.emptySubtitle },
        'Try a different search or filter'
      )
    ) : _react2['default'].createElement(_reactNative.FlatList, {
      data: filteredSites,
      keyExtractor: function (item) {
        return item.siteId.toString();
      },
      renderItem: renderSiteCard,
      contentContainerStyle: styles.listContent,
      showsVerticalScrollIndicator: false
    }),
    _react2['default'].createElement(_componentsBottomNav2['default'], { navigation: navigation, activeRoute: 'Sites' })
  );
};

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCD116'
  },
  siteCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)'
  },
  searchContainer: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 20,
    paddingBottom: 16
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A'
  },
  clearText: {
    fontSize: 14,
    color: '#888888',
    paddingHorizontal: 4
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginRight: 8,
    backgroundColor: '#ffffff'
  },
  filterChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F'
  },
  filterText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500'
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '600'
  },
  listContent: {
    padding: 16,
    paddingBottom: 100
  },
  siteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4
  },
  cardBanner: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12
  },
  verifiedBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600'
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600'
  },
  cardContent: {
    padding: 14
  },
  siteName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4
  },
  siteRegion: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8
  },
  siteDescription: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 19,
    marginBottom: 12
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starIcon: {
    color: '#FCD116',
    fontSize: 14,
    marginRight: 4
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 4
  },
  reviewCount: {
    fontSize: 12,
    color: '#888888'
  },
  viewButton: {
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20
  },
  viewButtonText: {
    color: '#006B3F',
    fontSize: 13,
    fontWeight: '600'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  loadingText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 12
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  errorText: {
    fontSize: 14,
    color: '#CE1126',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20
  },
  retryButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888'
  }
});

exports['default'] = SitesScreen;
module.exports = exports['default'];
/* Header */ /* Search */ /* Filters */ /* Content */ /* Bottom Navigation */