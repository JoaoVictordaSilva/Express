import React from 'react';
import { Image, StatusBar, AsyncStorage, RefreshControl } from 'react-native';
import {
  ScrollView,
  SafeAreaView,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Title, } from 'native-base';
import { PersonScreen } from './src/components/person';
import Credential from './src/components/login';
import { FlatList } from 'react-native-gesture-handler';
import Api from './src/api/api';

class HomeScreen extends React.Component {

  static navigationOptions = {
    tabBarTestIDProps: {
      testID: 'TEST_ID_HOME',
      accessibilityLabel: 'TEST_ID_HOME_ACLBL',
    },
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor, focused, horizontal }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home'}
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  }

  state = {
    data: null,
    refreshing: false,
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Api.get('person').then(res => {
      this.setState({ data: res, refreshing: false });
    });
  }


  async componentDidMount() {
    const res = await Api.get('person');
    this.setState({ data: res });
  }


  render() {
    return (
      <Container>
        <Header >
          <Body>
            <Title>Moradores</Title>
          </Body>
        </Header>
          <FlatList
            data={this.state.data}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }

            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <HomeLayout source={item.images.length > 0 ? item.images[0].data : null} name={item.na_person} />
              );
            }}
          />
      </Container>
    )
  }
}

class RegisterScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Pessoa',
    tabBarIcon: ({ tintColor, horizontal }) => (
      <Ionicons
        name={'ios-person'}
        size={horizontal ? 20 : 26}
        style={{ color: tintColor }}
      />
    ),
  };

  state = {
    token: null
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@token')
    this.setState({ token })
  }

  render() {
    if (this.state.token) {
      return <PersonContainer />
    }
    return <Credential />
  }
}

const PersonNavigator = createStackNavigator({
  Person: PersonScreen
})

const PersonContainer = createAppContainer(PersonNavigator)

const SimpleTabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: 'Home',
    },
    Chat: {
      screen: RegisterScreen,
      path: 'register',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const AppContainer = createAppContainer(SimpleTabs);

class SimpleTabsContainer extends React.Component {

  render() {
    return <AppContainer />
  }

}

export default SimpleTabsContainer;


const HomeLayout = ({ source, name }) => (
  <Card>
    <CardItem cardBody>
      <Image resizeMode="center" source={{ uri: `data:image/png;base64,${source}` }} style={{ height: 200, width: null, flex: 1 }} />
    </CardItem>
    <CardItem>
      <Left>
        <Button transparent>
          <Icon active />
          <Text>{name}</Text>
        </Button>
      </Left>
    </CardItem>
  </Card>
)
