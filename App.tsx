import { StyleSheet, Text, View, FlatList } from 'react-native';
type  Evenement = {
  id: string;
  titre : string;
  categorie: string;
  capacite: number;
  inscrits: number;
};
const evenements: Evenement[] = [
  {id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 30},
  {id: 'E02', titre: 'Conference IA', categorie: 'Conference', capacite: 70, inscrits: 52},
  {id: 'E03', titre: 'Securite mobile', categorie: 'Atelier', capacite: 20, inscrits: 17},
  {id: 'E04', titre: 'Desin UI', categorie: 'Atelier', capacite: 18, inscrits: 9},
  {id: 'E05', titre: 'Forum projet', categorie: 'Rencontre', capacite: 50, inscrits: 49},
  {id: 'E06', titre: 'Decouverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24}
];
const  placesRestantes =(e:Evenement) => {
  const r =e . capacite -e.inscrits
   return r>0 ? r: 0 };
 function statutEvenement (e :Evenement){ const r = placesRestantes(e)
  if (r === 0) {
    return 'complet';
  }else if ( r>= 1 && r<= 3) {
    return 'presque complet';
  }else {
    return 'ouvert';
}};
const TotalEvenement = evenements.length;
const NbrEvenmentComplet = evenements.filter(e => placesRestantes(e) === 0).length;
const NbrAvecPlaces = evenements.filter(e => placesRestantes (e)> 0).length;
const SommePlaces = evenements.reduce((total, e) => total + placesRestantes(e), 0) ; 
const ateliersDisponible = evenements.filter( e => e.categorie === "Atelier" && placesRestantes(e) > 0);
type BadgeProps ={statut : string};
function BadgeEtat ({statut}: BadgeProps) {
  let couleur = "";
  if (statut === 'complet') { couleur = '#ffcdd2'
  } else if (statut === 'presque complet') { couleur = '#ffe0b2'
  }else { couleur = '#c8e6c9'}
  return (
    <View style = {{backgroundColor: couleur,padding: 8, borderRadius: 10,}}>
      <Text> {statut}</Text>
    </View>
  );}
type CarteProps = { evenement: Evenement };
function CarteEvenement ({evenement} : CarteProps){
  return (
    <View style = {{padding: 15,margin : 10,borderRadius: 12,backgroundColor: 'white'}}>
      <Text>{evenement.titre}</Text>
      <Text>{evenement.categorie}</Text>
      <Text>{placesRestantes(evenement)} places libres</Text>
      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>);}
 type BlocStatistiquePrps = {titre: string; nombre: number;}
function BlocStatistique({titre, nombre}: BlocStatistiquePrps){
  return (
    <View style={{padding: 15, margin: 5,backgroundColor: '#e3f2fd', borderRadius: 10}} >
      <Text>{titre}</Text>
      <Text>{nombre}</Text>
      </View>);}
export default function App() {
  const mode = 'Atelier';
  const evenementAffiches = mode==='Atelier' ? evenements : evenements.filter(
    e => e.categorie === 'Atelier' && placesRestantes(e) > 0);
  return (
    <View style={{flex: 1,backgroundColor: '#f5f5f5',padding: 15}}>
      <Text style= {{fontSize: 26, fontWeight: 'bold'}}> CampusAgenda </Text>
      <Text style  = {{ fontSize: 16,
        color: 'gray'}}> Evenement du campus </Text>
      <View style={{ flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between', marginVertical: 20}}>
        <BlocStatistique titre='Total evenements'nombre={TotalEvenement}/>
        <BlocStatistique titre="evenements complets"nombre={NbrEvenmentComplet}/>
        <BlocStatistique
          titre="Evenements disponibles"
          nombre={NbrAvecPlaces} />
        <BlocStatistique titre='Places restantes' nombre={SommePlaces}/>
      </View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      { mode ==="Atelier" ? 'Tous les evenements' : 'Atelier disponible'}
      </Text>
      <FlatList
        data={evenementAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={ <Text>Aucun evenement disponible</Text>}/>
    </View>
  );}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', }});