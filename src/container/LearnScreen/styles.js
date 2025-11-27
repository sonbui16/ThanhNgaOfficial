import {StyleSheet, Dimensions} from 'react-native';
import vari from 'variables/platform';
import colors from 'colors';
import {scale} from 'react-native-size-scaling';


export default StyleSheet.create({
  img: {
    width: vari.width / 3,
    height: vari.width / 3,
  },
  touchable: {
    marginTop: scale(10),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C2C6C9',
    overflow: 'hidden',
    height: vari.width / 3.2,
    backgroundColor: 'white',
    borderRadius: scale(5),
    shadowColor: '#282828',
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 4,
    shadowOffset: {width: 0, height: 1},
  },
  container: {
    height: vari.width / 3.2,
    width: vari.width / 2.5,
    overflow: 'hidden',
  },
  view: {
    justifyContent: 'space-evenly',
    marginHorizontal: scale(10),
  },
  viewLesson: {
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: colors.blue3,
    padding: scale(10),
  },
  viewNote: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    borderRadius: scale(25),
  },
  viewDiscuss: {
    paddingVertical: scale(5),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    borderRadius: scale(25),
  },
  inputDiss: {
    marginTop: scale(5),
    marginBottom: scale(5),
    fontSize: scale(14),
    textAlign: 'center',
  },
  input: {
    paddingVertical: scale(5),
    width: vari.width / 1.3,
  },
  touchableDoc: {
    padding: scale(10),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  touchableDiscuss: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: scale(10),
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  touchDiss: {
    justifyContent: 'center',
    alignItems: 'center',
    width: vari.width / 3,
    height: scale(40),
    backgroundColor: colors.blue1,
    borderRadius: scale(19),
    padding: scale(10),
  },
  view2Diss: {
    paddingVertical:scale(30),
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    
  },
});
