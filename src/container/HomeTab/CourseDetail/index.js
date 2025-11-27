import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@rneui/base';
import { scale } from 'react-native-size-scaling';
import HTML from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';
import RNIap, {
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  getProducts,
  requestPurchase,
} from 'react-native-iap';

import { isRequestPending } from 'src/store/selectors';
import {
  coursesDetail,
  teachers,
  lessons,
  trialLessons,
  lessonsID,
} from 'store/actions/app';
import SafeAreaViews from 'components/SafeAreaView';
import { Card, ListItem, Avatar, Icon, Rating } from '@rneui/themed';
import { getIdYoutube } from 'src/utils';
import vari from 'variables/platform';
import images from 'src/assets/images';
import Toolbar from 'src/components/Toolbar';
import colors from 'variables/colors';

@connect(
  state => ({
    site: state.auth.listSite,
    idSite: state.auth.infoSite,
    loading: isRequestPending(state, 'coursesDetail'),
  }),
  {
    coursesDetail,
    teachers,
    lessons,
    trialLessons,
    lessonsID,
  },
)
export class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataTeacher: {},
      datatrialLessons: [],
      expanded: {},
      loadingIAP: false,
      checkAssign: [],
    };
  }
  purchaseUpdateSubscription = null;
  purchaseErrorSubscription = null;

  async componentDidMount() {
    const { item } = this.props.route.params;
    const { coursesDetail, site, teachers, trialLessons, lessonsID, idSite } =
      this.props;
    this.props.navigation.setOptions({
      headerTitle: item.seo_title || 'Chi tiết khoá học',
    });
    coursesDetail(item._id, site.access_token, (err, data) => {
      if (!err) {
        this.setState({ data: data });
      }
    });

    'teacher_id' in item &&
      teachers(
        item.teacher_id,
        {
          site_id: idSite.id,
        },
        (err, data) => {
          if (!err) {
            this.setState({ dataTeacher: data });
          }
        },
      );
    trialLessons(item._id, (err, data) => {
      if (!err) {
        this.setState({ datatrialLessons: data });
      }
    });
    lessonsID('noSearch', item._id, site.access_token, (err, data) => {
      if (!err) {
        this.setState({ checkAssign: data?.data });
      }
    });

    try {
      initConnection().then(() => {
        const sku = item?.price_sell.toString();
        const newSku = 'courses' + sku.replace(/000$/, '');
        getProducts({ skus: [newSku] }).then(res => {});
        this.purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
          const receipt = purchase.transactionReceipt;
        });
        this.purchaseErrorSubscription = purchaseErrorListener(error => {
          this.setState({ loadingIAP: false });
        });
      });
    } catch (err) {}

    if (Platform.OS === 'ios') {
      initConnection().then(() => {
        this.purchaseUpdateSubscription = purchaseUpdatedListener(() => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            yourAPI
              .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
              .then(async deliveryResult => {
                if (isSuccess(deliveryResult)) {
                  await finishTransaction({ purchase, isConsumable: true });
                  await finishTransaction({ purchase, isConsumable: false });
                } else {
                }
              });
          }
        });
        this.purchaseErrorSubscription = purchaseErrorListener(error => {
          this.setState({ loadingIAP: false });
        });
      });
    }
  }
  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }
  callAttachment = (item, dataCourse, dataType) => {
    const { lessonsID, site } = this.props;
    lessonsID('attachment', item._id, site.access_token, (err, data) => {
      if (!err) {
        this.props.navigation.navigate('DetailLearnScreen', {
          item,
          dataCourse,
          dataType,
        });
      }
    });
  };
  formatCurrencyVND = value => {
    const number = Number(value);
    if (isNaN(number)) return 0;
    return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };

  showButton = item => {
    const { checkAssign, loadingIAP, data } = this.state;
    const checkAssign2 = checkAssign.length === 0;
    const dataCourse = {
      type_open_lesson: data?.data?.type_open_lesson,
    };
    if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell === 0
    ) {
      return (
        <View>
          <Button
            color="success"
            title={'VÀO HỌC NGAY'}
            buttonStyle={{
              borderRadius: 3,
              marginTop: scale(15),
            }}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
            }}
            onPress={
              checkAssign2
                ? () => this.callAttachment(item, dataCourse, data?.data)
                : () => {
                    this.props.navigation.navigate('DetailLearnScreen', {
                      item: item,
                      dataCourse,
                      dataType: data?.data,
                    });
                  }
            }
          />
        </View>
      );
    } else if (item.no_retail === true && item.price_sell === 0) {
      return <View></View>;
    } else if (
      (item.no_retail === false || item.no_retail === undefined) &&
      item.price_sell !== 0
    ) {
      return (
        <View>
          {Platform.OS === 'ios' && (
            <Button
              loading={loadingIAP}
              color="error"
              title="ĐĂNG KÝ HỌC"
              buttonStyle={{
                borderRadius: 3,
              }}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
              onPress={() => this.purchase()}
            />
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

  purchase = async () => {
    const { item } = this.props.route.params;
    this.setState({ loadingIAP: true });
    const sku = item.price_sell.toString();
    const newSku = 'courses' + sku.replace(/000$/, '');
    try {
      await requestPurchase({
        sku: newSku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      this.setState({ loadingIAP: false });
    }
  };
  render() {
    const { data, dataTeacher, expanded, datatrialLessons } = this.state;
    const { item } = this.props.route.params;
    const priceSell = parseFloat(item.price_sell);
    const PriceNotSell = parseFloat(item.price);

    const price_sell = this.formatCurrencyVND(priceSell);
    const price = this.formatCurrencyVND(PriceNotSell);

    return (
      <SafeAreaViews>
        {!this.props.loading ? (
          <ScrollView style={{ marginBottom: scale(18) }}>
            {/* Video giới thiệu */}
            {item.video_intro ? (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: scale(20),
                }}
              >
                <YoutubePlayer
                  height={vari.width / 1.8}
                  initialPlayerParams={{}}
                  play={true}
                  videoId={getIdYoutube(`${item.video_intro}`)}
                />
              </View>
            ) : (
              <Image
                style={{
                  width: '90%',
                  height: scale(220),
                  alignSelf: 'center',
                  marginTop: scale(20),
                }}
                defaultSource={images.noThumb}
                resizeMode="stretch"
                source={{
                  uri: item.thumbnail_url,
                }}
              />
            )}
            {/* Giá sản phẩm */}
            {item.price !== 0 && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: scale(10),
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      {price_sell}
                    </Text>

                    {priceSell !== PriceNotSell && (
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          fontSize: scale(14),
                          marginLeft: scale(10),
                          color: 'black',
                        }}
                      >
                        {price}
                      </Text>
                    )}
                  </View>
                  {priceSell !== PriceNotSell && (
                    <Button
                      disabled={true}
                      disabledStyle={{ backgroundColor: 'orange' }}
                    >
                      <Text style={{ color: 'white', fontSize: scale(14) }}>
                        -
                        {Math.round(
                          ((PriceNotSell - priceSell) / PriceNotSell) * 100,
                        )}
                        %
                      </Text>
                    </Button>
                  )}
                </View>
              </>
            )}
            {/* Đăng ký học */}
            {Platform.OS == 'ios' && this.showButton(item)}
            {/* Bạn sẽ học được gì */}
            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Bạn sẽ học được gì
              </Text>

              <HTML
                source={{ html: data?.about_instructor || '<p></p>' }}
                imagesMaxWidth={Dimensions.get('window').width}
                tagsStyles={{
                  body: { color: 'black', fontSize: scale(14) },
                }}
              />
            </Card>
            {/* Giới thiệu khoá học */}
            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Giới thiệu khoá học
              </Text>

              <HTML
                source={{ html: data?.about_courses || '<p></p>' }}
                imagesMaxWidth={Dimensions.get('window').width}
                tagsStyles={{
                  body: { color: 'black', fontSize: scale(14) },
                }}
              />
            </Card>
            {/* Nội dung khoá học */}
            <Card>
              <Text
                style={{
                  fontSize: scale(16),
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Nội dung khoá học
              </Text>
              {datatrialLessons?.length > 0 ? (
                datatrialLessons?.map((item, index) => {
                  return (
                    <ListItem.Accordion
                      key={index.toString()}
                      content={
                        <ListItem.Content>
                          <ListItem.Title
                            style={{ fontSize: scale(16), color: 'black' }}
                          >
                            {item?.name}
                          </ListItem.Title>
                        </ListItem.Content>
                      }
                      isExpanded={item === expanded}
                      onPress={() => {
                        if (expanded === item) {
                          this.setState({ expanded: {} });
                        } else {
                          this.setState({ expanded: item });
                        }
                      }}
                    >
                      {item &&
                        item.child &&
                        item.child.map((l, i) => {
                          return (
                            <ListItem key={i.toString()}>
                              <ListItem.Content>
                                <ListItem.Title
                                  style={{
                                    fontSize: scale(14),
                                    color: 'black',
                                  }}
                                >
                                  {l?.name}
                                </ListItem.Title>
                              </ListItem.Content>
                            </ListItem>
                          );
                        })}
                    </ListItem.Accordion>
                  );
                })
              ) : (
                <Text></Text>
              )}
            </Card>
            {/* Thông tin giảng viên */}
            <Card>
              <Text
                style={{
                  fontSize: scale(14),
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                Thông tin giảng viên
              </Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                  size={'large'}
                  rounded
                  source={{
                    uri: dataTeacher?.photo
                      ? dataTeacher?.photo
                      : 'https://enpro.edubit.vn/data/share/no-thumb.png',
                  }}
                />
                {item?.count_student ? (
                  <Text
                    style={{
                      fontSize: scale(12),
                      color: 'black',
                      marginVertical: scale(5),
                    }}
                  >
                    {item?.count_student} Học viên
                  </Text>
                ) : (
                  <Text></Text>
                )}

                <HTML
                  source={{ html: dataTeacher?.general_names || '<p></p>' }}
                  imagesMaxWidth={Dimensions.get('window').width}
                  tagsStyles={{
                    body: { color: 'black', fontSize: scale(14) },
                  }}
                />
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: 'bold',
                    color: colors.blue3,
                    marginVertical: scale(5),
                  }}
                >
                  {dataTeacher?.fullname || `Chưa có giảng viên`}
                </Text>
              </View>
              {dataTeacher?.info == true ? (
                <>
                  <HTML
                    source={{ html: dataTeacher?.info || '<p></p>' }}
                    imagesMaxWidth={Dimensions.get('window').width}
                  />
                </>
              ) : (
                <></>
              )}
            </Card>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size={'small'} color={colors.blue3} />
          </View>
        )}
      </SafeAreaViews>
    );
  }
}
export default CourseDetail;
