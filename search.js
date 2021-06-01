import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import { debounce } from "lodash";
import Autocomplete from 'react-native-autocomplete-input';

import getSuggestions from './apiServer';

const Search = () => {
    let textInputRef = React.createRef(); // for handling focus event

    const [response, setResponse] = useState([]);
    const [query, setQuery] = useState('');
    const [hideResultProduct, setHideResultProduct] = useState(false); // for hide/show suggestions list
    const [error, setError] = useState(false); // for showing error

    // API hit
    const fetchData = () => {
        getSuggestions(query).then((res) => {
            setHideResultProduct(false);
            setResponse(res);
            setError(false);
        }).catch((e) => {
            // Error handling
            setError(true);
            setResponse([]);
            setHideResultProduct(true);
        })
    }

    const handler = debounce(fetchData, 500); // optimised API calls

    useEffect(() => {
        if (query) {
            handler();
        } else {
            setResponse([]);
            setHideResultProduct(true);
        }
    }, [query])

    const onSelectSuggestions = (item) => {
        setQuery(`${item} `);
        if (textInputRef) {
            textInputRef.focus();
        }
    }

    const hideSuggestions = () => {
        Keyboard.dismiss();
        setHideResultProduct(true)
    }

    return (
        <SafeAreaView>
            <Text style={styles.title}>Search Box</Text>
            {/* For handling outside click event */}
            <TouchableWithoutFeedback
                onPress={hideSuggestions}
                style={{width: '100%'}}>
                <View style={styles.outerContainer} />
            </TouchableWithoutFeedback>
          <View style={styles.container}>
            <Autocomplete
                data={response}
                value={query}
                onChangeText={text => setQuery(text)}
                placeholder="Search"
                hideResults={hideResultProduct}
                onFocus={() => setHideResultProduct(false)}
                onSubmitEditing={() => setHideResultProduct(true)}
                flatListProps={{
                    keyExtractor: (_, idx) => idx,
                    renderItem: ({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => onSelectSuggestions(item)}
                            >
                                <Text>
                                    {item.split(query).map((str, index, arr) =>
                                        <Text key={index} style={{color: 'gray'}}>{str}{arr.length > index+1 && <Text style={{backgroundColor: 'yellow'}}>{query}</Text>}</Text>
                                    )}
                                </Text>{/*For highlighted text*/}
                            </TouchableOpacity>
                        )},
                }}
                renderTextInput={(Textprops) => (
                    <TextInput
                        {...Textprops}
                        style={{}}
                        ref={(ref)=>{textInputRef = ref}}
                    />
                )}
            />
            {error && <Text style={{color: 'red'}}>Something went wrong!</Text>}{/* API error handling */}
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20
    },
    container: {
        margin: 25,
        flex: 1,
        paddingTop: 25,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 40,
        zIndex: 1,

    },
    outerContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom:0,
        left: 0
    },
    item: {
        padding: 10,
        borderWidth: 0.2,
        borderBottomColor: 'gray'
    }
});

export default Search;