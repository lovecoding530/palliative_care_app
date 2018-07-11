import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    View,
    Linking,
    ScrollView,
    Share,
    FlatList,
    Dimensions,
    WebView,
    ImageBackground
} from 'react-native';

import Styles from './styles';
import Text from '@text'
import Footer from '@footer'
import Button from '@button'
import {Colors, Images, FontSizes} from '@theme';
import { Loader } from '@components';

const { width,height } = Dimensions.get('window');
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import {SharedModal} from '../../modals';

export default class LookAfterYourself extends Component {
    constructor(props) {
        super(props);
        this._share=this._share.bind(this);
        this._showResult=this._showResult.bind(this);
        this.state = ({
            modalVisible : false
        })
    }

    componentDidMount() {
       

    }
    
    _showResult(result){
        if(result.action == "sharedAction")
        {
                this.setState({modalVisible: true})
            console.log("Your content has been share successfully.");
        }
        else
        {
            console.log("You have cancelled sharing.");
        }
    }

    _share(){
        Share.share({
            message : 'Dying To Talk',
            url : 'http://www.godeckyourself.com'
        }).then(this._showResult.bind(this));
    }

    closeModal(){
        this.setState({
            modalVisible: false
        })
    }

    render() {   

        return (
            <ImageBackground source={Images.bg_get_help} resizeMode="stretch" style={Styles.container} >

                <ScrollView contentContainerStyle={Styles.scroll}>

                    <View style={Styles.titleView}>
                             <Text large style={Styles.title}>Looking after yourself</Text>
                    </View>

                    <View style={[Styles.itemView]}>
                        <Image style={[Styles.middleimage]} resizeMode="contain" source={Images.iocn_lookig_after_yourself}/>
                        <Text smallMedium  style={Styles.subtitle}>Primis mi condimentum magnis parturient mollis parturient vestibulum non quisque potenti 
                                                            integer cum elit sed sit sodales netus nullam phasellus diam. Sem molestie primis ornare 
                                                            aenean a a ut a class parturient ipsum magnis nunc ipsum nibh elit.</Text>
                        <Text smallMedium  style={Styles.subtitle}>Eu mauris condimentum a arcu a libero risus a a suspendisse tempus ultrices 
                                                            ullamcorper donec cum nulla.</Text>
                        <Text  smallMedium style={Styles.subtitle}>Primis mi condimentum magnis parturient mollis parturient vestibulum non quisque potenti 
                                                            integer cum elit sed sit sodales netus nullam phasellus diam.</Text>
                        <Text  smallMedium bold style={Styles.subtitle}>If you, or someone you know needs support, call lifeline now on 13 11 14.</Text>

                        <Text  smallMedium bold style={Styles.subtitle}>If life is in immediate danger call 000</Text>
                       
                    </View>
                </ScrollView> 
                <View style={Styles.buttonBar}>
                    <Button bold light onPress={ ()=> this.props.navigation.navigate('Home') } >Go back</Button>
                    <Button bold dark  onPress={this._share} >Share</Button>
                </View>
                <SharedModal 
                    visible={this.state.modalVisible} 
                    onCancel={this.closeModal.bind(this)}
                    />
            </ImageBackground>
        );
    }
}
