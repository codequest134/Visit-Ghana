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

// ⬇️ Your backend address
var BASE_URL = 'http://192.168.100.4:8081/api';

var CATEGORIES = [{ id: '1', name: 'All' }, { id: '2', name: 'Historical' }, { id: '3', name: 'Wildlife' }, { id: '4', name: 'Beach' }, { id: '5', name: 'Cultural' }, { id: '6', name: 'Religious' }];

var RECENT_PHOTOS = [{ id: '1', site: 'Cape Coast Castle', uploader: 'Kwame A.', color: '#1A4A6B' }, { id: '2', site: 'Kakum National Park', uploader: 'Ama S.', color: '#2D6A4F' }, { id: '3', site: 'Labadi Beach', uploader: 'Kofi M.', color: '#C0873F' }, { id: '4', site: 'Elmina Castle', uploader: 'Abena T.', color: '#6B1A1A' }];

var HomeScreen = function HomeScreen(_ref) {
  var navigation = _ref.navigation;

  var _useState = (0, _react.useState)('All');

  var _useState2 = _slicedToArray(_useState, 2);

  var activeCategory = _useState2[0];
  var setActiveCategory = _useState2[1];

  var _useState3 = (0, _react.useState)([]);

  var _useState32 = _slicedToArray(_useState3, 2);

  var featuredSites = _useState32[0];
  var setFeaturedSites = _useState32[1];

  var _useState4 = (0, _react.useState)(true);

  var _useState42 = _slicedToArray(_useState4, 2);

  var loading = _useState42[0];
  var setLoading = _useState42[1];

  (0, _react.useEffect)(function () {
    loadFeaturedSites();
  }, []);

  var loadFeaturedSites = function loadFeaturedSites() {
    var response, data;
    return regeneratorRuntime.async(function loadFeaturedSites$(context$2$0) {
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

          setFeaturedSites(data.slice(0, 5));
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

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.container },
    _react2['default'].createElement(_reactNative.StatusBar, { barStyle: 'light-content' }),
    _react2['default'].createElement(
      _reactNative.ScrollView,
      {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.scrollContent
      },
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.header },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.headerTop },
          _react2['default'].createElement(
            _reactNative.View,
            null,
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.greeting },
              'Good day! 👋'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.headerTitle },
              'Explore Ghana'
            )
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            {
              style: styles.profileButton,
              onPress: function () {
                return navigation.navigate('Profile');
              }
            },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.profileInitial },
              'T'
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          {
            style: styles.searchBar,
            onPress: function () {
              return navigation.navigate('Sites');
            },
            activeOpacity: 0.7
          },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.searchIcon },
            '🔍'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.searchInputPlaceholder },
            'Search tourist sites...'
          )
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.sectionContainer },
        _react2['default'].createElement(_reactNative.FlatList, {
          data: CATEGORIES,
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          keyExtractor: function (item) {
            return item.id;
          },
          renderItem: function (_ref2) {
            var item = _ref2.item;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                style: [styles.categoryChip, activeCategory === item.name && styles.categoryChipActive],
                onPress: function () {
                  setActiveCategory(item.name);
                  navigation.navigate('Sites');
                }
              },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: [styles.categoryText, activeCategory === item.name && styles.categoryTextActive] },
                item.name
              )
            );
          }
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.sectionContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.sectionHeader },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.sectionTitle },
            'Featured Sites'
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            {
              onPress: function () {
                return navigation.navigate('Sites');
              }
            },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.seeAllText },
              'See All'
            )
          )
        ),
        loading ? _react2['default'].createElement(_reactNative.ActivityIndicator, {
          size: 'large',
          color: '#006B3F',
          style: { marginVertical: 40 }
        }) : _react2['default'].createElement(_reactNative.FlatList, {
          data: featuredSites,
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          keyExtractor: function (item) {
            return item.siteId.toString();
          },
          renderItem: function (_ref3) {
            var item = _ref3.item;
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                style: [styles.siteCard, { backgroundColor: item.color || '#1A4A6B' }],
                onPress: function () {
                  return navigation.navigate('SiteDetail', { site: item });
                }
              },
              _react2['default'].createElement(
                _reactNative.View,
                { style: styles.categoryBadge },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.categoryBadgeText },
                  item.category
                )
              ),
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.siteName },
                item.name
              ),
              _react2['default'].createElement(
                _reactNative.View,
                { style: styles.siteFooter },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.siteRegion },
                  '📍 ',
                  item.region
                ),
                _react2['default'].createElement(
                  _reactNative.View,
                  { style: styles.ratingBadge },
                  _react2['default'].createElement(
                    _reactNative.Text,
                    { style: styles.ratingText },
                    '★ ',
                    item.rating
                  )
                )
              )
            );
          }
        })
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.statsRow },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.statCard },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statNumber },
            featuredSites.length > 0 ? '11+' : '...'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statLabel },
            'Tourist Sites'
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.statCard },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statNumber },
            '10K+'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statLabel },
            'Community Photos'
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.statCard },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statNumber },
            '16'
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.statLabel },
            'Regions'
          )
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.sectionContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.sectionHeader },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.sectionTitle },
            'Community Photos'
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            null,
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.seeAllText },
              'See All'
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.photosGrid },
          RECENT_PHOTOS.map(function (photo) {
            return _react2['default'].createElement(
              _reactNative.TouchableOpacity,
              {
                key: photo.id,
                style: [styles.photoCard, { backgroundColor: photo.color }]
              },
              _react2['default'].createElement(
                _reactNative.View,
                { style: styles.photoOverlay },
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.photoSite },
                  photo.site
                ),
                _react2['default'].createElement(
                  _reactNative.Text,
                  { style: styles.photoUploader },
                  'by ',
                  photo.uploader
                )
              )
            );
          })
        )
      ),
      _react2['default'].createElement(
        _reactNative.View,
        { style: styles.sectionContainer },
        _react2['default'].createElement(
          _reactNative.View,
          { style: styles.sectionHeader },
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.sectionTitle },
            'Upcoming Events'
          ),
          _react2['default'].createElement(
            _reactNative.TouchableOpacity,
            null,
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.seeAllText },
              'See All'
            )
          )
        ),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { style: styles.eventCard },
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.eventDate },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventDay },
              '24'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventMonth },
              'AUG'
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.eventInfo },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventName },
              'Homowo Festival'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventLocation },
              '📍 Greater Accra Region'
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: styles.eventBadge },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: styles.eventBadgeText },
                'Cultural'
              )
            )
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.eventArrow },
            '›'
          )
        ),
        _react2['default'].createElement(
          _reactNative.TouchableOpacity,
          { style: styles.eventCard },
          _react2['default'].createElement(
            _reactNative.View,
            { style: [styles.eventDate, { backgroundColor: '#1A4A6B' }] },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventDay },
              '12'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventMonth },
              'SEP'
            )
          ),
          _react2['default'].createElement(
            _reactNative.View,
            { style: styles.eventInfo },
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventName },
              'Chale Wote Festival'
            ),
            _react2['default'].createElement(
              _reactNative.Text,
              { style: styles.eventLocation },
              '📍 Accra, James Town'
            ),
            _react2['default'].createElement(
              _reactNative.View,
              { style: [styles.eventBadge, { backgroundColor: '#E3F0FF' }] },
              _react2['default'].createElement(
                _reactNative.Text,
                { style: [styles.eventBadgeText, { color: '#1A4A6B' }] },
                'Arts'
              )
            )
          ),
          _react2['default'].createElement(
            _reactNative.Text,
            { style: styles.eventArrow },
            '›'
          )
        )
      ),
      _react2['default'].createElement(_reactNative.View, { style: { height: 100 } })
    ),
    _react2['default'].createElement(_componentsBottomNav2['default'], { navigation: navigation, activeRoute: 'Home' })
  );
};

var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  scrollContent: {
    paddingBottom: 20
  },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FCD116'
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FCD116',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F'
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
  searchInputPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#aaaaaa'
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  seeAllText: {
    fontSize: 13,
    color: '#006B3F',
    fontWeight: '600'
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0'
  },
  categoryChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F'
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6
  },
  categoryText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500'
  },
  categoryTextActive: {
    color: '#ffffff'
  },
  siteCard: {
    width: 220,
    height: 140,
    borderRadius: 16,
    marginRight: 14,
    padding: 16,
    justifyContent: 'space-between'
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600'
  },
  siteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 22
  },
  siteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  siteRegion: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)'
  },
  ratingBadge: {
    backgroundColor: '#FCD116',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 20
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center'
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  photoCard: {
    width: '48%',
    height: 110,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  photoOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 8
  },
  photoSite: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold'
  },
  photoUploader: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center'
  },
  eventDate: {
    backgroundColor: '#006B3F',
    borderRadius: 10,
    width: 48,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14
  },
  eventDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
    lineHeight: 22
  },
  eventMonth: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600'
  },
  eventInfo: {
    flex: 1
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4
  },
  eventLocation: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6
  },
  eventBadge: {
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start'
  },
  eventBadgeText: {
    fontSize: 11,
    color: '#006B3F',
    fontWeight: '600'
  },
  eventArrow: {
    fontSize: 22,
    color: '#CCCCCC',
    marginLeft: 8
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  navItem: {
    flex: 1,
    alignItems: 'center'
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 3,
    opacity: 0.4
  },
  navIconActive: {
    fontSize: 22,
    marginBottom: 3
  },
  navLabel: {
    fontSize: 10,
    color: '#888888'
  },
  navLabelActive: {
    fontSize: 10,
    color: '#006B3F',
    fontWeight: '600'
  }
});

exports['default'] = HomeScreen;
module.exports = exports['default'];
/* ── Header ── */ /* Search Bar */ /* ── Categories ── */ /* ── Featured Sites ── */ /* ── Quick Stats ── */ /* ── Community Photos ── */ /* ── Upcoming Events ── */ /* ── Bottom Navigation ── */