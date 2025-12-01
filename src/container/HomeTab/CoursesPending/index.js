import React, { memo, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { scale } from 'react-native-size-scaling';
import HTML from 'react-native-render-html';
import colors from 'variables/colors';
import { courses } from 'store/actions/app';
import vari from 'variables/platform';
import images from 'imagesApp';
import { useDispatch } from 'react-redux';
const width = Dimensions.get('window').width / 375;
const height = Dimensions.get('window').height / 812;
import RouterService from 'container/Router/RouterService';
import { site_id } from 'store/api/common';

const CoursesPending = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const formatCurrencyVND = value => {
    const number = Number(value);
    if (isNaN(number)) return 0;
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };
  const showButton = item => {
    if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell === 0
    ) {
      return (
        <View>
          <Text
            style={{
              marginHorizontal: scale(5),
              fontSize: scale(14),
              color: 'green',
            }}
          >
            Miễn phí
          </Text>
        </View>
      );
    } else if (item.no_retail === true && item.price_sell === 0) {
      return <View></View>;
    } else if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell !== 0
    ) {
      const priceSell = parseFloat(item.price_sell);
      const PriceNotSell = parseFloat(item.price);

      const price_sell = formatCurrencyVND(priceSell);
      const price = formatCurrencyVND(PriceNotSell);
      return (
        <View>
          {priceSell ? (
            <View
              style={{
                marginHorizontal: scale(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  lineHeight: scale(30),
                  fontWeight: 'bold',
                  fontSize: scale(12),
                  color: colors.blue3,
                }}
              >
                {price_sell}
              </Text>

              {priceSell !== PriceNotSell && (
                <Text
                  style={{
                    color: '#C2C6C9',
                    textDecorationLine: 'line-through',
                    fontSize: scale(12),
                    marginLeft: 5,
                  }}
                >
                  {price}
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                margin: scale(5),
              }}
            >
              <Text
                style={{
                  color: 'green',
                  fontSize: scale(14),
                }}
              >
                Miễn phí
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Đăng ký học</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    dispatch(
      courses(1, 90, site_id, (err, data) => {
        console.log('sonbh2', data);
        if (err) {
        } else {
          setData(data?.data);
        }
      }),
    );
  }, []);

  return (
    <View
      style={{
        paddingLeft: scale(10),
        marginTop: height * 5,
        overflow: 'hidden',
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: '#38393D',
            fontWeight: '700',
            fontSize: scale(16),
          }}
        >
          Danh sách khoá học
        </Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                RouterService.navigate('CourseDetail', { item: item })
              }
              activeOpacity={0.8}
              style={{
                marginTop: height * 12,
                marginBottom: height * 12,
                marginRight: width * 12,
                borderColor: colors.grey1,
                overflow: 'hidden',
                borderRadius: 7,
                width: vari.width / 2.5,
                height: vari.width / 1.9,
                backgroundColor: 'white',
                justifyContent: 'space-between',
                paddingBottom: scale(7),
                borderWidth: 1,
              }}
            >
              <Image
                resizeMode="cover"
                defaultSource={images.noThumb}
                source={
                  item?.thumbnail_url
                    ? { uri: item?.thumbnail_url }
                    : images.noThumb
                }
                style={{
                  width: '100%',
                  height: vari.width / 4,
                }}
              />

              <View
                style={{
                  marginHorizontal: scale(5),
                  marginVertical: scale(5),
                }}
              >
                <HTML
                  source={{ html: `<p>${item?.name}</p>` }}
                  containerStyle={{ paddingHorizontal: scale(5) }}
                  allowedStyles={[]}
                  baseStyle={{
                    color: colors.blue3,
                    fontWeight: 'bold',
                    fontSize: scale(14),
                  }}
                  defaultTextProps={{ numberOfLines: 2 }}
                />
                <View style={{ height: scale(15) }} />

                {showButton(item)}
                <View style={{ height: scale(10) }} />
              </View>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default memo(CoursesPending);
