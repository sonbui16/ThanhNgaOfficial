import React, { Component } from 'react';
import { connect } from 'react-redux';

import SafeAreaView from 'components/SafeAreaView';
import CancelLogin from 'container/CancelLogin';
import BtnLogin from 'src/components/BtnLogin';
import ListLearnScreen from 'container/LearnScreen/ListLearnScreen';
@connect(
  state => ({
    site: state.auth.listSite,
    loggedIn: state.auth.loggedIn,
  }),
  {},
)
export class LearnScreen extends React.PureComponent {
  render() {
    const { loggedIn } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {loggedIn ? (
          <ListLearnScreen navigation={this.props.navigation} />
        ) : (
          <CancelLogin />
        )}

        {!this.props.loggedIn && (
          <BtnLogin navigation={this.props.navigation} />
        )}
      </SafeAreaView>
    );
  }
}

export default LearnScreen;
