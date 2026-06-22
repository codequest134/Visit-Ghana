'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _expoVectorIcons = require('@expo/vector-icons');

var BottomNav = function BottomNav(_ref) {
  var navigation = _ref.navigation;
  var activeRoute = _ref.activeRoute;

  var tabs = [{ name: 'Home', icon: 'home-outline', activeIcon: 'home', route: 'Home' }, { name: 'Sites', icon: 'compass-outline', activeIcon: 'compass', route: 'Sites' }, { name: 'Map', icon: 'map-outline', activeIcon: 'map', route: 'Map' }, { name: 'Upload', icon: 'camera-outline', activeIcon: 'camera', route: 'Upload' }, { name: 'Profile', icon: 'person-outline', activeIcon: 'person', route: 'Profile' }];

  return _react2['default'].createElement(
    _reactNative.View,
    { style: styles.bottomNav },
    tabs.map(function (tab) {
      var isActive = activeRoute === tab.route;
      return _react2['default'].createElement(
        _reactNative.TouchableOpacity,
        {
          key: tab.route,
          style: styles.navItem,
          activeOpacity: 0.7,
          onPress: function () {
            if (!isActive) {
              navigation.navigate(tab.route);
            }
          }
        },
        _react2['default'].createElement(_expoVectorIcons.Ionicons, {
          name: isActive ? tab.activeIcon : tab.icon,
          size: 24,
          color: isActive ? '#006B3F' : '#888888',
          style: styles.icon
        }),
        _react2['default'].createElement(
          _reactNative.Text,
          { style: [styles.navLabel, isActive && styles.navLabelActive] },
          tab.name
        )
      );
    })
  );
};

var styles = _reactNative.StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 10
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginBottom: 2
  },
  navLabel: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '500'
  },
  navLabelActive: {
    color: '#006B3F',
    fontWeight: '700'
  }
});

exports['default'] = BottomNav;
module.exports = exports['default'];