/**
 * Created by denis on 8/2/2017.
 */
import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

class PhotoScreen extends React.Component{
    static navigationOptions = {
        title: 'Photo',
        headerTintColor: 'green'
    };

    render(){
        const {state} = this.props.navigation;
        var name = state.params;
        return(
            <View style={{flex:1}}>
                <Image
                    style={{flex:1}}
                    source={{uri: name.name}}
                    resizeMode={'contain'}
                />
            </View>
        );
    }
}

export default PhotoScreen;