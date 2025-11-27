import React, {Component} from 'react';
import {
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from 'colors';
import images from 'imagesApp';
import vari from 'variables/platform';
import DiscussItem from 'components/DiscussItem';
import {scale} from 'react-native-size-scaling';


export class Discuss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDiscussion: [],
      data: props.data,
      discuss: '',
      starCount: 0,
      visible: false,
      comment: '',
    };
  }

  renderItem = ({item, index}) => {
    return <DiscussItem key={index} data={item} />;
  };
  validateFied = discuss => {
    if (discuss === '') {
      Alert.alert('Thông báo', `Bạn chưa nhập bình luận`, [{text: 'Đồng ý'}], {
        cancelable: false,
      });
      return false;
    }
    return true;
  };
  goDiscuss = values => {
    const {addDiscussions, itemLearn, item, auth} = this.props;
    const infoInput = {};
    if (this.validateFied(values.discuss)) {
      infoInput.token = auth.token;
      infoInput.course_id = item.ID;
      infoInput.lesson_id = itemLearn.id;
      infoInput.message = values.discuss;
      addDiscussions(infoInput, (err, data) => {
        if (err) return;
        if (data && data.data && data.data) {
          Alert.alert(
            'Thông báo',
            `Gửi bình luận thành công`,
            [
              {
                text: 'Đồng ý',
              },
            ],
            {cancelable: false},
          );
        }
      });
    }
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  validateFiedComment = comment => {
    if (comment === '') {
      Alert.alert(
        'Thông báo',
        `Vui lòng nhập thông tin đánh giá`,
        [{text: 'Đồng ý'}],
        {cancelable: false},
      );
      return false;
    }
    return true;
  };
  postEvaluate = values => {
    const {ratingCourse, auth, item} = this.props;
    const infoInput = {};
    if (this.validateFiedComment(values.comment)) {
      infoInput.token = auth.token;
      infoInput.course_id = item.ID;
      infoInput.rating_value = this.state.starCount;
      infoInput.comment = values.comment;
      ratingCourse(infoInput, (err, data) => {
        if (err) return;
        if (data && data.data) {
          this.setState({visible: !this.state.visible});
        }
      });
    }
  };
  render() {
    const {data, dataDiscussion, visible} = this.state;
    const {item} = this.props;

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => this.setState({visible: !visible})}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ddd',
            padding: scale(10),
          }}>
          <Text size14>Đánh giá khoá học :</Text>
          {/* <StarRating
              starStyle={{marginLeft: scale(2), marginVertical: scale(5)}}
              disabled
              maxStars={5}
              rating={this.state.starCount}
              // rating={this.state.starCount}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              starSize={scale(18)}
              fullStarColor={colors.orange}
            /> */}
        </TouchableOpacity>

        {/* {data.data && data.data.discussions ? (
          <FlatList
            extraData={this.state}
            keyExtractor={(item) => item.ID}
            data={data.data && data.data.discussions}
            renderItem={this.renderItem}
          />
        ) : ( */}
        <FlatList
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          data={item.comments}
          renderItem={this.renderItem}
        />
        {/* )} */}

        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: scale(10),
          }}>
          <View
            style={{
              paddingVertical: scale(10),
              paddingHorizontal: scale(15),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#ddd',
              borderRadius: scale(25),
            }}>
            <TextInput
              value={this.state.discuss}
              multiline={true}
              style={{paddingVertical: scale(5), width: vari.width / 1.3}}
              autoCapitalize="none"
              selectionColor={colors.blue3}
              placeholder="Nhập nội dung thảo luận"
              onChangeText={value => this.setState({discuss: value})}
            />
            <TouchableOpacity
              onPress={() => this.goDiscuss({discuss: this.state.discuss})}>
              <Text>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={visible}
          backdropOpacity={0.4}
          onBackdropPress={() => this.setState({visible: !visible})}
          ref={ref => (this.popup = ref)}>
          <View
            white
            style={{
              overflow: 'hidden',
              borderRadius: scale(10),
              // paddingBottom :scale(10)
            }}>
            <View
              center
              style={{padding: scale(10), backgroundColor: colors.blue3}}>
              <Text size14 white>
                Đánh giá khoá học
              </Text>
            </View>
            <View center style={{padding: scale(10)}}></View>
            <View
              center
              style={{
                marginHorizontal: scale(10),
                padding: scale(10),
                backgroundColor: '#ddd',
                borderRadius: scale(5),
              }}>
              <TextInput
                style={{
                  marginTop: scale(5),
                  marginBottom: scale(5),
                  fontSize: scale(14),
                  textAlign: 'center',
                }}
                value={this.state.comment}
                onChangeText={value => this.setState({comment: value})}
                multiline={true}
                selectionColor={colors.blue3}
                placeholder="Nhập nội dung đánh giá"
              />
            </View>
            <View center style={{padding: scale(10)}}>
              <TouchableOpacity
                onPress={() => this.postEvaluate({comment: this.state.comment})}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: vari.width / 3,
                  height: scale(40),
                  backgroundColor: colors.blue1,
                  borderRadius: scale(19),
                  padding: scale(10),
                }}>
                {!this.props.loadingRating ? (
                  <Text white style={{}}>
                    GỬI ĐÁNH GIÁ
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Discuss;
