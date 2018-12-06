import Api from '../api/api'
import { AsyncStorage, StyleSheet, ToastAndroid } from 'react-native';
import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import { Container, Header, Content, Form, Item, Input, Button, Text, Label, Left, Body, Right, Title, Icon } from 'native-base';
import { sendToast } from '../api/util/util';
import { PersonScreen } from './person';

export class SigninScreen extends React.Component {

    state = {
        email: '',
        password: ''

    }

    static navigationOptions = {
        tabBarLabel: 'Person',
        tabBarIcon: ({ tintColor, horizontal }) => (
            <Ionicons
                name={'ios-person'}
                size={horizontal ? 20 : 26}
                style={{ color: tintColor }}
            />
        ),
    };

    async handleLogin() {
        if (this.validCrendentials()) {
            const res = await Api.post('session', this.state)
            if (res.token) {
                await AsyncStorage.setItem('@token', res.token);
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Person'})],
                });
                this.props.navigation.dispatch(resetAction);
            } else if (res[0]) {
                sendToast(res[0].message)
            }
        }
    }

    async handleHasntAccount() {
        this.props.navigation.navigate('Signup');
    }

    validateEmail() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(this.state.email);
    }

    validatePassword() {
        return this.state.password.length > 4;
    }

    disableButtonLogin() {
        return this.validCrendentials();
    }

    validCrendentials() {
        return this.validateEmail() && this.validatePassword();
    }

    render() {
        return (
            <Container >
                <Header>
                    <Left />
                    <Body>
                        <Title>Ajude o Próximo</Title>
                    </Body>
                    <Right />
                </Header>
                <Container style={styles.container}>
                    <Content padder>
                        <Form>
                            <Item rounded style={styles.textBox}
                                success={this.validateEmail()}
                                error={!this.validateEmail()}>
                                <Input ref="email" onChangeText={email => this.setState({ email })} keyboardType="email-address" placeholder="Email" textContentType="emailAddress" />
                                <Icon name={this.validateEmail() ? 'ios-checkmark-circle' : 'ios-close-circle'} />

                            </Item>
                            <Item rounded style={styles.textBox}
                                success={this.validatePassword()}
                                error={!this.validatePassword()}>
                                <Input ref="password" onChangeText={password => this.setState({ password })} secureTextEntry placeholder="Password" />
                                <Icon name={this.validatePassword() ? 'ios-checkmark-circle' : 'ios-close-circle'} />

                            </Item>
                            <Button onPress={() => this.handleLogin()} primary rounded style={styles.loginButton}><Text style={styles.loginText}> Login </Text></Button>
                            <Label onPress={() => this.handleHasntAccount()} style={styles.signUpLabel}>Não possui conta?</Label>
                        </Form>
                    </Content>
                </Container>
            </Container>
        );
    }
}


class SignupScreen extends React.Component {

    state = {
        username: '',
        email: '',
        password: ''

    }

    validateUsername() {
        return this.state.username.length > 3;
    }

    validateEmail() {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(this.state.email);
    }

    validatePassword() {
        return this.state.password.length > 4;
    }


    validCrendentials() {
        return this.validateEmail() && this.validateUsername() && this.validatePassword();
    }

    async handleSignup() {
        if (this.validCrendentials()) {
            try {
                const res = await Api.post('user', this.state)
                if (res.message) {
                    sendToast(res.message);
                    this.props.navigation.goBack();
                } else if (res[0]) {
                    sendToast(res[0].message);
                }
            } catch (err) {
                sendToast('Ocorreu um erro');
            }
        }

    }

    render() {

        return (<Container >
            <Header>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Registre - se</Title>
                </Body>
                <Right />
            </Header>
            <Container style={styles.container}>
                <Content padder>
                    <Form>
                        <Item rounded style={styles.textBox}
                            success={this.validateUsername()}
                            error={!this.validateUsername()}>
                            <Input ref="username" onChangeText={username => this.setState({ username })} placeholder="Username" />
                            <Icon name={this.validateUsername() ? 'ios-checkmark-circle' : 'ios-close-circle'} />
                        </Item>
                        <Item rounded style={styles.textBox}
                            success={this.validateEmail()}
                            error={!this.validateEmail()}>
                            <Input ref="email" onChangeText={email => this.setState({ email })} keyboardType="email-address" placeholder="Email" textContentType="emailAddress" />
                            <Icon name={this.validateEmail() ? 'ios-checkmark-circle' : 'ios-close-circle'} />

                        </Item>
                        <Item rounded style={styles.textBox}
                            success={this.validatePassword()}
                            error={!this.validatePassword()}>
                            <Input ref="password" onChangeText={password => this.setState({ password })} secureTextEntry placeholder="Password" />
                            <Icon name={this.validatePassword() ? 'ios-checkmark-circle' : 'ios-close-circle'} />

                        </Item>
                        <Button onPress={() => this.handleSignup()} primary rounded style={styles.loginButton}><Text style={styles.loginText}> Registrar </Text></Button>
                    </Form>
                </Content>
            </Container>
        </Container>);
    }
}


const AppNavigator = createStackNavigator({
    Signin: {
        screen: SigninScreen
    },
    Signup: {
        screen: SignupScreen
    },
    Person: {
        screen: PersonScreen,
        path: 'Person'
    }

}, {
        initialRouteName: 'Signin',
        headerMode: 'none'
    });

const Credential = createAppContainer(AppNavigator);

export default Credential;

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    textBox: {
        borderColor: "#A958F2",
        marginTop: 10
    },

    loginButton: {
        flex: 1,
        marginTop: 10,
    },

    loginText: {
        textAlign: 'center',
    },

    signUpLabel: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        color: "#0000FF",
        marginTop: 10,
        textDecorationLine: 'underline'
    }

});