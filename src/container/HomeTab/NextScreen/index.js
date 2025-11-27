import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import Toolbar from 'src/components/Toolbar';
import images from 'src/assets/images';
import SafeAreaViews from 'src/components/SafeAreaView';
import colors from 'variables/colors';
import {scale} from 'react-native-size-scaling';
import vari from 'variables/platform';
import {isRequestPending} from 'src/store/selectors';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {courses} from 'store/actions/app';
import {Price} from 'src/utils/validate';
import HTML from 'react-native-render-html';
const numColumns = 2;

@connect(
  state => ({
    language: state.app.language,
    idSite: state.app.listItem,
    site: state.auth.listSite,
    loading: isRequestPending(state, 'courses'),
  }),
  {
    courses,
  },
)
export class NextScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCourse: [],
      page: 1,
      visible: false,
    };
  }
  componentDidMount() {
    this.getListCourses();
  }
 formatCurrencyVND = value => {
    const number = Number(value);
    if (isNaN(number)) return 0;
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };
  getListCourses = () => {
    const {courses, idSite} = this.props;
    const {page, dataCourse} = this.state;
    courses(page, 10, idSite, (err, data) => {
      if (err) {
      } else {
        const listCourse = dataCourse.concat(data?.data);
        const courseMore = listCourse.filter(item => {
          return item.status === 1;
        });

        this.setState({
          dataCourse: courseMore,
        });
      }
    });
  };

  showButton = item => {
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
            }}>
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

      const price_sell = this.formatCurrencyVND(priceSell);
      const price = this.formatCurrencyVND(PriceNotSell);

      return (
        <View>
          {priceSell ? (
            <View
              style={{
                marginHorizontal: scale(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  lineHeight: scale(30),
                  fontWeight: 'bold',
                  fontSize: scale(12),
                  color: colors.blue3,
                }}>
                {price_sell}
              </Text>

              {priceSell !== PriceNotSell && (
                <Text
                  style={{
                    color: '#C2C6C9',
                    textDecorationLine: 'line-through',
                    fontSize: scale(12),
                    marginLeft: 5,
                  }}>
                  {price}
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                margin: scale(5),
              }}>
              <Text
                style={{
                  color: 'green',
                  fontSize: scale(14),
                }}>
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

  handleLoadMore = () => {
    const {page, visible} = this.state;
    this.setState(
      {page: page + 1},
      () => this.getListCourses(),
      visible == true,
    );
  };
  formatData = (data, numColumns) => {
    // truyền vào mảng data và số cột
    //Math.floor chia làm tròn
    const numberOfFullRows = Math.floor(data?.length / numColumns);
    let numberOfElement = data?.length - numberOfFullRows * numColumns;
    while (numberOfElement !== numColumns && numberOfElement !== 0) {
      data.push({Price: '', Price_app: '', empty: true});
      numberOfElement = numberOfElement + 1;
    }
    return data;
  };
  renderItem = ({item, index}) => {
    // const salePrice = 100 - (item.Price_app / item.Price) * 100;

    if (item.empty === true) {
      return (
        <View
          style={{
            height: vari.width / 1.7,
            flex: 1,
            margin: scale(10),
          }}
        />
      );
    }

    return (
      <TouchableOpacity
        key={index.toString()}
        onPress={() =>
          this.props.navigation.navigate('CourseDetail', {item: item})
        }
        style={{
          borderWidth: 1,
          borderColor: '#C2C6C9',
          overflow: 'hidden',
          height: vari.width / 2.0,
          backgroundColor: 'white',
          borderRadius: scale(5),
          justifyContent: 'space-between',
          paddingBottom: scale(7),
          shadowColor: '#282828',
          shadowRadius: 10,
          shadowOpacity: 0.8,
          elevation: 4,
          shadowOffset: {width: 0, height: 1},
          flex: 1,
          margin: scale(10),
        }}>
        <ImageBackground
          resizeMode="stretch"
          defaultSource={images.noThumb}
          source={{
            uri: item.thumbnail_url,
          }}
          style={{
            alignItems: 'flex-end',
            width: '100%',
            height: vari.width / 3.5,
          }}></ImageBackground>
        <HTML
          source={{html: item?.name || '<p></p>'}}
          containerStyle={{paddingHorizontal: scale(5)}}
          allowedStyles={[]}
          renderers={{
            p: (_, children) => (
              <Text
                style={{
                  fontSize: scale(14),
                  color: colors.blue3,
                  fontWeight: 'bold',
                  marginTop: scale(8),
                }}
                numberOfLines={2}>
                {children}
              </Text>
            ),
          }}
        />
        {this.showButton(item)}
      </TouchableOpacity>
    );
  };
  renderEmptyContainer = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{fontSize: scale(14), textAlign: 'center', color: 'black'}}>
          Không có khoá học nào phù hợp
        </Text>
      </View>
    );
  };
  render() {
    const {loading} = this.props;
    const {dataCourse, visible, page} = this.state;

    return (
      <SafeAreaViews>
        <Toolbar
          title={this.props.language === 'en' ? 'See more courses' : 'Khóa học'}
          iconLeft={images.iconBack}
          leftPress={() => this.props.navigation.goBack()}
        />
        {dataCourse?.length > 0 ? (
          <FlatList
            refreshing={visible}
            onRefresh={() => {
              this.getListCourses();
            }}
            contentContainerStyle={{flexGrow: 1}}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            data={dataCourse ? this.formatData(dataCourse, numColumns) : []}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            ListEmptyComponent={this.renderEmptyContainer()}
            onEndReached={this.handleLoadMore}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={colors.blue3} />
          </View>
        )}
      </SafeAreaViews>
    );
  }
}

export default NextScreen;
