import React, { useEffect, useState } from 'react';
import { SafeAreaView ,Image, FlatList, StyleSheet, Text, View } from 'react-native';
import { Header, Card, ListItem, Button, Icon } from 'react-native-elements';

export default function App() {

	const API_KEY = "fb381904399e48cc8933a83d697d1d3f";
	const URL = `https://newsapi.org/v2/top-headlines?country=ph&apiKey=${API_KEY}`;
	const [articles, setArticles] = useState([]);
	const [loading, setLoading ] = useState(true);

	useEffect(()=>{
		fetch(URL, {
			method: 'GET',
		  	headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
  			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
		  return responseJson.articles;
		})
		.then( articles  => {
		  setArticles(articles);
		  //console.log(articles);
		  setLoading(false);
		})
		.catch( error => {
		  console.error(error);
		});

		} , []);
	

	console.log(URL);
	//console.log(articles);

		// <View style={styles.container}>
		// 	<Text style={styles.text}>Open up App.js to start working on your app!</Text>
		// </View>

		if (loading)
		{
		  return <Text style={styles.text}>Loading...</Text>
		} 
		else 
		{
		  return <HomeScreen articles = { articles }/>
		}
	
		
	
}

const HomeScreen = (props) => {
  	//console.log("articles: ", props.articles.title);
  	var date = new Date().getDate().toString(); //To get the Current Date
	var month = new Date().getMonth() + 1; //To get the Current Month
	var year = new Date().getFullYear().toString(); //To get the Current Year

	var curdate = month + '/' + date + '/' + year;

  	console.log(curdate);

  return (
	<View>
		<Header
			//leftComponent={{ text: 'Zoomer News', style: { color: '#fff', fontSize: 22 }  }}
			centerComponent={{ text: 'Zoomer News', style: { color: '#fff', fontSize: 22 } }}
			//rightComponent={{ text: {curdate}, style: { color: '#fff', fontSize: 22 }  }}
		/>

		<Text style={{justifyContent: 'center', textAlign: 'center'}}>
			API: https://newsapi.org/
		</Text>

		<SafeAreaView >
			<FlatList
				data={props.articles}
				renderItem={({ item }) => 
					<Card
						title={item.title}>
						<Image
							style={styles.logo}
							source={{
								uri: item.urlToImage,
							}
							}
						/>
					<Text style={{marginBottom: 10}}>
						{item.description}
					</Text>
					<Text style={{marginBottom: 10}}>
						Date: {item.publishedAt} 
					</Text>
					<Text style={{marginBottom: 10}}>
						Source: {item.source.name}
					</Text>
					
					<Button
						icon={<Icon name='code' color='#ffffff' />}
						buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
						title='VIEW NOW' />
				</Card>
			}
				keyExtractor={item => item.key}
			/>
	</SafeAreaView>
	<Text>
		Data Source: https://newsapi.org/
	</Text>
  </View>

   
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 25,
	},
	text: {
		color: '#fff',
		fontSize: 12,
		padding: 10,
	},
	logo: {
    	width: 330,
    	height: 150,
    	marginBottom: 10,
	  },
	paddingbtm:
	{
		marginBottom: 10,
	},
});


