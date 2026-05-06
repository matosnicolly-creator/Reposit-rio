import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, Alert } from 'react-native';

const IMAGENS_LOCAIS = {
'bolo_chocolate.jpg': require('./img/bolo_chocolate.jpg'),
'torta_frango.jpg': require('./img/torta_frango.jpg'),
'bolo_limao.jpg': require('./img/bolo_limao.jpg'),
'coxinha_frango.jpg': require('./img/coxinha_frango.jpg'),
'pao_de_queijo.jpg': require('./img/pao_de_queijo.jpg'),
'mousse_maracuja.jpg': require('./img/mousse_maracuja.jpg'),
};
const RECEITAS_INICIAIS = [
{ id: "1", nome: 'Bolo de Chocolate', img: 'bolo_chocolate.jpg', ingredientes: ["3 ovos","2 xícaras de açúcar","2 xícaras de farinha de trigo", "1 xícara de chocolate em pó","1 xícara de leite","1 xícara de óleo","1 colher (sopa) de fermento em pó","1 pitada de sal"], utensilios: ["1 tigela grande","1 colher","batedor","Forma de bolo","forno","2 xícaras"], passos: ["preaqueça o forno a 180°C","em uma tigela, misture os ovos e o açúcar até ficar bem homogêneo","adicione o óleo e o leite e misture bem","acrescente o chocolate em pó","vá adicionando a farinha aos poucos, mexendo até a massa ficar lisa","coloque a pitada de sal","por último, adicione o fermento e misture levement","despeje em uma forma untada","asse por 35 a 45 minutos (faça o teste do palito)"], videoUrl: 'https://raw.githubusercontent.com/matosnicolly-creator/Reposit-rio/main/videos/chocolate.mp4?raw=true' },
{ id: "2", nome: 'Torta de Frango', img: 'torta_frango.jpg', ingredientes: ["500 g de frango cozido e desfiado", "1 cebola picada","2 dentes de alho picados","1 tomate picado","1 lata de milho (opcional)","1 xícara de molho de tomate","sal e cheiro-verde a gosto","1 fio de azeite","3 ovos","2 xícaras de leite","1 xícara de óleo","2 xícaras de farinha de trigo","1 colher (sopa) de fermento em pó"], utensilios: ["liquidificador","panela média","1 colher de pau","tigela","forma ou assadeira média","faca","tábua de corte","forno"], passos: ["na panela refogue cebola e alho no azeite","acrescente tomate, frango, milho, molho e temperos","reserve","no liquidificador: bata ovos, leite, óleo, farinha e sal até ficar homogêneo","adicione o fermento e misture rapidamente","na forma untada: coloque metade da massa, depois o recheio, e cubra com o restante da massa","leve ao forno preaquecido a 180°C por 35–45 minutos, até dourar"], videoUrl: 'https://raw.githubusercontent.com/matosnicolly-creator/Reposit-rio/main/videos/fuba.mp4?raw=true' },
{ id: "3", nome: 'Bolo de Limão', img: 'bolo_limao.jpg', ingredientes: ["3 ovos","1 xícara de açúcar","1 xícara de óleo","1 xícara de suco de limão (natural)","raspas de 1 limão","2 xícaras de farinha de trigo","1 colher (sopa) de fermento em pó",], utensilios: ["liquidificador","tigela grande","1 colher","forma","copo medidor ou xícara","ralador","forno"], passos: ["no liquidificador, bata os ovos, o açúcar, o óleo e o suco de limão","em uma tigela, coloque a farinha e despeje a mistura do liquidificador","misture bem até ficar homogêneo","Adicione as raspas de limão e o fermento, mexendo delicadamente","Coloque em uma forma untada","Leve ao forno pré-aquecido a 180 °C por cerca de 35 a 40 minutos"], videoUrl: 'https://raw.githubusercontent.com/matosnicolly-creator/Reposit-rio/main/videos/cenoura.mp4?raw=true' },
{ id: "4", nome: 'Coxinha de Frango', img: 'coxinha_frango.jpg', ingredientes: ["2 xícaras de caldo de frango","2 xícaras de farinha de trigo","1 colher (sopa) de manteiga","1 pitada de sal","500 g de frango cozido e desfiado","1 cebola picada","2 dentes de alho picados","1 tomate picado","cheiro-verde a gosto","Sal e pimenta a gosto","2 ovos batidos","Farinha de rosca","óleo"], utensilios: ["panela grande","panela média (para o recheio)","colher de pau","tigela","faca","tábua de corte","escumadeira","prato","Panela funda"], passos: ["Prepare o recheio: refogue cebola, alho e tomate","Acrescente o frango desfiado e os temperos","reserve","Faça a massa: ferva o caldo com manteiga e sal","adicione a farinha de uma vez"," mexendo até desgrudar da panela.Deixe esfriar um pouco e sove a massa até ficar lisa","pegue pequenas porções, abra na mão, recheie com frango e modele no formato de coxinha","Passe no ovo batido e depois na farinha de rosca","frite em óleo quente até dourar","escorra e sirva"], videoUrl: 'https://raw.githubusercontent.com/matosnicolly-creator/Reposit-rio/main/videos/laranja.mp4?raw=true' },
];

export default function HomeScreen({ navigation }) {
const [receitas, setReceitas] = useState(RECEITAS_INICIAIS);
const [carregando, setCarregando] = useState(false);

const sincronizarReceitas = async () => {
setCarregando(true);
try {
const response = await fetch('https://raw.githubusercontent.com/matosnicolly-creator/Reposit-rio/refs/heads/main/receitas.json');
const receitasDoServidor = await response.json();
const novas = receitasDoServidor.filter(resServidor => !receitas.some(resLocal => resLocal.id === resServidor.id));

if (novas.length === 0) {
alert("Você já possui todas as receitas disponíveis!");
} else {
setReceitas(prev => [...prev, ...novas]);
alert("Novas receitas adicionadas com sucesso!");
}
} catch (error) {
alert("Erro ao conectar ao servidor.");
} finally {
setCarregando(false);
}
};

const deletarReceita = (id) => {
const confirmar = Platform.OS === 'web' ? window.confirm("Deseja remover?") : true;
if (confirmar) {
setReceitas(prev => prev.filter(r => r.id !== id));
}
};

return (
<SafeAreaView style={styles.safeArea}>
<ScrollView
style={styles.scrollView}
contentContainerStyle={styles.scrollContent}
showsVerticalScrollIndicator={true}
>
<Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>

<TouchableOpacity style={styles.btnSync} onPress={sincronizarReceitas} disabled={carregando}>
{carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Baixar Novidades ☁️</Text>}
</TouchableOpacity>

<View style={styles.vitrine}>
{receitas.map((receita) => (
<View key={receita.id} style={styles.cardContainer}>
<TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}>
<Image source={IMAGENS_LOCAIS[receita.img] || { uri: receita.imgUrl }} style={styles.image} />
<View style={styles.cardOverlay}>
<Text style={styles.recipeTitle}>{receita.nome}</Text>
</View>
</TouchableOpacity>
{!["1", "2", "3", "4"].includes(receita.id) && (
<TouchableOpacity style={styles.deleteBtn} onPress={() => deletarReceita(receita.id)}>
<Text style={styles.deleteText}>✕</Text>
</TouchableOpacity>
)}
</View>
))}
</View>
</ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: '#B15AE0',
// No Web, removemos a altura fixa do SafeArea e deixamos o corpo da página crescer
height: Platform.OS === 'web' ? 'auto' : '100%',
minHeight: Platform.OS === 'web' ? '100vh' : '100%',
},
scrollView: {
flex: 1,
// Força o navegador a mostrar a barra de rolagem se o conteúdo transbordar
overflow: Platform.OS === 'web' ? 'visible' : 'scroll',
},
scrollContent: {
flexGrow: 1,
paddingBottom: 100,
// Garante que o conteúdo não fique preso
alignItems: 'stretch',
},
headerTitle: { fontSize: 26, fontWeight: 'bold', padding: 20 },
btnSync: { backgroundColor: '#000000', margin: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
btnText: { color: '#fff', fontWeight: 'bold' },
vitrine: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'space-around',
padding: 10
},
cardContainer: { width: '46%', marginBottom: 20, position: 'relative' },
card: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', backgroundColor: '#eee' },
image: { width: '100%', height: '100%', resizeMode: 'cover' },
cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 8 },
recipeTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
deleteBtn: { position: 'absolute', top: -10, right: -10, backgroundColor: '#ff4444', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', zIndex: 99 },
deleteText: { color: '#fff', fontWeight: 'bold' }
});
5