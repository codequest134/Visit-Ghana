'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeMaps = require('react-native-maps');

var _reactNativeMaps2 = _interopRequireDefault(_reactNativeMaps);

var _expoLocation = require('expo-location');

var Location = _interopRequireWildcard(_expoLocation);

var _componentsBottomNav = require('../../components/BottomNav');

var _componentsBottomNav2 = _interopRequireDefault(_componentsBottomNav);

// ⬇️ Your backend address
var BASE_URL = 'http://192.168.100.4:8081/api';

var FILTERS = ['All', 'Historical', 'Wildlife', 'Beach', 'Cultural', 'Religious', 'Nature'];

var MapScreen = function MapScreen(_ref) {
  var navigation = _ref.navigation;

  var _useState = (0, _react.useState)([]);

  var _useState2 = _slicedToArray(_useState, 2);

  var sites = _useState2[0];
  var setSites = _useState2[1];

  var _useState3 = (0, _react.useState)(true);

  var _useState32 = _slicedToArray(_useState3, 2);

  var loading = _useState32[0];
  var setLoading = _useState32[1];

  var _useState4 = (0, _react.useState)(null);

  var _useState42 = _slicedToArray(_useState4, 2);

  var location = _useState42[0];
  var setLocation = _useState42[1];

  var _useState5 = (0, _react.useState)('All');

  var _useState52 = _slicedToArray(_useState5, 2);

  var activeFilter = _useState52[0];
  var setActiveFilter = _useState52[1];

  var _useState6 = (0, _react.useState)(null);

  var _useState62 = _slicedToArray(_useState6, 2);

  var selectedSite = _useState62[0];
  var setSelectedSite = _useState62[1];

  (0, _react.useEffect)(function () {
    loadSites();
    getLocation();
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
          context$2$0.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = context$2$0.sent;

          setSites(data);
          context$2$0.next = 14;
          break;

        case 11:
          context$2$0.prev = 11;
          context$2$0.t0 = context$2$0['catch'](0);

          console.error('Error loading sites:', context$2$0.t0);

        case 14:
          context$2$0.prev = 14;

          setLoading(false);
          return context$2$0.finish(14);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 11, 14, 17]]);
  };

  var getLocation = function getLocation() {
    var _ref2, _status, loc;

    return regeneratorRuntime.async(function getLocation$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.prev = 0;
          context$2$0.next = 3;
          return regeneratorRuntime.awrap(Location.requestForegroundPermissionsAsync());

        case 3:
          _ref2 = context$2$0.sent;
          _status = _ref2.status;

          if (!(_status === 'granted')) {
            context$2$0.next = 10;
            break;
          }

          context$2$0.next = 8;
          return regeneratorRuntime.awrap(Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced
          }));

        case 8:
          loc = context$2$0.sent;

          setLocation(loc.coords);

        case 10:
          context$2$0.next = 15;
          break;

        case 12:
          context$2$0.prev = 12;
          context$2$0.t0 = context$2$0['catch'](0);

          console.log('Location error:', context$2$0.t0);

        case 15:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[0, 12]]);
  };

  var filteredSites = sites.filter(function (site) {
    return activeFilter === 'All' || site.category === activeFilter;
  });

  // Center the map on Ghana by default
  var initialRegion = {
    latitude: 7.9465,
    longitude: -1.0232,
    latitudeDelta: 5,
    longitudeDelta: 5
  };

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'light-content' }),
    _react2['default'].createElement(
      _reactNative.View,
      { style: styles.header },
      _react2['default'].createElement(
        _reactNative.View,
        null,
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.headerTitle },
          'Map & Navigation'
        ),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.headerSubtitle },
          filteredSites.length,
          ' sites across Ghana'
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
        contentContainerStyle: styles.filterContent,
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
              { style: [styles.filterChipText, activeFilter === item && styles.filterChipTextActive] },
              item
            )
          );
        }
      })
    ),
    loading ? _react2['default'].createElement(
      _reactNative.View,
      { style: styles.loadingContainer },
      _react2['default'].createElement(_reactNative.ActivityIndicator, { size: 'large', color: '#006B3F' }),
      _react2['default'].createElement(
        _reactNative.Text,
        { style: styles.loadingText },
        'Loading map...'
      )
    ) : _react2['default'].createElement(
      _reactNative.View,
      { style: styles.mapContainer },
      _react2['default'].createElement(
        _reactNativeMaps2['default'],
        {
          style: styles.map,
          initialRegion: initialRegion,
          showsUserLocation: true,
          showsMyLocationButton: true,
          mapPadding: { bottom: 80, top: 0, left: 0, right: 0 }
        },
        filteredSites.map(function (site) {
          return _react2['default'].createElement(_reactNativeMaps.Marker, {
            key: site.siteId,
            coordinate: {
              latitude: parseFloat(site.latitude),
              longitude: parseFloat(site.longitude)
            },
            title: site.name,
            description: site.region,
            pinColor: site.color,
            onCalloutPress: function () {
              return navigation.navigate('SiteDetail', { site: site });
            }
          });
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.mapBadge },
        _react2['default'].createElement(
          _reactNative.Text,
          { style: styles.mapBadgeText },
          '📍 Tap a pin, then tap its name to view details'
        )
      )
    ),
    _react2['default'].createElement(_componentsBottomNav2['default'], { navigation: navigation, activeRoute: 'Map' })
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
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCD116',
    marginBottom: 4
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)'
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#ffffff'
  },
  filterChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F'
  },
  filterChipText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500'
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: '600'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888888'
  },
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 1
  },
  mapBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center'
  },
  mapBadgeText: {
    color: '#ffffff',
    fontSize: 12
  }
});

exports['default'] = MapScreen;
module.exports = exports['default'];
/* Header */ /* Filter Chips */ /* The Real Map */ /* Site count badge over map */ /* Bottom Navigation */