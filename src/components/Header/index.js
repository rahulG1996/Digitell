import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Logo from '../../assets/images/logo.png';
import {AllColor} from '../../utils/allColors';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <View style={{width: '33%'}}>
        {props.back ? (
          <TouchableOpacity
            style={styles.rowLeft}
            onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-left" size={30} color={AllColor.orange} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.rowLeft}
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color={AllColor.orange} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{width: '67%'}}>
        {props.title ? (
          <View>
            <Text style={{fontSize: 18, color: AllColor.orange}}>
              {props.title}
            </Text>
          </View>
        ) : (
          <View>
            <Image source={Logo} resizeMode="contain" />
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowLeft: {
    width: '30%',
    alignItems: 'center',
  },
});
