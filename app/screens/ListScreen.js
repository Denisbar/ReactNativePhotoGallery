/**
 * Created by denis on 8/2/2017.
 */
import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Button,
    StyleSheet
} from 'react-native';

class ListScreen extends React.Component {
    static navigationOptions = {
        title: 'List',
    };

    constructor() {
        super();
        this.state = {
            currentPage: '',
            photos: [],
            count: 1,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(currentPage = this.state.count) {
        let page = '&page=';
        let URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF' + page + currentPage;
        return fetch(URL)
            .then((response) => response.json())
            .then((response) =>{
                this.setState({currentPage: response.current_page});
                this.setState({photos: response.photos});
            });
    }

    getNextPage() {
        this.setState({count: this.state.count + 1}, () => {
            this.getData(this.state.count);
        });
    }

    getPreviousPage() {
        if(this.state.count > 0) {
            this.setState({count: this.state.count - 1}, () => {
                this.getData(this.state.count);
            });
        }
        if(this.state.count == 0) {
            this.setState({count: 1}, () => {
                this.getData(this.state.count);
            });
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <ScrollView>
                    <Text style={styles.fontTitle}>Page number: {this.state.currentPage}</Text>
                    <View style={styles.buttonStyle}>
                        <Button
                            onPress={this.getNextPage.bind(this)}
                            title="NEXT PAGE"
                            color="#841584"
                            accessibilityLabel="Next page"
                        />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button
                            onPress={this.getPreviousPage.bind(this)}
                            title="PREVIOUS PAGE"
                            color="#009900"
                            accessibilityLabel="Previous page"
                        />
                    </View>
                    <View style={styles.listStyle}>
                        {this.state.photos.map((obj, i) => (
                            <TouchableOpacity
                                style={{height: 70, marginTop: 10, justifyContent: 'flex-start', alignItems: 'center'}}
                                onPress={() => {
                                    navigate('Photo', { name: obj.user.cover_url });
                                }}
                                key={i}
                            >
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri: obj.user.avatars.small.https}}
                                />
                                <Text style={styles.fontText}>{obj.user.firstname} {obj.user.lastname}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    buttonStyle: {
        height: 50,
        paddingTop: 10,
    },
    listStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    fontText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    fontTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default ListScreen;