import { useState } from "react";
import "./global.css"
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";



import Nav from "./components/Nav";
import Header from "./components/Header"
import SetCalculator from "./components/SetCalculator";
import RelationsCalculator from "./components/RelationsCalculator";
import GraphVisualizer from "./components/GraphVisualizer";

class Conjunto {
  constructor(set, label) {
    this.arrSet = set;
    this.set = new Set;
    this.label = label;
    set.forEach((element) => { this.set.add(element) });

  }
  getUnion(arrB) {
    const temp = arrB.filter((element) => {
      return !this.set.has(element);
    });
    const union = temp.concat(this.arrSet);
    return union.sort();
  }
  getIntersection(arrB) {
    const intersection = arrB.filter((element) => {
      return this.set.has(element);
    })
    return intersection.sort();
  }
  getDifference(arrB) {
    const tempSetB = new Set;
    arrB.forEach((element) => { tempSetB.add(element) });

    const difference = this.arrSet.filter((element) => {
      return !tempSetB.has(element);
    })

    return difference.sort();
  }
  getCross(arrB) {
    const pairs = [];

    for (let a of this.arrSet) {
      for (let b of arrB) {
        pairs.push(`(${a},${b})`);
      }
    }

    return pairs;
  }

}

function App() {
  const [rawSets, setRawSets] = useState({ setA: [], setB: [] });

  const [isCalc, setIsCalc] = useState(true);
  const updateSets = (a, b) => {
    setRawSets({ setA: a, setB: b });
  }

  const updateState = (value) => {
    setIsCalc(value);
  }

  const globalSets = { setA: new Conjunto(rawSets.setA, "A"), setB: new Conjunto(rawSets.setB, "B") }

  console.log("globalSets")

  const calculator = <>
    <Header size="h3" title="Calculadora de conjuntos" content="Ingrese los valores de los conjuntos separados por una coma. Sin espacios ni repeticiones"></Header>
      <SetCalculator updateSets={updateSets} sets={globalSets} />
      <Header size="h4" title="Relaciones" content={<>Si quieres calcular relaciones entre el conjunto A y B, ingresa uno por uno cada elemento de la relación usando la estructura (a,b) <br/> Si quieres añadir mas de un elemento a la vez, separa cada par con espacios. Ejemplo: (a,b) (b,c) (c,d). </>} />
      <RelationsCalculator sets={globalSets} />
  </>

  const graphvis = <>
    <Header size="h3" title="Visualizador de grafos" content="Puede interactuar de cualquiera de las 5 formas indicadas"></Header>
    <GraphVisualizer></GraphVisualizer>

  </>


  return (
    <>
      <Nav updatePage = {updateState}/>
      {isCalc ? calculator : graphvis}
    </>
  )
}

export default App;
