import { StyleSheet, Modal, AsyncStorage, TouchableHighlight } from 'react-native';
import { RNCamera } from 'react-native-camera';
import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Body, Right, Title, Icon, Textarea, DatePicker } from 'native-base';
import {
    ModalContainer,
    ModalImagesListContainer,
    ModalImagesList,
    ImageCenter,
    ModalImageItem,
    ModalButtons,
    CameraButtonContainer,
    CancelButtonText,
    ContinueButtonText,
    TakePictureButtonContainer,
    TakePictureButtonLabel,
} from './styles';
import Api from '../api/api';
import { sendToast } from '../api/util/util';

export class PersonScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    state = {
        na_person: '',
        dt_birthday: '',
        dt_street_time: null,
        ds_history: '',
        address: {
            na_city: '',
            na_neighborhood: '',
            na_uf: ''
        },
        dataModalOpened: false,
        cameraModalOpened: false,
        images: []
    }

    setBirthday(dt_birthday) {
        dt_birthday = this.getLocalteDateString(dt_birthday);
        this.setState({ dt_birthday });
    }

    setStreetTime(dt_street_time) {
        dt_street_time = this.getLocalteDateString(dt_street_time);
        this.setState({ dt_street_time });
    }

    getLocalteDateString(value) {
        return new Date(value);
    }


    validateCity() {
        return this.state.address.na_city.length > 4;
    }

    validateNaPerson() {
        return this.state.na_person.length > 2;
    }

    validateNaBirthday() {
        return !(!this.state.dt_birthday);
    }

    validCrendentials() {
        return this.validateNaPerson() && this.validateNaBirthday() && this.validateCity();
    }

    async handleRegister() {
        if (this.validCrendentials()) {
            const state = { ...this.state };
            delete state.dataModalOpened;
            delete state.cameraModalOpened;
            const { images } = state;
            delete state.images;
            try {
                let res = await Api.post('person', state)
                const person = res.data.id_person;

                if (images && images.length > 0) {
                    const token = await AsyncStorage.getItem('@token');
                    res = await Api.post(`person/${person}/image`, images[0], token);
                }
                this.setState({ images: [] })
                sendToast(res.message)
            } catch (err) {
                sendToast(JSON.stringify(res.message))
            }
        } else {
            sendToast('Há campos inválidos')
        }
    }

    handleCameraModalClose = () => this.setState({ cameraModalOpened: !this.state.cameraModalOpened })

    handleTakePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true, };
            const data = await this.camera.takePictureAsync(options)
            const { images } = this.state;
            this.setState({
                images: [
                    {
                        data: data.base64,
                        na_image: data.uri.split('/')[data.uri.split('/').length - 1]
                    }
                ]
            })
        }
    }

    handleDataModalClose = () => this.setState({
        dataModalOpened: !this.state.dataModalOpened,
        cameraModalOpened: false,
    })

    renderImagesList = () => (
        this.state.images.length !== 0 && (
            <ModalImagesListContainer>
                <ImageCenter horizontal>
                    <TouchableHighlight>
                        <ModalImageItem source={{ uri: `data:image/png;base64,${this.state.images[0].data}` }} resizeMode="stretch" />
                    </TouchableHighlight>
                </ImageCenter>
            </ModalImagesListContainer>
        )
    )

    renderCameraModal = () => (
        <Modal
            visible={this.state.cameraModalOpened}
            transparent={false}
            animationType="slide"
            onRequestClose={this.handleCameraModalClose}
        >
            <ModalContainer>
                <ModalContainer>
                    <RNCamera
                        ref={camera => {
                            this.camera = camera;
                        }}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.back}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={"Permission to use camera"}
                        permissionDialogMessage={
                            "We need your permission to use your camera phone"
                        }
                    />
                    <TakePictureButtonContainer onPress={this.handleTakePicture}>
                        <TakePictureButtonLabel />
                    </TakePictureButtonContainer>
                </ModalContainer>
                {this.renderImagesList()}
                <ModalButtons>
                    <CameraButtonContainer onPress={this.handleCameraModalClose}>
                        <CancelButtonText>Cancelar</CancelButtonText>
                    </CameraButtonContainer>
                    <CameraButtonContainer onPress={this.handleDataModalClose}>
                        <ContinueButtonText>Continuar</ContinueButtonText>
                    </CameraButtonContainer>
                </ModalButtons>
            </ModalContainer>
        </Modal>
    )


    render() {

        return (<Container >
            <Header>
                <Body>
                    <Title>Ajude alguém</Title>
                </Body>
                <Right />
            </Header>
            <Container style={styles.container}>
                <Content padder>
                    <Form>
                        <Item rounded style={styles.textBox}
                            success={this.validateNaPerson()}
                            error={!this.validateNaPerson()}>
                            <Input ref="username" onChangeText={na_person => this.setState({ na_person })} placeholder="Nome" />
                            <Icon name={this.validateNaPerson() ? 'ios-checkmark-circle' : 'ios-close-circle'} />
                        </Item>
                        <Item rounded style={styles.textBox}
                            success={this.validateNaBirthday()}
                            error={!this.validateNaBirthday()}>

                            <DatePicker
                                maximumDate={new Date(new Date().getFullYear() - 10, 12, 31)}
                                locale={"pt"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Data de aniversário"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={dt_birthday => this.setBirthday(dt_birthday)}
                            />
                            <Icon style={styles.iconRight} name={this.validateNaBirthday() ? 'ios-checkmark-circle' : 'ios-close-circle'} />


                        </Item>
                        <Item rounded style={styles.textBox}>
                            <DatePicker
                                maximumDate={new Date(new Date().getFullYear() - 10, 12, 31)}
                                locale={"pt"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Tempo de rua"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={dt_street_time => this.setStreetTime(dt_street_time)}
                            />
                        </Item>
                        <Item rounded style={styles.textBox}>
                            <Textarea rowSpan={5} onChangeText={ds_history => this.setState({ ds_history })} placeholder="História" />
                        </Item>
                        <Item rounded style={styles.textBox}>
                            <Input onChangeText={na_uf => this.setState(prevState => ({ address: { ...prevState.address, na_uf } }))} placeholder="Estado" />
                        </Item>
                        <Item rounded style={styles.textBox}
                            success={this.validateCity()}
                            error={!this.validateCity()}>
                            <Input onChangeText={na_city => this.setState(prevState => ({ address: { ...prevState.address, na_city } }))} placeholder="Cidade" />
                            <Icon name={this.validateCity() ? 'ios-checkmark-circle' : 'ios-close-circle'} />
                        </Item>
                        <Item rounded style={styles.textBox}>
                            <Input ref="email" onChangeText={na_neighborhood => this.setState(prevState => ({ address: { ...prevState.address, na_neighborhood } }))} placeholder="Bairro" />

                        </Item>
                        <Button onPress={this.handleCameraModalClose} primary rounded style={styles.loginButton}><Text style={styles.loginText}> Câmera </Text></Button>

                        <Button onPress={() => this.handleRegister()} primary rounded style={styles.loginButton}><Text style={styles.loginText}> Salvar </Text></Button>
                        {this.renderCameraModal()}

                    </Form>
                </Content>
            </Container>
        </Container>);
    }
}

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
    },

    iconRight: {
        textAlign: 'right'
    },

    camerIcon: {
        flex: 1
    }

});